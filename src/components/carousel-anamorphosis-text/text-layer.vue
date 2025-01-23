<template>
  <div
    ref="textLayerRef"
    class="text-layer flex items-center justify-center"
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
import { divide, multiply, pipe, round } from 'remeda'
import { computed, reactive, ref, watch } from 'vue'

// #region Props
interface Props {
  src: string;
  text: string;
  rotate: number;
  index: number;
  animationDuration: number;
  animationDelay: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

const textLayerRef = ref<HTMLDivElement>()
const textLayerSize = reactive(useElementSize(textLayerRef))

const textRef = ref<HTMLDivElement>()
const textSize = reactive(useElementSize(textRef))

const repeatTimes = ref(1)
const texts = computed(() => `${props.text} `.repeat(repeatTimes.value))

const rotateValue = computed(() => `${props.rotate}deg`)
const durationValue = computed(() => `${props.animationDuration}s`)
const delayValue = computed(() => `${props.index * props.animationDelay}s`)
const marginValue = computed(() => `-${props.index * 10}%`)
const backgroundValue = computed(() => `url('${props.src}')`)

watch(() => [
  textLayerSize.width,
  textSize.width,
  props.text,
], async () => {
  setTimeout(() => {
    // 計算目前文字框面積與文字層面積的比例
    const ratio = pipe(
      textLayerSize.width * textLayerSize.height,
      divide(textSize.width * textSize.height),
      round(0),
      // 因為文字框向外擴大，需要補償比例
      multiply(2),
    )

    if (ratio > 1 && ratio > repeatTimes.value) {
      repeatTimes.value = ratio
    }
  }, 1)
}, {
  flush: 'post',
})

/** 實現 restart animation */
const animationValue = ref<'text-in' | 'none'>('text-in')
watch(() => props.src, async () => {
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
  animation-duration: v-bind(durationValue)
  animation-delay: v-bind(delayValue)
  animation-fill-mode: forwards
  animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1)
  opacity: 0

.text-box
  // 擴大文字框，讓文字填充且超出文字層
  margin: v-bind(marginValue)
  line-height: 0.9
  letter-spacing: -0.25rem
  word-break: break-all
  white-space: pre-wrap
  word-wrap: break-word
</style>

<style lang="sass">
@keyframes text-in
  0%
    translate: 0 0 1000px
    rotate: v-bind(rotateValue)
    // 太卡惹，狠心關掉 ( ´•̥̥̥ ω •̥̥̥` )
    // filter: blur(4px)
    filter: brightness(1.4) hue-rotate(-30deg)
    opacity: 1
  100%
    translate: 0 0 0
    rotate: 0deg
    // filter: blur(0px)
    filter: brightness(1) hue-rotate(0deg)
    opacity: 1
</style>
