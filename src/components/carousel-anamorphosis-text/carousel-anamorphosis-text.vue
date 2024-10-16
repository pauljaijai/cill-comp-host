<template>
  <div
    class="overflow-hidden"
    :style
    @click="next"
  >
    <div class="wrapper relative">
      <text-layer-container
        :text="prop.text"
        :src
      />

      <img
        :src
        class="object-cover"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, watchEffect } from 'vue'
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

  srcList: string[];
  height?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  height: '400px',
})

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

const currentIndex = ref(0)
const src = computed(() => prop.srcList[currentIndex.value] as string)
watchEffect(() => {
  console.log(`🚀 ~ src:`, src)
})

const style = computed<CSSProperties>(() => ({
  height: prop.height,
}))

function next() {
  currentIndex.value = (currentIndex.value + 1) % prop.srcList.length
}

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
.wrapper
  perspective: 1000px
</style>
