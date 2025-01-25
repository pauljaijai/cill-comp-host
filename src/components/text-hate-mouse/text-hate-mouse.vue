<template>
  <component
    :is="props.tag"
    ref="wrapperRef"
    :aria-label="labelText"
  >
    <span
      v-for="char, i in chars"
      :key="i"
      aria-hidden
      class="inline-block"
    >
      {{ char }}
    </span>

    <canvas
      v-if="debug"
      ref="canvasRef"
      class="pointer-events-none absolute inset-0 bg-transparent"
    />
  </component>
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import Matter from 'matter-js'
import { join, map, pipe } from 'remeda'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  shallowRef,
} from 'vue'

// #region Props
interface Props {
  label: string | string[];

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
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  label: '',
  tag: 'p',
})

const chars = computed(() => pipe(
  props.label,
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
))

const labelText = computed(() => pipe(
  chars.value,
  map((char) => char),
  join(''),
))

const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
} = Matter

const debug = false

const wrapperRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
const wrapperBounding = reactive(
  useElementBounding(wrapperRef, {
    windowResize: false,
    windowScroll: false,
  }),
)

/** 物理世界座標初始值
 *
 * 以免畫面滾動後，重新建立物理世界時，物體位置不正確
 */
let wrapperInitPosition = {
  x: 0,
  y: 0,
}
onMounted(() => {
  wrapperInitPosition = {
    x: wrapperBounding.x,
    y: wrapperBounding.y,
  }
})

const engine = shallowRef(Engine.create({
  gravity: { scale: 0 },
}))

const runner = shallowRef(Runner.create())

onMounted(() => {
  init()
  start()
})

onBeforeUnmount(() => {
  clear()
})

function init() {
  if (debug) {
    const { width, height } = wrapperBounding

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
</script>

<style scoped lang="sass">
</style>
