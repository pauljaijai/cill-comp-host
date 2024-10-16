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
import { until, useElementSize } from '@vueuse/core'
import { divide, floor, multiply, pipe, when } from 'remeda'
import { computed, onMounted, reactive, ref } from 'vue'

// #region Props
interface Props {
  text: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

const textLayerRef = ref<HTMLDivElement>()
const textLayerSize = reactive(useElementSize(textLayerRef))

const textRef = ref<HTMLDivElement>()
const textSize = reactive(useElementSize(textRef))

const repeatTimes = ref(1)
/** 刻意加上不對稱空白，製造文字錯落效果 */
const texts = computed(() => `${prop.text} `.repeat(repeatTimes.value))

onMounted(async () => {
  // 需要等到資源載入完成才能取得元素尺寸
  await until(() => textLayerSize.width > 0 && textSize.width > 0).toBeTruthy()

  // 計算目前文字框面積與文字層面積的比例
  const ratio = pipe(
    textLayerSize.width * textLayerSize.height,
    divide(textSize.width * textSize.height),
    floor(0),
    // 因為文字框向外擴大 10%，需要補償比例
    multiply(1.5),
    when(Number.isNaN, () => 1),
  )

  repeatTimes.value = ratio
  textSize.stop()
  textLayerSize.stop()
})
</script>

<style scoped lang="sass">
.text-layer
  position: absolute
  inset: 0%
  background: url('/photography-street-cat.jpg')
  background-size: cover
  background-clip: text
  -webkit-text-fill-color: transparent
  animation-name: in-1
  animation-duration: 4s
  animation-fill-mode: forwards
  animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1)
  opacity: 0

.text-box
  // 擴大文字框，讓文字填充且超出文字層
  margin: -10%
  font-size: 12rem
  line-height: 0.8
  letter-spacing: -0.25rem
  font-weight: bold
  word-break: break-all
  white-space: pre-wrap
  word-wrap: break-word

@keyframes in-1
  0%
    transform: translateZ(1000px) rotateZ(30deg)
    opacity: 1
  100%
    transform: translateZ(0) rotateY(0)
    opacity: 1
</style>
