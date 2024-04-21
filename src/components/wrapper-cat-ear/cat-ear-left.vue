<template>
  <div ref="frameRef">
    <cat-ear
      :init-animate="initAnimate"
      v-bind="earProps"
    />
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { computed, ref } from 'vue';

import CatEar, {
  AnimateMap,
  Props as EarProps,
} from './base-cat-ear.vue';

import { useMouseInElement } from '@vueuse/core';

interface Props extends Pick<EarProps, 'emotion' | 'color'> { }
const props = defineProps<Props>();

const frameRef = ref<HTMLDivElement>();
const { isOutside } = useMouseInElement(frameRef);

const earProps = computed(() => {
  return {
    ...props,
    emotion: isOutside.value ? props.emotion : 'shake',
  }
});

type InitAnimate = InstanceType<typeof CatEar>['$props']['initAnimate'];
type GetAnimateParam = Parameters<InitAnimate>[0]

function startRelaxedAnimate({ earEl }: GetAnimateParam) {
  const rotation = gsap.getProperty(earEl, 'rotation');
  const tl = gsap.timeline();

  return tl
    .to(earEl, {
      y: '0%',
      duration: 0.5,
    }, 'init')
    .fromTo(earEl,
      { rotation },
      {
        rotation: 5,
        duration: 0.5,
      }, 'init')
    .to(earEl, {
      rotation: 0,
      duration: 1,
      repeat: -1,
      ease: 'back.inOut(5)',
      yoyo: true,
      yoyoEase: true,
    })
}
function startDispleasedAnimate({ earEl }: GetAnimateParam) {
  const rotation = gsap.getProperty(earEl, 'rotation');

  const tl = gsap.timeline();

  return tl
    .to(earEl, {
      y: '10%',
      duration: 0.4,
    }, 'init')
    /** 因為 rotation 使用 repeat，
     * 如果不使用 fromTo 會造成 rotation 跳動，
     */
    .fromTo(earEl,
      { rotation },
      {
        rotation: 80,
        duration: 0.4,
        ease: 'back.out(2)',
      }, 'init')
    .to(earEl, {
      rotation: 85,
      duration: 0.5,
      repeat: -1,
      ease: 'back.inOut(5)',
      yoyo: true,
      yoyoEase: true,
    })
}
function startShakeAnimate({ earEl }: GetAnimateParam) {
  const rotation = gsap.getProperty(earEl, 'rotation');

  const tl = gsap.timeline();

  return tl
    .to(earEl, {
      y: '0%',
      duration: 0,
    }, 'init')
    .fromTo(earEl,
      { rotation },
      {
        rotation: 0,
        duration: 0,
        ease: 'back.out(2)',
      }, 'init')
    .to(earEl, {
      rotation: 'random(30, 130)',
      duration: 0.1,
      repeat: -1,
      ease: 'expo.in',
      repeatRefresh: true,
      yoyo: true,
    })
}

const initAnimate: InitAnimate = (param) => {
  const result: AnimateMap = {
    relaxed: () => startRelaxedAnimate(param),
    displeased: () => startDispleasedAnimate(param),
    shake: () => startShakeAnimate(param),
  }

  result.relaxed();

  return result;
}

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
