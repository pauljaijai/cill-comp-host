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
      :animation-duration
      :animation-delay
    />

    <!-- 預先載入所有圖片 -->
    <div class="hidden">
      <img
        v-for="src in imgs"
        :key="src"
        :src="src"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { add, map, multiply, pipe, unique } from 'remeda'
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

    /** 為空則以 Props.animationDuration 為主 */
    animationDuration?: number;
    /** 為空則以 Props.animationDelay 為主 */
    animationDelay?: number;
  }>;
  /** @default 400px */
  height?: string;

  animationDuration?: number;
  animationDelay?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
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
  height: props.height,
}))

const imgs = computed(() => pipe(
  props.srcList,
  map(({ url }) => url),
  unique(),
))

/** 目標圖片 index */
const currentIndex = ref(0)
/** 目前圖片 index。因為新圖片會比文字的圖片延遲更換，所以需要分開 */
const imgIndex = ref(0)

const srcItem = computed(() => props.srcList[currentIndex.value]!)
const imgSrcItem = computed(() => props.srcList[imgIndex.value]!)
const imgStyle = computed(() => ({
  'background-image': `url('${imgSrcItem.value.url}')`,
}))

const animationDuration = computed(
  () => srcItem.value.animationDuration ?? props.animationDuration,
)
const animationDelay = computed(
  () => srcItem.value.animationDelay ?? props.animationDelay,
)

/** 總動畫時間。單位 ms
 *
 * 目前每層延遲 0.5s
 */
const totalAnimationDuration = computed(() => pipe(
  srcItem.value,
  ({ text }) => {
    const { animationDelay, animationDuration } = props

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
/** 圖片切換時間長度 */
const imgTransitionDurationValue = computed(() => `${totalAnimationDuration.value / 3}ms`)

const isPlaying = ref(true)
setTimeout(() => {
  isPlaying.value = false
}, totalAnimationDuration.value)

function next() {
  if (isPlaying.value)
    return

  isPlaying.value = true
  currentIndex.value = (currentIndex.value + 1) % props.srcList.length

  setTimeout(() => {
    isPlaying.value = false
  }, totalAnimationDuration.value)

  processChangeImg()
}

function prev() {
  if (isPlaying.value)
    return

  isPlaying.value = true
  currentIndex.value = (currentIndex.value - 1 + props.srcList.length) % props.srcList.length

  setTimeout(() => {
    isPlaying.value = false
  }, totalAnimationDuration.value)

  processChangeImg()
}

/** 中途才更換圖片 */
function processChangeImg() {
  setTimeout(() => {
    imgIndex.value = currentIndex.value
  }, totalAnimationDuration.value / 3)
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
  transition-duration: v-bind(imgTransitionDurationValue)
.opacity-enter-from, .opacity-leave-to
  opacity: 0 !important
</style>
