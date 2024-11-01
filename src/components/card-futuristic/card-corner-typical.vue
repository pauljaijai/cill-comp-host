<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-corner"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-bind="cornerStyleMap.lt"
      :stroke="prop.stroke"
      stroke-width="1.6"
    />
    <path
      v-bind="cornerStyleMap.rt"
      :stroke="prop.stroke"
      stroke-width="1.6"
    />
    <path
      v-bind="cornerStyleMap.br"
      :stroke="prop.stroke"
      stroke-width="1.6"
    />
    <path
      v-bind="cornerStyleMap.bl"
      :stroke="prop.stroke"
      stroke-width="1.6"
    />
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from './type'
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { mapValues, pipe } from 'remeda'
import { computed, inject, onMounted, reactive, ref } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
export interface Props {
  size?: number;
  color?: string;
  selectedColor?: string;
  stroke?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  size: 10,
  color: '#777',
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
  offset: prop.size / 4,
  color: prop.color,
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
      d: `M0 0 H${prop.size} L0 ${prop.size}V0 Z`,
      transform: `rotate(${attr.rotate}, ${prop.size / 2}, ${prop.size / 2})`,
    },
    rt: {
      d: [
        `M${svgSize.width} 0`,
        `L${svgSize.width} ${prop.size}`,
        `L${svgSize.width - prop.size} 0Z`,
      ].join(' '),
      transform: `rotate(${attr.rotate}, ${svgSize.width - prop.size / 2}, ${prop.size / 2})`,
    },
    br: {
      d: [
        `M${svgSize.width} ${svgSize.height}`,
        `L${svgSize.width - prop.size} ${svgSize.height}`,
        `L${svgSize.width} ${svgSize.height - prop.size}`,
        `L${svgSize.width} ${svgSize.height} Z`,
      ].join(' '),
      transform: `rotate(${attr.rotate}, ${svgSize.width - prop.size / 2}, ${svgSize.height - prop.size / 2})`,
    },
    bl: {
      d: [
        `M0 ${svgSize.height}`,
        `L0 ${svgSize.height - prop.size}`,
        `L${prop.size} ${svgSize.height}`,
        `L0 ${svgSize.height} Z`,
      ].join(' '),
      transform: `rotate(${attr.rotate}, ${prop.size / 2}, ${svgSize.height - prop.size / 2})`,
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
        offset: prop.size / 4,
        color: prop.color,
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
        offset: prop.size / 4,
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
        offset: prop.size,
        color: prop.color,
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
        offset: prop.size / 2,
        rotate: 180,
        duration,
        delay,
        easing: 'easeInOutCirc',
      }).finished,
      anime({
        targets: attr,
        color: prop.selectedColor,
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
        offset: prop.size / 2,
        rotate: 0,
        color: prop.color,
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
