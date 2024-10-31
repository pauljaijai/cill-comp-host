<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-corner"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path v-bind="cornerStyleMap.lt" />
      <path v-bind="cornerStyleMap.rt" />
      <path v-bind="cornerStyleMap.br" />
      <path v-bind="cornerStyleMap.bl" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from './type'
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { addProp, mapValues, pipe } from 'remeda'
import { computed, inject, onMounted, reactive, ref } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  cornerSize?: number;
  cornerColor?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  cornerSize: 10,
  cornerColor: '#444',
})

const svgRef = ref<SVGAElement>()
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

const card = inject(PROVIDE_KEY)
const cardSize = computed(() => ({
  width: card?.bodySize.value.width ?? 0,
  height: card?.bodySize.value.height ?? 0,
}))

const offset = ref(prop.cornerSize / 4)
const style = computed(() => ({
  left: `-${offset.value}px`,
  top: `-${offset.value}px`,
  width: `${cardSize.value.width + offset.value * 2}px`,
  height: `${cardSize.value.height + offset.value * 2}px`,
}))

const viewBox = computed(
  () => `0 0 ${svgSize.width} ${svgSize.height}`,
)

const cornerStyleMap = computed(() => pipe(
  {
    lt: {
      d: `M0 0H${prop.cornerSize}L0 ${prop.cornerSize}V0Z`,
    },
    rt: {
      d: [
        `M${svgSize.width} 0L${svgSize.width}`,
        `${prop.cornerSize}L${svgSize.width - prop.cornerSize} 0 0Z`,
      ].join(' '),
    },
    br: {
      d: [
        `M${svgSize.width} ${svgSize.height}`,
        `L${svgSize.width - prop.cornerSize} ${svgSize.height}`,
        `L${svgSize.width} ${svgSize.height - prop.cornerSize}`,
        `L${svgSize.width} ${svgSize.height}Z`,
      ].join(' '),
    },
    bl: {
      d: [
        `M0 ${svgSize.height}`,
        `L0 ${svgSize.height - prop.cornerSize}`,
        `L${prop.cornerSize} ${svgSize.height}`,
        `L0 ${svgSize.height}Z`,
      ].join(' '),
    },
  },
  mapValues(addProp('fill', prop.cornerColor)),
))

const animeMap: AnimeMap = {
  async visible() {
    const tasks = [
      anime({
        targets: offset,
        value: prop.cornerSize / 4,
        opacity: 1,
        duration: 400,
        easing: 'easeOutExpo',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 1,
        duration: 400,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hidden() {
    const tasks = [
      anime({
        targets: offset,
        value: prop.cornerSize,
        duration: 400,
        easing: 'easeInExpo',
      }).finished,
      anime({
        targets: svgRef.value,
        opacity: 0,
        duration: 100,
        delay: 300,
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
</style>
