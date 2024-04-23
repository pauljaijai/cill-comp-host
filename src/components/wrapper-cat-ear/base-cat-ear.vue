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
      :fill="props.mainColor"
    />
    <path
      ref="outsideRef"
      d="M200 0C338 190 350 364.997 350 364.997H0C0 364.997 0 147 200 0Z"
      :fill="props.mainColor"
    />
    <path
      ref="insideRef"
      d="M195 17.5C319 184 329.5 313 340.5 364.997C292.5 380.5 211 396.5 136.5 364.997C136.5 295.5 121 243.003 195 17.5Z"
      :fill="props.innerColor"
    />
  </svg>
</template>

<script lang="ts">
export interface AnimateInstance {
  stop: () => void;
}
export type AnimateMap = Record<EmotionName, () => AnimateInstance>;

export interface Props {
  emotion?: `${EmotionName}`;
  mainColor?: string;
  innerColor?: string;
  initAnimate: (param: {
    earEl: SVGElement;
    insideEl: SVGPathElement;
    outsideEl: SVGPathElement;
  }) => AnimateMap;
}

</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { EmotionName } from './wrapper-cat-ear.vue';

const props = withDefaults(defineProps<Props>(), {
  emotion: 'relaxed',
  mainColor: '#CECECE',
  innerColor: '#E7E7E7',
});

const earRef = ref<SVGElement>();
const insideRef = ref<SVGPathElement>();
const outsideRef = ref<SVGPathElement>();

let animateMap: AnimateMap | undefined;
let prevAnimate: AnimateInstance | undefined;
watch(() => props.emotion, (value) => {
  if (!animateMap) return;

  prevAnimate?.stop();

  prevAnimate = animateMap?.[value]?.();
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

  prevAnimate = animateMap?.[props.emotion]?.();
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.ear
  transform-origin: 50% 80%
</style>
