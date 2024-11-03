<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-border"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      v-if="prop.side.t"
      v-bind="sideAttrMap.t"
      x1="0"
      y1="0"
      :x2="cardSize.width"
      y2="0"
    />
    <line
      v-if="prop.side.l"
      v-bind="sideAttrMap.l"
      x1="0"
      y1="0"
      x2="0"
      :y2="cardSize.height"
    />
    <line
      v-if="prop.side.b"
      v-bind="sideAttrMap.b"
      x1="0"
      :y1="cardSize.height"
      :x2="cardSize.width"
      :y2="cardSize.height"
    />
    <line
      v-if="prop.side.r"
      v-bind="sideAttrMap.r"
      :x1="cardSize.width"
      y1="0"
      :x2="cardSize.width"
      :y2="cardSize.height"
    />
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from '../type'
import { reactiveComputed } from '@vueuse/core'
import anime from 'animejs'
import { fromKeys, map, multiply, pipe } from 'remeda'
import { computed, inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props {
  color?: string;
  selectedColor?: string;
  strokeWidth?: number;
  side?: Partial<
    Record<
      't' | 'l' | 'b' | 'r',
      {
        color?: string;
        selectedColor?: string;
        strokeWidth?: number;
      }
    >
  >;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  color: '#AAA',
  selectedColor: '#ff8d0a',
  strokeWidth: 4,
  side: () => ({
    t: {},
  }),
})

const svgRef = ref<SVGAElement>()

const card = inject(PROVIDE_KEY)
const cardSize = reactiveComputed(() => ({
  width: card?.contentSize.value.width ?? 0,
  height: card?.contentSize.value.height ?? 0,
}))

const style = computed(() => ({
  width: `${cardSize.width}px`,
  height: `${cardSize.height}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.width} ${cardSize.height}`,
)

const sideData = ref(pipe(
  ['t', 'l', 'b', 'r'] as const,
  fromKeys((key) => ({
    dashoffset: 0,
    width: prop.side?.[key]?.strokeWidth ?? prop.strokeWidth,
    stroke: prop.side?.[key]?.color ?? prop.color,
  })),
))

const sideAttrMap = computed(() => ({
  ...pipe(
    ['t', 'b'] as const,
    fromKeys((key) => ({
      'stroke-dasharray': `${cardSize.width} ${cardSize.width}`,
      'stroke-dashoffset': sideData.value[key].dashoffset,
      'stroke': sideData.value[key].stroke,
      'stroke-width': sideData.value[key].width,
    })),
  ),
  ...pipe(
    ['l', 'r'] as const,
    fromKeys((key) => ({
      'stroke-dasharray': `${cardSize.height} ${cardSize.height}`,
      'stroke-dashoffset': sideData.value[key].dashoffset,
      'stroke': sideData.value[key].stroke,
      'stroke-width': sideData.value[key].width,
    })),
  ),
}))

function removeAnime() {
  anime.remove(Object.values(sideData.value))
}

const animeMap: AnimeMap = {
  async normal(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        ['t', 'b'] as const,
        map((key) => anime({
          targets: sideData.value[key],
          width: prop.side?.[key]?.strokeWidth ?? prop.strokeWidth,
          dashoffset: 0,
          stroke: prop.side?.[key]?.color ?? prop.color,
          duration,
          delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),
      ...pipe(
        ['r', 'l'] as const,
        map((key) => anime({
          targets: sideData.value[key],
          width: prop.side?.[key]?.strokeWidth ?? prop.strokeWidth,
          dashoffset: 0,
          stroke: prop.side?.[key]?.color ?? prop.color,
          duration,
          delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        [
          sideData.value.t,
          sideData.value.b,
        ],
        map((targets) => anime({
          targets,
          dashoffset: 0,
          duration,
          delay,
          easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        }).finished),
      ),
      ...pipe(
        [
          sideData.value.l,
          sideData.value.r,
        ],
        map((targets) => anime({
          targets,
          dashoffset: 0,
          duration,
          delay: 200 + delay,
          easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async hidden(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        [
          sideData.value.t,
          sideData.value.b,
        ],
        map((targets) => anime({
          targets,
          dashoffset: cardSize.width,
          duration,
          delay,
          easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        }).finished),
      ),
      ...pipe(
        [
          sideData.value.l,
          sideData.value.r,
        ],
        map((targets) => anime({
          targets,
          dashoffset: cardSize.height,
          duration,
          delay,
          easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async selected(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        ['t', 'r', 'l', 'b'] as const,
        map((key) => anime({
          targets: sideData.value[key],
          width: pipe(
            prop.side?.[key]?.strokeWidth ?? prop.strokeWidth,
            multiply(2),
          ),
          stroke: prop.side?.[key]?.selectedColor ?? prop?.selectedColor,
          duration,
          delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async hover(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        ['t', 'r', 'l', 'b'] as const,
        map((key) => anime({
          targets: sideData.value[key],
          width: pipe(
            prop.side?.[key]?.strokeWidth ?? prop.strokeWidth,
            multiply(2),
          ),
          duration,
          delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
}

onMounted(() => {
  if (!card) {
    console.warn('此元件必須包在 CardFuturistic 元件中')
    return
  }

  card.bindPart({
    name: 'border',
    animeMap,
  })
})

// watch(() => card?.visible.value, (visible) => {
//   console.log(`🚀 ~ visible:`, visible)

//   if (visible) {
//     animeMap.visible()
//   }
//   else {
//     animeMap.hidden()
//   }
// }, {
//   deep: true,
// })
</script>

<style scoped lang="sass">
</style>
