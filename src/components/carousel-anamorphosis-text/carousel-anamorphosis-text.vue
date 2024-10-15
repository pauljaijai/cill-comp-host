<template>
  <div class="carousel-anamorphosis-text relative overflow-hidden">
    <text-layer-container />

    <img src="/photography-street-cat.jpg">
  </div>
</template>

<script setup lang="ts">
import TextLayerContainer from './text-layer-container.vue'

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: (props: { isRunning: boolean }) => unknown;
}>()
// #endregion Slots

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
.carousel-anamorphosis-text
  perspective: 1000px
</style>
