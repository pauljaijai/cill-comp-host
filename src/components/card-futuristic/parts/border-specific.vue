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
      v-bind="sideStyleMap.t"
      x1="0"
      y1="0"
      :x2="cardSize.width"
      y2="0"
    />
    <line
      v-if="prop.side.l"
      v-bind="sideStyleMap.l"
      x1="0"
      y1="0"
      x2="0"
      :y2="cardSize.height"
    />
    <line
      v-if="prop.side.b"
      v-bind="sideStyleMap.b"
      x1="0"
      :y1="cardSize.height"
      :x2="cardSize.width"
      :y2="cardSize.height"
    />
    <line
      v-if="prop.side.r"
      v-bind="sideStyleMap.r"
      :x1="cardSize.width"
      y1="0"
      :x2="cardSize.width"
      :y2="cardSize.height"
    />
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from '../type'
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { fromKeys, map, multiply, pipe } from 'remeda'
import { computed, reactive, ref, watch } from 'vue'
import { useCardPart } from '../use-card-part'

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
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

const sideData = ref(pipe(
  ['t', 'l', 'b', 'r'] as const,
  fromKeys((key) => ({
    dashoffset: 0,
    width: prop.side?.[key]?.strokeWidth ?? prop.strokeWidth,
    stroke: prop.side?.[key]?.color ?? prop.color,
  })),
))

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

    const tasks = pipe(
      ['t', 'r', 'b', 'l'] as const,
      map((key) => anime({
        targets: sideData.value[key],
        dashoffset: 0,
        width: prop.side?.[key]?.strokeWidth ?? prop.strokeWidth,
        stroke: prop.side?.[key]?.color ?? prop.color,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished),
    )

    await Promise.all(tasks)
  },
  async hidden(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = pipe(
      [
        {
          targets: sideData.value.t,
          dashoffset: svgSize.width,
        },
        {
          targets: sideData.value.r,
          dashoffset: svgSize.height,
        },
        {
          targets: sideData.value.l,
          dashoffset: -svgSize.height,
        },
        {
          targets: sideData.value.b,
          dashoffset: -svgSize.width,
        },
      ],
      map((data) => anime({
        ...data,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished),
    )

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

const {
  cardSize,
  visible,
} = useCardPart('border', animeMap)

/** 初始化所有點位，消除 cardSize 變化帶來的偏移 */
watch(cardSize, () => {
  if (visible.value) {
    animeMap.visible({ delay: 0, duration: 0 })
  }
  else {
    animeMap.hidden({ delay: 0, duration: 0 })
  }
})

const style = computed(() => ({
  width: `${cardSize.width}px`,
  height: `${cardSize.height}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.width} ${cardSize.height}`,
)

const sideStyleMap = computed(() => ({
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
</script>

<style scoped lang="sass">
</style>
