<template>
  <div
    ref="textLayerRef"
    class="text-layer"
  >
    <div class="text-box flex">
      <div ref="textRef">
        {{ texts }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { divide, floor, multiply, pipe } from 'remeda'
import { computed, reactive, ref, watch } from 'vue'

// #region Props
interface Props {
  src: string;
  text: string;
  rotate: number;
  index: number;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

const textLayerRef = ref<HTMLDivElement>()
const textLayerSize = reactive(useElementSize(textLayerRef))

const textRef = ref<HTMLDivElement>()
const textSize = reactive(useElementSize(textRef))

const repeatTimes = ref(1)
const texts = computed(() => `${prop.text} `.repeat(repeatTimes.value))

const rotateValue = computed(() => `${prop.rotate}deg`)
const delayValue = computed(() => `${prop.index * 500}ms`)
const marginValue = computed(() => `-${prop.index * 5}%`)
const backgroundValue = computed(() => `url('${prop.src}')`)

watch(() => [textLayerSize.width, textSize.width], () => {
  // 計算目前文字框面積與文字層面積的比例
  const ratio = pipe(
    textLayerSize.width * textLayerSize.height,
    divide(textSize.width * textSize.height),
    floor(0),
    // 因為文字框向外擴大，需要補償比例
    multiply(1.5),
  )
  if (ratio > 1) {
    repeatTimes.value = ratio
  }
})

/** 實現 restart animation */
const animationValue = ref<'text-in' | 'none'>('text-in')
watch(() => prop.src, async () => {
  animationValue.value = 'none'

  // nextTick 沒用，改為土炮法
  setTimeout(() => {
    animationValue.value = 'text-in'
  }, 1)
})
</script>

<style scoped lang="sass">
.text-layer
  position: absolute
  inset: 0%
  background: v-bind(backgroundValue)
  background-size: cover
  background-position: center
  background-clip: text
  -webkit-text-fill-color: transparent
  animation-name: v-bind(animationValue)
  animation-duration: 4s
  animation-delay: v-bind(delayValue)
  animation-fill-mode: forwards
  animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1)
  opacity: 0

.text-box
  // 擴大文字框，讓文字填充且超出文字層
  margin: v-bind(marginValue)
  line-height: 0.9
  letter-spacing: -0.25rem
  font-weight: bold
  word-break: break-all
  white-space: pre-wrap
  word-wrap: break-word
</style>

<style lang="sass">
@keyframes text-in
  0%
    translate: 0 0 1000px
    rotate: v-bind(rotateValue)
    // filter: blur(2px)
    opacity: 1
  100%
    translate: 0 0 0
    rotate: 0deg
    // filter: blur(0px)
    opacity: 1
</style>
