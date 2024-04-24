<template>
  <div class="w-full py-20 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <wrapper-cat-ear
      :action="action"
      main-color="#DDD"
      class="cat border rounded "
    >
      <div
        ref="catRef"
        class=" px-16 py-8 bg-white flex justify-center items-center"
      >
        <transition
          name="cat"
          mode="out-in"
        >
          <div
            :key="face"
            class=" absolute text-2xl font-bold text-nowrap select-none"
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

import WrapperCatEar, { ActionName } from '../wrapper-cat-ear.vue';

import { useMouseInElement, useMousePressed } from '@vueuse/core';

const faceMap: Record<ActionName, string> = {
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
const { pressed } = useMousePressed();

/** 滑鼠與貓的距離 */
const distance = computed(() => getVectorLength({
  x: elementX.value - elementWidth.value / 2,
  y: elementY.value - elementHeight.value / 2,
}));
/** 煩躁的距離 */
const displeasedDistance = computed(
  () => Math.max(elementWidth.value, elementHeight.value)
);
/** 變成貓的距離 */
const catDistance = computed(
  () => displeasedDistance.value * 2
);


const action = computed<`${ActionName}`>(() => {
  if (!isOutside.value) {
    return pressed.value ? 'shake' : 'fear';
  }

  if (distance.value < displeasedDistance.value) {
    return 'displeased';
  }

  return 'relaxed';
});
const face = computed(() => {
  if (distance.value > catDistance.value) {
    return '送出';
  }

  return faceMap[action.value]
});
</script>

<style lang="sass">
.cat
  transition-duration: 0.4s
  box-shadow: 4px 4px 0px 0px #AAA
  &:hover
    transition-duration: 0.3s
    scale: 1.02
    box-shadow: 6px 6px 0px 0px #CCC
  &:active
    transition-duration: 0.1s
    scale: 0.95
    animation: shake 0.3s infinite ease-in-out
    box-shadow: 0px 0px 0px 0px #888

.cat-enter-active, .cat-leave-active
  transition-duration: 0.2s
.cat-enter-from, .cat-leave-to
  transform: translateY(10px)
  opacity: 0 !important
.cat-leave-to
  transform: translateY(-10px)

@keyframes shake
  35%
    rotate: -3deg
  70%
    rotate: 3deg
</style>