<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-corner"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path v-bind="cornerStyleMap.lt" />
    <path v-bind="cornerStyleMap.rb" />
    <path v-bind="cornerStyleMap.rt" />
    <path v-bind="cornerStyleMap.lb" />
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from '../type'
import { reactiveComputed, useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { mapValues, pipe } from 'remeda'
import { computed, inject, onMounted, reactive, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props {
  size?: number;
  strokeWidth?: number;
  color?: string;
  selectedColor?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  size: 10,
  strokeWidth: 4,
  color: '#444',
  selectedColor: '#ff8d0a',
})

const svgRef = ref<SVGAElement>()
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

const card = inject(PROVIDE_KEY)
const cardSize = reactiveComputed(() => ({
  width: card?.contentSize.value.width ?? 0,
  height: card?.contentSize.value.height ?? 0,
}))

const attr = reactive({
  offsetX: prop.size / 4,
  offsetY: prop.size / 4,
  color: prop.color,
  strokeWidth: prop.strokeWidth,
})

const style = computed(() => ({
  left: `${-attr.offsetX}px`,
  top: `${-attr.offsetY}px`,
  width: `${cardSize.width + attr.offsetX * 2}px`,
  height: `${cardSize.height + attr.offsetY * 2}px`,
}))

const viewBox = computed(
  () => `0 0 ${svgSize.width} ${svgSize.height}`,
)

const cornerStyleMap = computed(() => pipe(
  {
    lt: {
      d: `M0 ${prop.size}V0H${prop.size}`,
    },
    rt: {
      d: [
        `M${svgSize.width - prop.size} 0`,
        `H${svgSize.width}V${prop.size}`,
      ].join(''),
    },
    rb: {
      d: [
        `M${svgSize.width} ${svgSize.height - prop.size}`,
        `V${svgSize.height}H${svgSize.width - prop.size}`,
      ].join(''),
    },
    lb: {
      d: [
        `M${prop.size} ${svgSize.height}`,
        `H0V${svgSize.height - prop.size}`,
      ].join(''),
    },
  },
  mapValues((value) => ({
    ...value,
    'stroke': attr.color,
    'stroke-width': attr.strokeWidth,
  })),
))

function removeAnime() {
  anime.remove([attr, svgRef.value])
}

const animeMap: AnimeMap = {
  async normal(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: attr,
        offsetX: prop.size / 4,
        offsetY: prop.size / 4,
        color: prop.color,
        strokeWidth: prop.strokeWidth,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'linear',
      }).finished,
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
      anime({
        targets: attr,
        offsetX: prop.size / 4,
        duration: duration / 3 * 2,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: attr,
        offsetY: prop.size / 4,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hidden(param) {
    removeAnime()

    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const svgDuration = duration / 4

    const tasks = [
      anime({
        targets: attr,
        offsetX: -prop.size * 4,
        color: prop.color,
        duration,
        delay: delay + 100,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: attr,
        offsetY: -prop.size * 3,
        color: prop.color,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 0,
        duration: svgDuration * 2,
        delay: svgDuration * 2 + delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async selected(param) {
    removeAnime()

    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: attr,
        offsetX: -prop.size / 4,
        offsetY: -prop.size / 4,
        color: prop.selectedColor,
        strokeWidth: prop.strokeWidth * 1.6,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hover(param) {
    removeAnime()

    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: attr,
        offsetX: prop.size / 2,
        offsetY: prop.size / 2,
        color: prop.color,
        strokeWidth: prop.strokeWidth,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 0.6,
        duration,
        delay,
        easing: 'linear',
      }).finished,
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
    name: 'corner',
    animeMap,
  })
})

// watch(() => card, (data) => {
//   const { visible } = data ?? {}

//   if (visible?.value) {
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
.card-corner
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))
</style>
