<template>
  <div
    ref="textLayerRef"
    class="text-layer"
  >
    <div
      ref="textBoxRef"
      class="text-box"
    >
      {{ texts }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize, useIntervalFn } from '@vueuse/core'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'

// #region Props
interface Props {
  text: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

const textLayerRef = ref<HTMLDivElement>()
const textLayerSize = reactive(useElementSize(textLayerRef))

const textBoxRef = ref<HTMLDivElement>()
const textBoxSize = reactive(useElementSize(textBoxRef))

const repeatTimes = ref(1)
const texts = computed(() => `${prop.text}  ${prop.text} `.repeat(repeatTimes.value))

// 不斷填充文字，直到文字框高度超過文字層高度的 1.2 倍
onMounted(async () => {
  let isPadding = false
  const { pause } = useIntervalFn(async () => {
    if (isPadding)
      return

    repeatTimes.value++
    isPadding = true
    await nextTick()
    isPadding = false

    if (textBoxSize.height > textLayerSize.height * 1.5) {
      pause()
    }
  }, 1)
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
  margin: -20%
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
