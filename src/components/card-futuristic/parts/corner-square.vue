<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="corner-square"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect v-bind="cornerStyleMap.lt" />
    <rect v-bind="cornerStyleMap.rb" />
    <rect v-bind="cornerStyleMap.rt" />
    <rect v-bind="cornerStyleMap.lb" />
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
  color: '#444',
  selectedColor: '#ff8d0a',
})

const svgRef = ref<SVGAElement>()
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

const attr = reactive({
  offsetX: 0,
  offsetY: 0,
  color: props.color,
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
        offsetX: 0,
        offsetY: 0,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 1,
        duration: duration / 4,
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
    const svgSize = {
      width: svgRef.value?.clientWidth ?? 0,
      height: svgRef.value?.clientHeight ?? 0,
    }

    const tasks = [
      anime({
        targets: attr,
        offsetX: -svgSize.width / 2,
        offsetY: -svgSize.height / 2,
        color: props.color,
        duration,
        delay: delay + 100,
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
  width: `${cardSize.width + attr.offsetX * 2}px`,
  height: `${cardSize.height + attr.offsetY * 2}px`,
}))

const viewBox = computed(
  () => `0 0 ${svgSize.width} ${svgSize.height}`,
)

const cornerStyleMap = computed(() => pipe(
  {
    lt: {
      x: 0,
      y: 0,
    },
    rt: {
      x: svgSize.width - props.size,
      y: 0,
    },
    rb: {
      x: svgSize.width - props.size,
      y: svgSize.height - props.size,
    },
    lb: {
      x: 0,
      y: svgSize.height - props.size,
    },
  },
  mapValues((value) => ({
    ...value,
    width: props.size,
    height: props.size,
    fill: attr.color,
  })),
))
</script>

<style scoped lang="sass">
</style>
