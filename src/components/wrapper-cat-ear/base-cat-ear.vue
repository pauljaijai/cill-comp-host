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
export type AnimateMap = Record<EmotionName, () => gsap.core.Timeline>;

export interface Props {
  emotion?: `${EmotionName}`;
  color?: string;
  initAnimate: (param: {
    earEl: SVGElement;
    insideEl: SVGPathElement;
    outsideEl: SVGPathElement;
  }) => AnimateMap;
}

</script>

<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';
import { EmotionName } from './wrapper-cat-ear.vue';
import gsap from 'gsap';

const props = withDefaults(defineProps<Props>(), {
  emotion: 'relaxed',
  color: '#CECECE'
});

const earRef = ref<SVGElement>();
const insideRef = ref<SVGPathElement>();
const outsideRef = ref<SVGPathElement>();

let animateMap: AnimateMap | undefined;
let prevAnimate: gsap.core.Timeline | undefined;
watch(() => props.emotion, (value) => {
  if (!animateMap) return;

  prevAnimate?.pause();
  prevAnimate?.kill();

  prevAnimate = animateMap[value]?.();
});

onMounted(() => {
  if (
    !earRef.value || !insideRef.value || !outsideRef.value
  ) {
    console.error('Missing ref');
    return;
  }

  animateMap = props.initAnimate({
    earEl: earRef.value!,
    insideEl: insideRef.value!,
    outsideEl: outsideRef.value!,
  });

  animateMap?.[props.emotion]?.();
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.ear
  transform-origin: 50% 80%
</style>
