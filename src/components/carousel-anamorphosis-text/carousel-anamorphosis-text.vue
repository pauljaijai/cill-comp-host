<template>
  <div
    class="wrapper relative h-full w-full overflow-hidden"
    :style
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
      :text="srcItem.text"
      :src="srcItem.url"
      :animation-duration="prop.animationDuration"
      :animation-delay="prop.animationDelay"
    />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { add, multiply, pipe } from 'remeda'
import { computed, ref } from 'vue'
import TextLayerContainer from './text-layer-container.vue'

// #region Props
interface Props {
  srcList: Array<{
    /** 圖片 url */
    url: string;

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
  }>;
  /** @default 400px */
  height?: string;

  animationDuration?: number;
  animationDelay?: number;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  height: '400px',
  animationDuration: 3.4,
  animationDelay: 0.4,
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

const srcItem = computed(() => prop.srcList[currentIndex.value]!)
const imgSrcItem = computed(() => prop.srcList[imgIndex.value]!)
const imgStyle = computed(() => ({
  'background-image': `url('${imgSrcItem.value.url}')`,
}))

/** 總動畫時間。單位 ms
 *
 * 目前每層延遲 0.5s
 */
const totalAnimationDuration = computed(() => pipe(
  srcItem.value,
  ({ text }) => {
    const { animationDelay, animationDuration } = prop

    if (typeof text === 'string') {
      /** 預設 3 層 */
      return animationDuration + (animationDelay * 3 - 1)
    }

    return animationDuration + (animationDelay * text.length - 1)
  },
  multiply(1000),
  /** 安全係數 */
  add(200),
))

const isPlaying = ref(true)
setTimeout(() => {
  isPlaying.value = false
}, totalAnimationDuration.value)

function next() {
  if (isPlaying.value)
    return

  isPlaying.value = true
  currentIndex.value = (currentIndex.value + 1) % prop.srcList.length

  setTimeout(() => {
    isPlaying.value = false
  }, totalAnimationDuration.value)

  // 中途才更換圖片
  setTimeout(() => {
    imgIndex.value = currentIndex.value
  }, totalAnimationDuration.value / 3 * 2)
}

function prev() {
  if (isPlaying.value)
    return

  isPlaying.value = true
  currentIndex.value = (currentIndex.value - 1 + prop.srcList.length) % prop.srcList.length

  setTimeout(() => {
    isPlaying.value = false
  }, totalAnimationDuration.value)

  // 中途才更換圖片
  setTimeout(() => {
    imgIndex.value = currentIndex.value
  }, totalAnimationDuration.value / 3 * 2)
}

// #region Methods
defineExpose({
  currentItem: srcItem,
  isPlaying: computed(() => isPlaying.value),
  next,
  prev,
})
// #endregion Methods
</script>

<style scoped lang="sass">
.wrapper
  perspective: 1000px
  background: #000

.img
  background-size: cover
  background-position: center

.opacity-enter-active, .opacity-leave-active
  transition-duration: 1s
.opacity-enter-from, .opacity-leave-to
  opacity: 0 !important
</style>
