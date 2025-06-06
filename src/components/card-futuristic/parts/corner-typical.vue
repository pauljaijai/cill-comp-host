<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="corner-typical"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-bind="cornerStyleMap.lt"
      :stroke="props.stroke"
      stroke-width="1.6"
    />
    <path
      v-bind="cornerStyleMap.rt"
      :stroke="props.stroke"
      stroke-width="1.6"
    />
    <path
      v-bind="cornerStyleMap.rb"
      :stroke="props.stroke"
      stroke-width="1.6"
    />
    <path
      v-bind="cornerStyleMap.lb"
      :stroke="props.stroke"
      stroke-width="1.6"
    />
  </svg>
</template>

<script setup lang="ts">
import type { PartAnimeFcnMap } from '../type'
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { mapValues, pipe } from 'remeda'
import { computed, inject, onMounted, reactive, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props {
  size?: number;
  color?: string;
  selectedColor?: string;
  stroke?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  size: 10,
  color: '#222',
  selectedColor: '#ff8d0a',
  stroke: 'white',
})

const svgRef = ref<SVGAElement>()
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

const card = inject(PROVIDE_KEY)
const cardSize = computed(() => ({
  width: card?.contentSize.value.width ?? 0,
  height: card?.contentSize.value.height ?? 0,
}))

const attr = reactive({
  rotate: 0,
  offset: props.size / 4,
  color: props.color,
})

const style = computed(() => ({
  left: `${-attr.offset}px`,
  top: `${-attr.offset}px`,
  width: `${cardSize.value.width + attr.offset * 2}px`,
  height: `${cardSize.value.height + attr.offset * 2}px`,
}))

const viewBox = computed(
  () => `0 0 ${svgSize.width} ${svgSize.height}`,
)

const cornerStyleMap = computed(() => pipe(
  {
    lt: {
      d: `M0 0 H${props.size} L0 ${props.size}V0 Z`,
      transform: `rotate(${attr.rotate}, ${props.size / 2}, ${props.size / 2})`,
    },
    rt: {
      d: [
        `M${svgSize.width} 0`,
        `L${svgSize.width} ${props.size}`,
        `L${svgSize.width - props.size} 0Z`,
      ].join(' '),
      transform: `rotate(${attr.rotate}, ${svgSize.width - props.size / 2}, ${props.size / 2})`,
    },
    rb: {
      d: [
        `M${svgSize.width} ${svgSize.height}`,
        `L${svgSize.width - props.size} ${svgSize.height}`,
        `L${svgSize.width} ${svgSize.height - props.size}`,
        `L${svgSize.width} ${svgSize.height} Z`,
      ].join(' '),
      transform: `rotate(${attr.rotate}, ${svgSize.width - props.size / 2}, ${svgSize.height - props.size / 2})`,
    },
    lb: {
      d: [
        `M0 ${svgSize.height}`,
        `L0 ${svgSize.height - props.size}`,
        `L${props.size} ${svgSize.height}`,
        `L0 ${svgSize.height} Z`,
      ].join(' '),
      transform: `rotate(${attr.rotate}, ${props.size / 2}, ${svgSize.height - props.size / 2})`,
    },
  },
  mapValues((value) => ({
    ...value,
    fill: attr.color,
  })),
))

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
        offset: props.size / 4,
        color: props.color,
        rotate: 0,
        duration,
        delay,
        easing: 'easeInOutExpo',
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
        offset: props.size / 4,
        rotate: 0,
        duration,
        delay,
        easing: 'easeOutExpo',
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
      duration = 400,
      delay = 0,
    } = param ?? {}

    const svgDuration = duration / 4

    const tasks = [
      anime({
        targets: attr,
        offset: props.size,
        color: props.color,
        duration,
        delay,
        easing: 'easeInExpo',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 0,
        duration: svgDuration,
        delay: svgDuration * 3 + delay,
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
        offset: props.size / 2,
        rotate: 180,
        duration,
        delay,
        easing: 'easeInOutCirc',
      }).finished,
      anime({
        targets: attr,
        color: props.selectedColor,
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
        offset: props.size / 2,
        rotate: 0,
        color: props.color,
        duration,
        delay,
        easing: 'easeInOutCirc',
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
</style>
