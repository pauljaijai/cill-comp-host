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
      <line v-bind="lineStyleMap.t" />
      <line v-bind="lineStyleMap.l" />
      <line v-bind="lineStyleMap.b" />
      <line v-bind="lineStyleMap.r" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from './type'
import { whenever } from '@vueuse/core'
import anime from 'animejs'
import { map, pipe } from 'remeda'
import { computed, inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

const svgRef = ref<SVGAElement>()

const card = inject(PROVIDE_KEY)
const cardSize = computed(() => ({
  width: card?.bodySize.value.width ?? 0,
  height: card?.bodySize.value.height ?? 0,
}))

const style = computed(() => ({
  width: `${cardSize.value.width}px`,
  height: `${cardSize.value.height}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.value.width} ${cardSize.value.height}`,
)

const lineStyleMap = ref({
  t: {
    'x1': 0,
    'y1': 0,
    'x2': cardSize.value.width,
    'y2': 0,
    'stroke': '#777',
    // 寫成小駝峰（strokeWidth）沒有作用
    'stroke-width': 2,
  },
  l: {
    'x1': 0,
    'y1': 0,
    'x2': 0,
    'y2': cardSize.value.height,
    'stroke': '#777',
    'stroke-width': 4,
  },
  b: {
    'x1': 0,
    'y1': cardSize.value.height,
    'x2': cardSize.value.width,
    'y2': cardSize.value.height,
    'stroke': '#777',
    'stroke-width': 2,
  },
  r: {
    'x1': cardSize.value.width,
    'y1': 0,
    'x2': cardSize.value.width,
    'y2': cardSize.value.height,
    'stroke': '#777',
    'stroke-width': 4,
  },
})

function initLineStyleMap() {
  lineStyleMap.value = {
    t: {
      'x1': 0,
      'y1': 0,
      'x2': cardSize.value.width,
      'y2': 0,
      'stroke': '#777',
      // 寫成小駝峰（strokeWidth）沒有作用
      'stroke-width': 2,
    },
    l: {
      'x1': 0,
      'y1': 0,
      'x2': 0,
      'y2': cardSize.value.height,
      'stroke': '#777',
      'stroke-width': 4,
    },
    b: {
      'x1': 0,
      'y1': cardSize.value.height,
      'x2': cardSize.value.width,
      'y2': cardSize.value.height,
      'stroke': '#777',
      'stroke-width': 2,
    },
    r: {
      'x1': cardSize.value.width,
      'y1': 0,
      'x2': cardSize.value.width,
      'y2': cardSize.value.height,
      'stroke': '#777',
      'stroke-width': 4,
    },
  }
}
whenever(() => cardSize.value.width && cardSize.value.height, () => {
  initLineStyleMap()
}, { once: true })

const animeMap: AnimeMap = {
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
