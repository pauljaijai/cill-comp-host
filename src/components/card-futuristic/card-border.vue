<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <!-- t -->
      <line v-bind="lineStyle.t" />

      <!-- l -->
      <line v-bind="lineStyle.l" />

      <!-- b -->
      <line v-bind="lineStyle.b" />

      <!-- r -->
      <line v-bind="lineStyle.r" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const svgRef = ref<SVGAElement>()

const card = inject(PROVIDE_KEY)

const size = computed(() => {
  return {
    width: card?.bodySize.value.width ?? 0,
    height: card?.bodySize.value.height ?? 0,
  }
})

const style = computed(() => ({
  width: size.value.width,
  height: size.value.height,
}))

const viewBox = computed(
  () => `0 0 ${size.value.width} ${size.value.height}`,
)

const lineStyle = computed(() => ({
  t: {
    y1: 0,
    x2: size.value.width,
    y2: 0,
    stroke: '#777',
    strokeWidth: 4,
  },
  l: {
    x1: 0,
    x2: 0,
    y2: size.value.height,
    stroke: '#777',
    strokeWidth: 4,
  },
  b: {
    y1: size.value.height,
    x2: size.value.width,
    y2: size.value.height,
    stroke: '#777',
    strokeWidth: 4,
  },
  r: {
    x1: size.value.width,
    y1: 0,
    x2: size.value.width,
    y2: size.value.height,
    stroke: '#777',
    strokeWidth: 4,
  },
}))
</script>

<style scoped lang="sass">
</style>
