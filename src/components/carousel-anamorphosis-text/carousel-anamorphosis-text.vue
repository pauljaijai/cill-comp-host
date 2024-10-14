<template>
  <div class="carousel-anamorphosis-text relative overflow-hidden">
    <div class="text-layer">
      codfish codfish codfish codfish codfish codfish codfish codfish codfish codfish codfish
      codfish codfish codfish codfish codfish codfish codfish codfish codfish codfish codfish
    </div>

    <div class="text-layer">
      fish fish fish fish fish fish fish fish fish fish fish
      fish fish fish fish fish fish fish fish fish fish fish
    </div>

    <div class="text-layer">
      cod cod cod cod cod cod cod cod cod cod cod
      cod cod cod cod cod cod cod cod cod cod cod
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

.text-layer
  position: absolute
  inset: 0
  font-size: 10rem
  line-height: 1
  font-weight: bold
  word-break: break-all
  white-space: pre-wrap
  word-wrap: break-word
  background: url('/painting-codfish-bakery.webp')
  background-size: cover
  background-clip: text
  overflow: hidden
  color: #de466c
  -webkit-text-fill-color: transparent
  transform: translateZ(100px)
  animation: in-1 3s forwards
  opacity: 0
  &:nth-child(2)
    animation: in-2 3s forwards
    animation-delay: 600ms
  &:nth-child(3)
    animation: in-3 3s forwards
    animation-delay: 1200ms

@keyframes in-1
  0%
    transform: translateZ(1000px) rotateZ(30deg)
    opacity: 1
  100%
    transform: translateZ(0) rotateY(0)
    opacity: 1

@keyframes in-2
  0%
    transform: translateZ(1000px) rotateZ(30deg)
    opacity: 1
  100%
    transform: translateZ(0) rotateY(0)
    opacity: 1

@keyframes in-3
  0%
    transform: translateZ(1000px) rotateZ(10deg)
    opacity: 1
  100%
    transform: translateZ(0) rotateY(0)
    opacity: 1
</style>
