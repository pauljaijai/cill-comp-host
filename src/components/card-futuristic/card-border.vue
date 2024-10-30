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
import { computed, inject, ref } from 'vue'
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

const lineStyleMap = computed(() => ({
  t: {
    'y1': 0,
    'x2': cardSize.value.width,
    'y2': 0,
    'stroke': '#777',
    // 寫成小駝峰（strokeWidth）沒有作用
    'stroke-width': '2',
  },
  l: {
    'x1': 0,
    'x2': 0,
    'y2': cardSize.value.height,
    'stroke': '#777',
    'stroke-width': '4',
  },
  b: {
    'y1': cardSize.value.height,
    'x2': cardSize.value.width,
    'y2': cardSize.value.height,
    'stroke': '#777',
    'stroke-width': '2',
  },
  r: {
    'x1': cardSize.value.width,
    'y1': 0,
    'x2': cardSize.value.width,
    'y2': cardSize.value.height,
    'stroke': '#777',
    'stroke-width': '4',
  },
}))
</script>

<style scoped lang="sass">
</style>
