<template>
  <div
    ref="faceRef"
    class="relative aspect-[3/2]"
  >
    <face-eyebrow
      class="absolute left-0 top-0"
      v-bind="props"
    />
    <face-eye
      v-bind="props"
      class="absolute left-0 top-0"
    />
    <face-mouth
      class="absolute left-0 top-0"
      v-bind="props"
    />
  </div>
</template>

<script setup lang="ts">
import type { FacialExpression } from './type'
import anime from 'animejs'
import { ref, watch } from 'vue'
import FaceEye from './face-eye.vue'
import FaceEyebrow from './face-eyebrow.vue'
import FaceMouth from './face-mouth.vue'

// #region Props
interface Props {
  facialExpression?: `${FacialExpression}`;
  strokeColor?: string;
  /** 眼睛追蹤偏移半徑 */
  eyeOffsetRadius?: number;
}
// #endregion Props

// #region Emits
interface Emits {
  change: [];
}
// #endregion Emits

const props = withDefaults(defineProps<Props>(), {
  facialExpression: 'neutral',
  strokeColor: 'black',
  eyeOffsetRadius: 40,
})

const emit = defineEmits<Emits>()

const faceRef = ref<HTMLElement>()

const animeProviderMap: Record<
  FacialExpression,
  () => Promise<void>
> = {
  neutral: () => anime({
    targets: faceRef.value,
    rotate: 0,
    translateX: 0,
    translateY: 0,
    duration: 200,
  }).finished,
  excited: () => anime({
    targets: faceRef.value,
    keyframes: [
      { rotate: 5 },
      { rotate: -5 },
    ],
    duration: 1400,
    loop: true,
  }).finished,
  happy: () => anime({
    targets: faceRef.value,
    keyframes: [
      { translateY: 5 },
      { translateY: -5 },
    ],
    easing: 'easeInOutQuint',
    direction: 'alternate',
    duration: 1000,
    loop: true,
  }).finished,
  sad: () => Promise.resolve(),
  angry: () => Promise.resolve(),
  surprised: () => Promise.resolve(),
}

watch(
  () => props.facialExpression,
  async (facialExpression) => {
    if (faceRef.value) {
      anime.remove(faceRef.value)
    }

    await animeProviderMap.neutral()
    await animeProviderMap[facialExpression]()
    emit('change')
  },
  { immediate: true },
)

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
