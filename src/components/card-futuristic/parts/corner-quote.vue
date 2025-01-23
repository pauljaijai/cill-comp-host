<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="corner-quote"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path v-bind="cornerStyleMap.lt" />
    <path v-bind="cornerStyleMap.rb" />
    <path v-bind="cornerStyleMap.rt" />
    <path v-bind="cornerStyleMap.lb" />
  </svg>
</template>

<script setup lang="ts">
import type { PartAnimeFcnMap } from '../type'
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { mapValues, pipe } from 'remeda'
import { computed, reactive, ref } from 'vue'
import { useCardPart } from '../use-card-part'

// #region Props
export interface Props {
  size?: number;
  strokeWidth?: number;
  color?: string;
  selectedColor?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  size: 10,
  strokeWidth: 4,
  color: '#444',
  selectedColor: '#ff8d0a',
})

const svgRef = ref<SVGAElement>()
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

const attr = reactive({
  offsetX: props.size / 4,
  offsetY: props.size / 4,
  color: props.color,
  strokeWidth: props.strokeWidth,
})

function removeAnime() {
  anime.remove([attr, svgRef.value])
}

const animeMap: PartAnimeFcnMap = {
  async normal(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: attr,
        offsetX: props.size / 4,
        offsetY: props.size / 4,
        color: props.color,
        strokeWidth: props.strokeWidth,
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
        offsetX: props.size / 4,
        duration: duration / 3 * 2,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: attr,
        offsetY: props.size / 4,
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

    const [width, height] = [
      svgRef.value?.clientWidth ?? 0,
      svgRef.value?.clientHeight ?? 0,
    ]

    const tasks = [
      anime({
        targets: attr,
        offsetX: -width / 2,
        color: props.color,
        duration,
        delay: delay + 100,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: attr,
        offsetY: -height / 5 * 2,
        color: props.color,
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
        offsetX: -props.size / 4,
        offsetY: -props.size / 4,
        color: props.selectedColor,
        strokeWidth: props.strokeWidth * 1.6,
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
        offsetX: props.size / 2,
        offsetY: props.size / 2,
        color: props.color,
        strokeWidth: props.strokeWidth,
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

const { cardSize } = useCardPart('corner', animeMap)

const style = computed(() => ({
  left: `${-attr.offsetX}px`,
  top: `${-attr.offsetY}px`,
  width: `${Math.max(cardSize.width + attr.offsetX * 2, 0)}px`,
  height: `${Math.max(cardSize.height + attr.offsetY * 2, 0)}px`,
}))

const viewBox = computed(
  () => `0 0 ${svgSize.width} ${svgSize.height}`,
)

const cornerStyleMap = computed(() => pipe(
  {
    lt: {
      d: `M0 ${props.size}V0H${props.size}`,
    },
    rt: {
      d: [
        `M${svgSize.width - props.size} 0`,
        `H${svgSize.width}V${props.size}`,
      ].join(''),
    },
    rb: {
      d: [
        `M${svgSize.width} ${svgSize.height - props.size}`,
        `V${svgSize.height}H${svgSize.width - props.size}`,
      ].join(''),
    },
    lb: {
      d: [
        `M${props.size} ${svgSize.height}`,
        `H0V${svgSize.height - props.size}`,
      ].join(''),
    },
  },
  mapValues((value) => ({
    ...value,
    'stroke': attr.color,
    'stroke-width': attr.strokeWidth,
  })),
))
</script>

<style scoped lang="sass">
</style>
