<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="border-typical"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      v-bind="lineAttrMap.t"
      y1="0"
      y2="0"
      :stroke="props.color"
      stroke-width="1"
    />
    <line
      v-bind="lineAttrMap.l"
      x1="0"
      x2="0"
      :stroke="props.color"
      stroke-width="1"
    />
    <line
      v-bind="lineAttrMap.b"
      :y1="cardSize.height"
      :y2="cardSize.height"
      :stroke="props.color"
      stroke-width="1"
    />
    <line
      v-bind="lineAttrMap.r"
      :x1="cardSize.width"
      :x2="cardSize.width"
      :stroke="props.color"
      stroke-width="1"
    />
  </svg>
</template>

<script setup lang="ts">
import type { PartAnimeFcnMap } from '../type'
import { reactiveComputed } from '@vueuse/core'
import anime from 'animejs'
import { map, pipe } from 'remeda'
import { computed, inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props {
  color?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  color: '#777',
})

const svgRef = ref<SVGAElement>()

const card = inject(PROVIDE_KEY)
const cardSize = reactiveComputed(() => ({
  width: card?.contentSize.value.width ?? 0,
  height: card?.contentSize.value.height ?? 0,
}))

const style = computed(() => ({
  // +0.2 是為了避免邊框被裁切，感覺是 SVG 的怪癖
  width: `${cardSize.width + 0.2}px`,
  height: `${cardSize.height + 0.2}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.width} ${cardSize.height}`,
)

const lineAttrMap = ref({
  t: { x1: 0, x2: 0 },
  l: { y1: 0, y2: 0 },
  b: { x1: 0, x2: 0 },
  r: { y1: 0, y2: 0 },
})

function removeAnime() {
  anime.remove(Object.values(lineAttrMap.value))
}

const animeMap: PartAnimeFcnMap = {
  async normal(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        [
          lineAttrMap.value.t,
          lineAttrMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: 0,
          x2: cardSize.width,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
      ...pipe(
        [
          lineAttrMap.value.l,
          lineAttrMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: 0,
          y2: cardSize.height,
          duration,
          delay,
          easing: 'easeOutExpo',
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
          lineAttrMap.value.t,
          lineAttrMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: 0,
          x2: cardSize.width,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
      ...pipe(
        [
          lineAttrMap.value.l,
          lineAttrMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: 0,
          y2: cardSize.height,
          duration,
          delay: 200 + delay,
          easing: 'easeOutExpo',
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
          lineAttrMap.value.t,
          lineAttrMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: cardSize.width / 2,
          x2: cardSize.width / 2,
          duration,
          delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),

      ...pipe(
        [
          lineAttrMap.value.l,
          lineAttrMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: cardSize.height / 2,
          y2: cardSize.height / 2,
          duration,
          delay: 200 + delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async selected(param) {
    return this.hover(param)
  },
  async hover(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const offset = 10

    const tasks = [
      ...pipe(
        [
          lineAttrMap.value.t,
          lineAttrMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: offset,
          x2: cardSize.width - offset,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
      ...pipe(
        [
          lineAttrMap.value.l,
          lineAttrMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: offset,
          y2: cardSize.height - offset,
          duration,
          delay,
          easing: 'easeOutExpo',
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
