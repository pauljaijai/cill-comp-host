<template>
  <div
    class="wrapper relative h-full w-full overflow-hidden"
    :style
    @click="next"
  >
    <transition
      name="opacity"
      mode="in-out"
      appear
    >
      <div
        :key="imgIndex"
        class="img absolute h-full w-full"
        :style="imgStyle"
      />
    </transition>

    <text-layer-container
      :text="prop.text"
      :src
    />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { multiply, pipe } from 'remeda'
import { computed, ref } from 'vue'
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
  /** @default 400px */
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

const style = computed<CSSProperties>(() => ({
  height: prop.height,
}))

/** 目標圖片 index */
const currentIndex = ref(0)
/** 目前圖片 index。因為新圖片會比文字的圖片延遲更換，所以需要分開 */
const imgIndex = ref(0)

const src = computed(() => prop.srcList[currentIndex.value] as string)
const imgSrc = computed(() => prop.srcList[imgIndex.value] as string)
const imgStyle = computed(() => ({
  'background-image': `url('${imgSrc.value}')`,
}))

/** 總動畫時間。單位 ms
 *
 * 目前 animation-duration 為 4s，每層延遲 0.5s
 */
const totalAnimationDuration = computed(() => pipe(
  prop.text,
  (text) => {
    if (typeof text === 'string') {
      /** 預設 3 層 */
      return 4 + (0.5 * 3 - 1)
    }

    return 4 + (0.5 * text.length - 1)
  },
  multiply(1000),
))

function next() {
  currentIndex.value = (currentIndex.value + 1) % prop.srcList.length

  // 執行到一半才更換圖片
  setTimeout(() => {
    imgIndex.value = currentIndex.value
  }, totalAnimationDuration.value / 2)
}

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
.wrapper
  perspective: 1000px

.img
  background-size: cover
  background-position: center
  box-shadow: 0px 0px 0px 0px #000

.opacity-enter-active, .opacity-leave-active
  transition-duration: 1s
.opacity-enter-from, .opacity-leave-to
  opacity: 0 !important
</style>
