<template>
  <div
    ref="wrapperRef"
    class="wrapper-physics relative overflow-hidden"
  >
    <slot />

    <canvas
      v-if="debug"
      ref="canvasRef"
      class=" absolute inset-0 pointer-events-none bg-transparent"
    />
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, ref, provide, onBeforeUnmount, shallowRef, watch,
} from 'vue';
import { PROVIDE_KEY, ElBody, UpdateParam } from '.';
import { map, omit, pick, pipe } from 'remeda';
import Matter from 'matter-js';

const {
  Engine, Render, Runner, Bodies, Composite, Body,
} = Matter;

import { useElementBounding, useIntervalFn } from '@vueuse/core';

// #region Props
interface Props {
  /** 立即開始，物體會在元件建立完成後馬上會開始掉落 */
  immediate?: boolean;

  /** 重力加速度
   * 
   * x, y 為加速度的方向，scale 為加速度的大小
   */
  gravity?: Matter.Gravity;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  immediate: false,
  gravity: () => ({
    scale: 0.001,
    x: 0,
    y: 1,
  }),
});

const debug = false;

/** 儲存已建立的 body */
const bodyMap = new Map<string, ElBody>();
const bodyInfoMap = new Map<string, {
  offsetX: number;
  offsetY: number;
  rotate: number;
}>();

function bindBody(item: ElBody) {
  bodyMap.set(item.id, item);
}
function unbindBody(id: string) {
  bodyMap.delete(id);
  bodyInfoMap.delete(id);
}
function updateBody(id: string, param: UpdateParam) {
  const bodyData = bodyMap.get(id);
  if (bodyData) {
    bodyMap.set(id, {
      ...bodyData,
      frictionAir: param.frictionAir,
      friction: param.friction,
      restitution: param.restitution,
      mass: param.mass,
      isStatic: param.isStatic,
    })
  }

  const target = Composite.allBodies(engine.value.world).find(
    (body) => body.label === id
  );
  if (!target) return;

  param.frictionAir && (target.frictionAir = param.frictionAir);
  param.friction && (target.friction = param.friction);
  param.restitution && (target.restitution = param.restitution);
  param.mass && Body.setMass(target, param.mass);
  param.isStatic && Body.setStatic(target, param.isStatic);
  param.velocity && Body.setVelocity(target, param.velocity);
  param.angularVelocity && Body.setAngularVelocity(target, param.angularVelocity);
}

provide(PROVIDE_KEY, {
  bindBody,
  unbindBody,
  updateBody,
  getInfo(id) {
    return bodyInfoMap.get(id);
  },
});

const wrapperRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();
const wrapperBounding = useElementBounding(wrapperRef, {
  windowResize: false,
  windowScroll: false,
});
/** 物理世界座標初始值 */
let wrapperInitBounding = {
  x: 0,
  y: 0,
}
onMounted(() => {
  wrapperInitBounding = {
    x: wrapperBounding.x.value,
    y: wrapperBounding.y.value,
  }
});

const engine = shallowRef(Engine.create({
  gravity: props.gravity,
}));
watch(() => props.gravity, (value) => {
  if (value) {
    engine.value.gravity = value;
  }
}, {
  immediate: true,
  deep: true
});

const runner = shallowRef(Runner.create());

function init() {
  const result = pipe(Array.from(bodyMap.values()),
    /** 初始化所有 body */
    map((elBody) => {
      const {
        polygon = 'rectangle',
        width, height
      } = elBody;

      /** 
       * el body 的 xy 是相對於網頁左上角為 0 點，
       * 所以要先減去 wrapper 的 x, y 來取得相對於
       * wrapper 的 x, y，再加上 width, height 的
       * 一半，偏移自身中心
       */
      const { x, y } = {
        x: elBody.x - wrapperInitBounding.x + width / 2,
        y: elBody.y - wrapperInitBounding.y + height / 2,
      }

      const body = pipe(0,
        () => {
          if (polygon === 'circle') {
            const r = Math.max(width, height) / 2;
            return Bodies.circle(x, y, r, {
              ...pick(elBody, ['frictionAir', 'friction', 'restitution', 'mass', 'isStatic']),
              label: elBody.id,
            });
          }

          return Bodies.rectangle(x, y, width, height, {
            ...pick(elBody, ['frictionAir', 'friction', 'restitution', 'mass', 'isStatic']),
            label: elBody.id,
          });
        }
      );

      // 更新初始值
      const data = bodyMap.get(elBody.id);
      if (data) {
        bodyMap.set(elBody.id, {
          ...data,
          initial: {
            offsetX: body.position.x,
            offsetY: body.position.y,
            rotate: body.angle,
          },
        });
      }

      return body;
    }),
    /** 初始化牆壁 */
    (bodies) => {
      const thickness = 100;
      const offset = 0;

      const { width, height } = wrapperBounding;

      const list = [
        Bodies.rectangle(
          width.value / 2, -thickness / 2 - offset,
          width.value * 2, thickness,
          { isStatic: true, label: 'top' }
        ),
        Bodies.rectangle(
          width.value + thickness / 2 + offset, height.value / 2,
          thickness, height.value * 2,
          { isStatic: true, label: 'right' }
        ),
        Bodies.rectangle(
          width.value / 2, height.value + thickness / 2 + offset,
          width.value * 2, thickness,
          { isStatic: true, label: 'bottom' }
        ),
        Bodies.rectangle(
          -thickness / 2 - offset, height.value / 2,
          thickness, height.value * 2,
          { isStatic: true, label: 'left' }
        ),
      ];

      bodies.push(...list);

      return bodies;
    },
  );
  Composite.add(engine.value.world, result);

  if (debug) {
    const { width, height } = wrapperBounding;

    const render = Render.create({
      canvas: canvasRef.value,
      engine: engine.value,
      bounds: {
        min: { x: 0, y: 0 },
        max: { x: width.value, y: height.value },
      },
      options: {
        width: width.value,
        height: height.value,
        background: 'transparent',
        wireframeBackground: 'transparent',
        // showPerformance: true,
      },
    });

    Render.run(render);
  }
}

function start() {
  Runner.run(runner.value, engine.value);
  resumeUpdate();
}
function clear() {
  Composite.clear(engine.value.world, true);
  Engine.clear(engine.value);
  Runner.stop(runner.value);

  bodyInfoMap.clear();
}
function reset() {
  clear();

  engine.value = Engine.create({
    gravity: props.gravity,
  });
  runner.value = Runner.create();
  init();
  pauseUpdate();
}

// 持續更新狀態
const {
  pause: pauseUpdate,
  resume: resumeUpdate,
} = useIntervalFn(() => {
  const list = Composite.allBodies(engine.value.world);

  list.forEach((body) => {
    /** id 存在 label 中 */
    const id = body.label;
    const info = bodyMap.get(id);

    if (!bodyMap.has(id) || !info) {
      return;
    }

    const { initial } = info;
    const value = {
      ...{
        offsetX: body.position.x - initial.offsetX,
        offsetY: body.position.y - initial.offsetY,
      },
      rotate: body.angle * 180 / Math.PI,
    }

    bodyInfoMap.set(id, value);
  });
}, 10);

onMounted(() => {
  init();

  if (props.immediate) {
    start();
  }
});

onBeforeUnmount(() => {
  clear();
});

// #region Methods
defineExpose({
  /** 開始 */
  start,
  /** 重置所有元素，元素會回到初始位置 */
  reset,
});
// #endregion Methods

</script>

<style scoped lang="sass">
</style>
