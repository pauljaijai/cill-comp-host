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
import { useElementBounding, useIntervalFn, useMouse, useWindowScroll, watchDebounced } from '@vueuse/core'
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
   * 只有在 text 為 string 時有效
   *
   * @default /.*?/u
   */
  splitter?: RegExp | ((text: string) => string[]);

  /** 閃避半徑 */
  evasionRadius?: number;

  /** 約束力
   *
   * 表示回復原味的力量，1 表示最強，0.2 則類似軟彈簧作用
   */
  stiffness?: number;

  /** 阻尼
   *
   * 0.1 表示強烈阻尼，幾乎不會有任何震盪，0 表示沒有任何阻尼
   */
  damping?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  text: '',
  tag: 'p',
  evasionRadius: 40,
  stiffness: 0.01,
  damping: 0.05,
})

const debug = false
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

const { Bodies, Composite, Engine, Render, Runner } = Matter

const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()
const containerBounding = reactive(
  useElementBounding(containerRef),
)

const engine = shallowRef(Engine.create({
  gravity: { scale: 0 },
}))

const runner = shallowRef(Runner.create())

const mouse = reactive(useMouse())
const windowScroll = reactive(useWindowScroll())
const cursorBody = shallowRef<Matter.Body>()

/** 建立一個持續跟隨滑鼠的圓形 */
function createCursorBody() {
  const ball = pipe(
    undefined,
    () => {
      const ball = Bodies.circle(-100, -100, props.evasionRadius, {
        mass: 9999,
        restitution: 0.8,
        /** 刻意保留物理碰撞，這樣會有抖動效果，更有害怕的感覺 */
        // isStatic: true,
      })

      return ball
    },
  )
  Composite.add(engine.value.world, ball)

  return ball
}

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
       * elRect 的 xy 是相對於網頁左上角為 0 點，
       * 所以要先減去 container 的 x, y 來取得相對於
       * container 的 x, y，再加上 width, height 的
       * 一半，偏移自身中心
       */
      const { x, y } = {
        x: elRect.x - containerBounding.x + elRect.width / 2,
        y: elRect.y - containerBounding.y + elRect.height / 2,
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
        stiffness: props.stiffness,
        damping: props.damping,
      })

      return [body, constraint]
    }),
    filter(isTruthy),
    flat(),
  )
  Composite.add(engine.value.world, charBodyList)

  cursorBody.value = createCursorBody()

  if (debug) {
    const { width, height } = containerRef.value?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
    }

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

function isSmallEnough(value: number) {
  return Math.abs(value) < 0.05
}

/** 持續更新狀態 */
const {
  resume: resumeUpdate,
  pause: pauseUpdate,
} = useIntervalFn(() => {
  const bodyList = Composite.allBodies(engine.value.world)

  // 更新 cursor 位置
  if (cursorBody.value) {
    cursorBody.value.position = {
      x: mouse.x - containerBounding.x - windowScroll.x,
      y: mouse.y - containerBounding.y - windowScroll.y,
    }
  }

  // 轉正
  bodyList.forEach((body) => {
    const rotate = body.angle * 180 / Math.PI
    if (isSmallEnough(rotate))
      return

    body.angle -= body.angle * (props.stiffness * 2)
  })

  // 儲存 body 狀態
  let hasUpdate = false
  chars.value.reduce((styleMap, char) => {
    const body = bodyList.find(({ label }) => label === char.id)
    const initValue = charBodyInitMap.value.get(char.id)
    if (body && initValue) {
      const offsetX = body.position.x - initValue.x
      const offsetY = body.position.y - initValue.y
      const rotate = body.angle * 180 / Math.PI

      if (
        isSmallEnough(offsetX)
        && isSmallEnough(offsetY)
        && isSmallEnough(rotate)
      ) {
        styleMap.delete(char.id)
        return styleMap
      }

      styleMap.set(char.id, {
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
      })

      hasUpdate = true
    }

    return styleMap
  }, charStyleMap.value)

  if (hasUpdate) {
    triggerRef(charStyleMap)
  }
}, 15)

onMounted(() => {
  init()
  start()
})

onBeforeUnmount(() => {
  clear()
})

// 動態更新參數
watchDebounced(
  () => [
    props.text,
    props.splitter,
  ],
  () => {
    pauseUpdate()
    clear()
    init()
    start()
    resumeUpdate()
  },
  {
    debounce: 500,
  },
)

watchDebounced(
  () => [
    props.stiffness,
    props.damping,
  ],
  () => {
    pauseUpdate()

    Composite
      .allConstraints(engine.value.world)
      .forEach((constraint) => {
        constraint.stiffness = props.stiffness
        constraint.damping = props.damping
      })

    resumeUpdate()
  },
  {
    debounce: 500,
  },
)

watchDebounced(
  () => props.evasionRadius,
  () => {
    pauseUpdate()

    // 銷毀原本的 body
    if (cursorBody.value) {
      Composite.remove(engine.value.world, cursorBody.value)
    }

    cursorBody.value = createCursorBody()

    resumeUpdate()
  },
  {
    debounce: 500,
  },
)
</script>

<style scoped lang="sass">
</style>
