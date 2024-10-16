<template>
  <div
    class="carousel-anamorphosis-text relative overflow-hidden"
    @click="isPlaying = !isPlaying"
  >
    <text-layer-container
      :text="prop.text"
      :is-playing
    />

    <img src="/photography-street-cat.jpg">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextLayerContainer from './text-layer-container.vue'

// #region Props
interface Props {
  /** 文字內容。
   *
   * 如果給 `string[]`，則對應每一層的的文字內容。
   */
  text: string | string[] | Array<{
    /** 文字內容 */
    value: string;
    /** 額外的 CSS class */
    class?: string;
  }>;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

// #region Emits
// const emit = defineEmits<{
//   'update:modelValue': [value: Props['modelValue']];
// }>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: (props: { isRunning: boolean }) => unknown;
}>()
// #endregion Slots

const isPlaying = ref(false)

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
.carousel-anamorphosis-text
  perspective: 1000px
</style>
