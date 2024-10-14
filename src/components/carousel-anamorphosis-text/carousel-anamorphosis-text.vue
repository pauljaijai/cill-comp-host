<template>
  <div class="carousel-anamorphosis-text relative overflow-hidden">
    <div class="bg">
      文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
      文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
    </div>
    <img src="/painting-codfish-bakery.webp">
  </div>
</template>

<script setup lang="ts">
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
.bg
  position: absolute
  inset: 0
  font-size: 10rem
  background: url('/painting-codfish-bakery.webp')
  background-size: cover
  background-clip: text
  overflow: hidden
  color: #de466c
  -webkit-text-fill-color: transparent
  transform: translateZ(100px)
  animation: in 1s forwards

@keyframes in
  0%
    transform: translateZ(100px) rotateY(0deg)
  100%
    transform: translateZ(0) rotateY(0)
</style>
