<template>
  <div class="w-full py-20 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <wrapper-cat-ear
      :emotion="emotion"
      main-color="#4fb3ff"
      inner-color="#ffc2b8"
      class="cat"
    >
      <div
        ref="catRef"
        class=" rounded px-[4rem] py-[3rem] bg-[#4fb3ff] flex justify-center items-center "
      >
        <transition
          name="cat"
          mode="out-in"
        >
          <div
            class=" absolute text-nowrap select-none"
            :key="face"
            v-text="face"
          />
        </transition>
      </div>
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { getVectorLength } from '../../../common/utils';

import WrapperCatEar, { EmotionName } from '../wrapper-cat-ear.vue';

import { useMouseInElement, useMousePressed } from '@vueuse/core';

const faceMap: Record<EmotionName, string> = {
  relaxed: '◕ ω ◕',
  fear: '´•̥̥̥ ω •̥̥̥`',
  displeased: '˘･ ω ･˘',
  shake: '≧ X ≦',
}

const catRef = ref();
const {
  elementX, elementY,
  elementWidth, elementHeight,
  isOutside,
} = useMouseInElement(catRef);
const { pressed } = useMousePressed()

/** 滑鼠與貓的距離 */
const distance = computed(() => getVectorLength({
  x: elementX.value - elementWidth.value / 2,
  y: elementY.value - elementHeight.value / 2,
}));
const displeasedDistance = computed(
  () => Math.max(elementWidth.value, elementHeight.value)
);

const emotion = computed<`${EmotionName}`>(() => {
  if (!isOutside.value) {
    return pressed.value ? 'shake' : 'fear';
  }

  if (distance.value < displeasedDistance.value) {
    return 'displeased';
  }

  return 'relaxed';
});
const face = computed(() => faceMap[emotion.value]);
</script>

<style lang="sass">
.cat
  transition-duration: 0.4s
  &:hover
    transition-duration: 0.3s
    scale: 1.02
  &:active
    transition-duration: 0.1s
    opacity: 0.5
    scale: 0.95

.cat-enter-active, .cat-leave-active
  transition-duration: 0.2s
.cat-enter-from, .cat-leave-to
  transform: translateY(10px)
  opacity: 0 !important
.cat-leave-to
  transform: translateY(-10px)
</style>