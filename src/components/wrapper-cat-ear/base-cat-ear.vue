<template>
  <svg
    ref="earRef"
    viewBox="0 0 350 540"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="ear"
  >
    <circle
      cx="175"
      cy="364.997"
      r="175"
      fill="#CECECE"
    />
    <path
      ref="outsideRef"
      d="M200 0C338 190 350 364.997 350 364.997H0C0 364.997 0 147 200 0Z"
      fill="#CECECE"
    />
    <path
      ref="insideRef"
      d="M202 0C350 170 350 364.997 350 364.997H136.5C136.5 364.997 128 225.503 202 0Z"
      fill="#E7E7E7"
    />
  </svg>
</template>

<script lang="ts">
export type AnimateMap = Record<EmotionName, AnimationControls>;

export interface Props {
  emotion?: `${EmotionName}`;
  color?: string;
  initAnimate: (param: {
    earEl: SVGElement;
    insideEl: SVGPathElement;
    outsideEl: SVGPathElement;
  }) => AnimateMap;
}

export type Emits = {
  'update:emotion': [value: NonNullable<Props['emotion']>];
}
</script>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { AnimationControls } from "motion"
import { EmotionName } from './wrapper-cat-ear.vue';

import { useVModel } from '@vueuse/core';

const props = withDefaults(defineProps<Props>(), {
  emotion: 'relaxed',
  color: '#CECECE'
});
const emit = defineEmits<Emits>();

const earRef = ref<SVGElement>();
const insideRef = ref<SVGPathElement>();
const outsideRef = ref<SVGPathElement>();

const emotion = useVModel(props, 'emotion', emit);

const animateMap = shallowRef<AnimateMap>();

onMounted(() => {
  if (
    !earRef.value || !insideRef.value || !outsideRef.value
  ) {
    console.error('Missing ref');
    return;
  }

  animateMap.value = props.initAnimate({
    earEl: earRef.value!,
    insideEl: insideRef.value!,
    outsideEl: outsideRef.value!,
  });

  animateMap.value?.[emotion.value]?.play();
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.ear
  transform-origin: 50% 80%
</style>
