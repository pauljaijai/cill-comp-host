<template>
  <div
    ref="frameRef"
    class="right-ear"
  >
    <cat-ear
      :init-animate="initAnimate"
      v-bind="earProps"
    />
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { ref, computed } from 'vue';

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
      duration: 0.4,
    }, 'init')
    .fromTo(earEl,
      { rotation },
      {
        rotation: 5,
        duration: 0.4,
        ease: 'back.out(2)',
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
function startDispleasedAnimate({ earEl, insideEl }: GetAnimateParam) {
  const rotation = gsap.getProperty(earEl, 'rotation');

  const tl = gsap.timeline();

  return tl
    // .to(insideEl, {
    //   fill: '#FF0000',
    //   duration: 0.4,
    // }, 'init')
    .to(earEl, {
      y: '10%',
      duration: 0.4,
    }, 'init')
    .fromTo(earEl,
      { rotation },
      {
        rotation: 80,
        duration: 0.4,
        ease: 'back.out(2)',
      }, 'init')
    .to(earEl, {
      rotation: 85,
      duration: 0.6,
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
</script>

<style scoped lang="sass">
.right-ear
  scale: -1 1
</style>
