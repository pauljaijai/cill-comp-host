<template>
  <svg ref="svg">
    <!--  -->
  </svg>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const svgRef = useTemplateRef('svg')
</script>

<style scoped lang="sass">
</style>
