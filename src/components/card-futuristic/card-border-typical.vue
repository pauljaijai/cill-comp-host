<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-border"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <line
        v-bind="lineStyleMap.t"
        y1="0"
        y2="0"
        :stroke="prop.color"
        stroke-width="1"
      />
      <line
        v-bind="lineStyleMap.l"
        x1="0"
        x2="0"
        :stroke="prop.color"
        stroke-width="1"
      />
      <line
        v-bind="lineStyleMap.b"
        :y1="cardSize.height"
        :y2="cardSize.height"
        :stroke="prop.color"
        stroke-width="1"
      />
      <line
        v-bind="lineStyleMap.r"
        :x1="cardSize.width"
        :x2="cardSize.width"
        :stroke="prop.color"
        stroke-width="1"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from './type'
import anime from 'animejs'
import { map, pipe } from 'remeda'
import { computed, inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
export interface Props {
  color?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  color: '#777',
})

const svgRef = ref<SVGAElement>()

const card = inject(PROVIDE_KEY)
const cardSize = computed(() => ({
  width: card?.contentSize.value.width ?? 0,
  height: card?.contentSize.value.height ?? 0,
}))

const style = computed(() => ({
  width: `${cardSize.value.width}px`,
  height: `${cardSize.value.height}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.value.width} ${cardSize.value.height}`,
)

const lineStyleMap = ref({
  t: { x1: 0, x2: 0 },
  l: { y1: 0, y2: 0 },
  b: { x1: 0, x2: 0 },
  r: { y1: 0, y2: 0 },
})

const animeMap: AnimeMap = {
  async normal(param) {
    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        [
          lineStyleMap.value.t,
          lineStyleMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: 0,
          x2: cardSize.value.width,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
      ...pipe(
        [
          lineStyleMap.value.l,
          lineStyleMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: 0,
          y2: cardSize.value.height,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        [
          lineStyleMap.value.t,
          lineStyleMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: 0,
          x2: cardSize.value.width,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
      ...pipe(
        [
          lineStyleMap.value.l,
          lineStyleMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: 0,
          y2: cardSize.value.height,
          duration,
          delay: 200 + delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async hidden(param) {
    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      ...pipe(
        [
          lineStyleMap.value.t,
          lineStyleMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: cardSize.value.width / 2,
          x2: cardSize.value.width / 2,
          duration,
          delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),

      ...pipe(
        [
          lineStyleMap.value.l,
          lineStyleMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: cardSize.value.height / 2,
          y2: cardSize.value.height / 2,
          duration,
          delay: 200 + delay,
          easing: 'easeInOutCirc',
        }).finished),
      ),
    ]

    await Promise.all(tasks)
  },
  async selected(param) {
    this.hover(param)
  },
  async hover(param) {
    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const offset = 10

    const tasks = [
      ...pipe(
        [
          lineStyleMap.value.t,
          lineStyleMap.value.b,
        ],
        map((targets) => anime({
          targets,
          x1: offset,
          x2: cardSize.value.width - offset,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
      ...pipe(
        [
          lineStyleMap.value.l,
          lineStyleMap.value.r,
        ],
        map((targets) => anime({
          targets,
          y1: offset,
          y2: cardSize.value.height - offset,
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
