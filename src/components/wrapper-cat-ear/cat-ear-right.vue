<template>
  <div class="right-ear">
    <cat-ear
      :init-animate="initAnimate"
      v-bind="props"
    />
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';

import CatEar, {
  AnimateMap,
  Props as EarProps,
} from './base-cat-ear.vue';

interface Props extends Pick<EarProps, 'emotion' | 'color'> { }
const props = defineProps<Props>();

type InitAnimate = InstanceType<typeof CatEar>['$props']['initAnimate'];
type GetAnimateParam = Parameters<InitAnimate>[0]

function startRelaxedAnimate({ earEl }: GetAnimateParam) {
  const rotation = gsap.getProperty(earEl, 'rotation');
  const tl = gsap.timeline();

  return tl
    .fromTo(earEl,
      { rotation },
      {
        rotation: 10,
        duration: 0.6,
      })
    .to(earEl, {
      rotation: 0,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
    });
}

function startDispleasedAnimate({ earEl }: GetAnimateParam) {
  const rotation = gsap.getProperty(earEl, 'rotation');

  const tl = gsap.timeline();

  return tl
    .fromTo(earEl,
      { rotation },
      {
        rotation: 85,
        duration: 0.6,
      })
    .to(earEl, {
      rotation: 90,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
    })
}

const initAnimate: InitAnimate = (param) => {
  const result: AnimateMap = {
    relaxed: () => startRelaxedAnimate(param),
    displeased: () => startDispleasedAnimate(param),
  }

  result.relaxed();

  return result;
}
</script>

<style scoped lang="sass">
.right-ear
  scale: -1 1
</style>
