<template>
  <component
    :is="props.tag"
    ref="containerRef"
    :aria-label="ariaLabel"
    class="relative whitespace-pre-wrap"
  >
    <span
      v-for="item in chars"
      :id="item.id"
      :key="item.id"
      ref="charRefList"
      :style="charStyleMap.get(item.id)"
      aria-hidden
      class="inline-block"
    >
      {{ item.char }}
    </span>

    <canvas
      v-if="debug"
      ref="canvasRef"
      class="pointer-events-none absolute inset-0 bg-transparent"
    />
  </component>
</template>

<script setup lang="ts">
import type {
  CSSProperties,
} from 'vue'
import { useElementBounding, useIntervalFn, useMouse } from '@vueuse/core'
import Matter from 'matter-js'
import { filter, flat, isTruthy, join, map, pipe, reduce } from 'remeda'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  shallowRef,
  triggerRef,
  useId,
} from 'vue'

// #region Props
interface Props {
  /** string[] 表示提供已分割好的文字 */
  text: string | string[];

  /** html tag
   *
   * @default 'p'
   */
  tag?: string;

  /** 如何切割文字
   *
   * 只有在 label 為 string 時有效
   *
   * @default /.*?/u
   */
  splitter?: RegExp | ((label: string) => string[]);

  /** 閃避半徑 */
  radius?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  text: '',
  tag: 'p',
  radius: 40,
})

const id = useId()

const chars = computed(() => pipe(
  props.text,
  (data) => {
    if (Array.isArray(data)) {
      return data
    }

    if (typeof props.splitter === 'function') {
      return props.splitter(data)
    }

    /** Regex 加上 u 才不會導致 emoji 被拆分成亂碼 */
    return data.split(props.splitter ?? /.*?/u)
  },
  map((char, i) => ({
    id: `${id}-${i}`,
    char,
  })),
))

const charRefList = ref<HTMLSpanElement[]>()
const charRefMap = computed(() => pipe(
  charRefList.value ?? [],
  reduce((refMap, el) => {
    refMap.set(el.id, el)
    return refMap
  }, new Map<string, HTMLSpanElement>()),
))
const charStyleMap = shallowRef(new Map<string, CSSProperties>())
/** body 初始值，方便計算偏移量 */
const charBodyInitMap = shallowRef(new Map<string, {
  x: number;
  y: number;
}>())

const ariaLabel = computed(() => pipe(
  chars.value,
  map(({ char }) => char),
  join(''),
))

const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
} = Matter

const debug = false

const mouse = reactive(useMouse())

const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
const containerBounding = reactive(
  useElementBounding(containerRef, {
    windowResize: false,
    windowScroll: false,
  }),
)

/** 物理世界座標初始值
 *
 * 以免畫面滾動後，重新建立物理世界時，物體位置不正確
 */
let containerInitPosition = {
  x: 0,
  y: 0,
}
onMounted(() => {
  containerInitPosition = {
    x: containerBounding.x,
    y: containerBounding.y,
  }
})

const engine = shallowRef(Engine.create({
  gravity: { scale: 0 },
}))

const runner = shallowRef(Runner.create())

function init() {
  const charBodyList = pipe(
    chars.value,
    map(({ id }) => {
      const targetRef = charRefMap.value.get(id)
      if (!targetRef) {
        return
      }

      const elRect = targetRef.getBoundingClientRect()

      /**
       * el body 的 xy 是相對於網頁左上角為 0 點，
       * 所以要先減去 container 的 x, y 來取得相對於
       * container 的 x, y，再加上 width, height 的
       * 一半，偏移自身中心
       */
      const { x, y } = {
        x: elRect.x - containerInitPosition.x + elRect.width / 2,
        y: elRect.y - containerInitPosition.y + elRect.height / 2,
      }

      charBodyInitMap.value.set(id, { x, y })

      const radius = Math.min(elRect.width, elRect.height) / 2
      const body = Bodies.circle(x, y, radius, {
        label: id,
        friction: 0,
      })

      const constraint = Matter.Constraint.create({
        bodyA: body,
        pointB: { x, y },
        stiffness: 0.001,
        damping: 0.05,
      })

      return [body, constraint]
    }),
    filter(isTruthy),
    flat(),
  )
  Composite.add(engine.value.world, charBodyList)

  // 建立一個持續跟隨滑鼠的圓形
  pipe(
    undefined,
    () => {
      const ball = Bodies.circle(-100, -100, props.radius, {
        mass: 1000,
        restitution: 0,
      })
      Composite.add(engine.value.world, ball)

      Matter.Events.on(engine.value, 'afterUpdate', () => {
        ball.position = {
          x: mouse.x - containerInitPosition.x,
          y: mouse.y - containerInitPosition.y,
        }
      })
    },
  )

  if (debug) {
    const { width, height } = containerBounding

    const render = Render.create({
      canvas: canvasRef.value,
      engine: engine.value,
      bounds: {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      },
      options: {
        width,
        height,
        background: 'transparent',
        wireframeBackground: 'transparent',
        // showPerformance: true,
      },
    })

    Render.run(render)
  }
}

function start() {
  Runner.run(runner.value, engine.value)
}
function clear() {
  Composite.clear(engine.value.world, true)
  Engine.clear(engine.value)
  Runner.stop(runner.value)
}

useIntervalFn(() => {
  const bodyList = Composite.allBodies(engine.value.world)

  chars.value.reduce((styleMap, char) => {
    const body = bodyList.find(({ label }) => label === char.id)
    const initValue = charBodyInitMap.value.get(char.id)
    if (body && initValue) {
      const offsetX = body.position.x - initValue.x
      const offsetY = body.position.y - initValue.y
      const rotate = body.angle * 180 / Math.PI

      styleMap.set(char.id, {
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
      })
    }

    return styleMap
  }, charStyleMap.value)

  triggerRef(charStyleMap)
}, 15)

onMounted(() => {
  init()
  start()
})

onBeforeUnmount(() => {
  clear()
})
</script>

<style scoped lang="sass">
</style>
