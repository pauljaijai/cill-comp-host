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
import anime from 'animejs';
import { ref, computed } from 'vue';

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

  function startRelaxedAnimate({ earEl }: GetAnimateParam): AnimateInstance {
  const step02 = anime({
    targets: earEl,
    keyframes: [
      { rotate: 10 },
      { rotate: -10 },
    ],
    duration: 2000,
    loop: true,
    /** 第一次循環時，強制調整 from，就不會有跳動問題了  */
    loopComplete() {
      const tween = step02.animations[0].tweens[0] as any;
      tween.from.numbers = [-10]
    },
  })

  return {
    stop() {
      anime.remove(earEl);
    },
  };
}
function startDispleasedAnimate({ earEl }: GetAnimateParam): AnimateInstance {
  const step01 = anime({
    targets: earEl,
    rotate: 88,
    duration: 500,
    complete: () => step02.play(),
  })

  const step02 = anime({
    targets: earEl,
    keyframes: [
      { rotate: 88 },
      { rotate: 85 },
    ],
    duration: 100,
    loop: true,
    autoplay: false,
    /** 第一次循環時，強制調整 from，就不會有跳動問題了  */
    loopComplete() {
      const tween = step02.animations[0].tweens[0] as any;
      tween.from.numbers = [85]
    },
  })


  return {
    stop() {
      anime.remove(earEl);
    },
  };
}
function startShakeAnimate({ earEl }: GetAnimateParam): AnimateInstance {
  const step = anime({
    targets: earEl,
    keyframes: [
      { rotate: 85 },
      { rotate: 95 },
      { rotate: 85 },
    ],
    duration: 1000,
    loop: true,
    /** 第一次循環時，強制調整 from，就不會有跳動問題了  */
    loopComplete() {
      const tween = step.animations[0].tweens[0] as any;
      tween.from.numbers = [85]
    },
  })

  return {
    stop() {
      anime.remove(earEl);
    },
  };
}

const initAnimate: InitAnimate = (param) => {
  const result: AnimateMap = {
    relaxed: () => startRelaxedAnimate(param),
    displeased: () => startDispleasedAnimate(param),
    shake: () => startShakeAnimate(param),
  }

  return result;
}
</script>

<style scoped lang="sass">
.right-ear
  scale: -1 1
</style>
