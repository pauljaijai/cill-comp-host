<template>
  <div
    ref="wrapperRef"
    class="wrapper-physics relative"
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
  onMounted, ref, provide, onBeforeUnmount, computed, watch,
} from 'vue';
import { PROVIDE_KEY, Body } from '.';
import { map, omit, pipe } from 'remeda';

import Matter from 'matter-js';
const {
  Engine, Render, Runner, Bodies, Composite,
} = Matter;

import { useElementBounding, useIntervalFn } from '@vueuse/core';

// #region Props
interface Props {
  /** 立即開始，物體會在元件建立完成後馬上會開始掉落 */
  immediate?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  immediate: false,
});

const debug = true;

/** 儲存 body */
const bodyMap = new Map<string, Body>();
const bodyInfoMap = new Map<string, {
  offsetX: number;
  offsetY: number;
  rotate: number;
}>();

function bindBody(item: Body) {
  bodyMap.set(item.id, item);
}
function unbindBody(id: string) {
  bodyMap.delete(id);
  bodyInfoMap.delete(id);
}
provide(PROVIDE_KEY, {
  bindBody,
  unbindBody,
  getInfo(id) {
    return bodyInfoMap.get(id);
  },
});

const wrapperRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();
const {
  width, height,
  x: wrapperX, y: wrapperY,
} = useElementBounding(wrapperRef);

const engine = Engine.create();
const runner = Runner.create();

/** 加入牆壁 */
function addBounds() {
  const thickness = 40;
  const offset = 1;

  const t = Bodies.rectangle(
    width.value / 2, -thickness - offset,
    width.value * 2, thickness,
    { isStatic: true, }
  );
  const r = Bodies.rectangle(
    width.value + thickness / 2 + offset, height.value / 2,
    thickness, height.value * 2,
    { isStatic: true }
  );
  const b = Bodies.rectangle(
    width.value / 2, height.value + thickness / 2 + offset,
    width.value * 2, thickness,
    { isStatic: true }
  );
  const l = Bodies.rectangle(
    -thickness / 2 - offset, height.value / 2,
    thickness, height.value * 2,
    { isStatic: true }
  );

  Composite.add(engine.world, [t, r, b, l]);
}

/** 初始化所有的 body */
function initBodies() {
  const list = pipe(Array.from(bodyMap.values()),
    map((item) => {
      const {
        width, height
      } = item;

      const { x, y } = {
        x: item.x - wrapperX.value + width / 2,
        y: item.y - wrapperY.value + height / 2,
      }

      const body = Bodies.rectangle(x, y, width, height, {
        ...omit(item, ['id']),
      });
      const initInfo = {
        offsetX: body.position.x,
        offsetY: body.position.y,
        rotate: body.angle,
      };

      useIntervalFn(() => {
        if (!bodyMap.has(item.id)) return;

        bodyInfoMap.set(item.id, {
          ...{
            offsetX: body.position.x - initInfo.offsetX,
            offsetY: body.position.y - initInfo.offsetY,
          },
          rotate: body.angle * 180 / Math.PI,
        });
      }, 15);

      return body;
    }),
  );

  Composite.add(engine.world, list);
}

onMounted(() => {
  addBounds();
  initBodies();

  const render = Render.create({
    canvas: canvasRef.value,
    engine: engine,
    bounds: {
      min: { x: 0, y: 0 },
      max: { x: width.value, y: height.value },
    },
    options: {
      width: width.value,
      height: height.value,
      hasBounds: true,
      background: 'transparent',
      wireframeBackground: 'transparent',
      // showPerformance: true,
    },
  });

  if (debug) {
    Render.run(render);
  }

  if (props.immediate) {
    Runner.run(runner, engine);
  }
});

onBeforeUnmount(() => {
  Runner.stop(runner);
  Engine.clear(engine);
});

function start() {
  Runner.run(runner, engine);
}

// #region Methods
defineExpose({
  /** 開始 */
  start,
});
// #endregion Methods

</script>

<style scoped lang="sass">
</style>
