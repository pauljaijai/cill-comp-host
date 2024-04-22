<template>
  <div ref="frameRef">
    <cat-ear
      :init-animate="initAnimate"
      v-bind="earProps"
    />
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { computed, ref } from 'vue';

import CatEar, {
  AnimateInstance,
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

function cancelAnimation(animations: anime.AnimeInstance[]) {
  animations.forEach((animation) => {
    const index = anime.running.indexOf(animation);
    anime.running.splice(index, 1);
  });
}

function startRelaxedAnimate({ earEl }: GetAnimateParam): AnimateInstance {
  const step01 = anime({
    targets: earEl,
    rotate: -10,
    duration: 1000,
    begin() {
      const rotate = anime.get(earEl, 'rotate');
      console.log(rotate);
      anime.set(earEl, { rotate })
    },
    complete: () => step02.play(),
  })

  const step02 = anime({
    targets: earEl,
    keyframes: [
      { rotate: [-10, 10] },
      { rotate: -10 },
    ],
    begin() {
      anime.set(earEl, { rotate: -10 })
    },
    duration: 2000,
    loop: true,
    autoplay: false,
  })

  return {
    stop() {
      cancelAnimation([step01, step02]);
    },
  };
}
function startDispleasedAnimate({ earEl }: GetAnimateParam): AnimateInstance {
  const step01 = anime({
    targets: earEl,
    rotate: 85,
    duration: 600,
    begin() {
      const rotate = anime.get(earEl, 'rotate');
      anime.set(earEl, { rotate })
    },
    complete: () => step02.play(),
  })

  const step02 = anime({
    targets: earEl,
    keyframes: [
      { rotate: [85, 88] },
      { rotate: 85 },
    ],
    begin() {
      anime.set(earEl, { rotate: 85 })
    },
    duration: 100,
    loop: true,
    autoplay: false,
  })

  return {
    stop() {
      cancelAnimation([step01, step02]);
    },
  };
}
function startShakeAnimate({ earEl }: GetAnimateParam): AnimateInstance {
  const result = anime({
    targets: earEl,
    keyframes: [
      { rotate: 85 },
      { rotate: 95 },
      { rotate: 85 },
    ],
    duration: 1000,
    loop: true
  })

  return {
    stop() {
      result.pause();
    },
  };
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
