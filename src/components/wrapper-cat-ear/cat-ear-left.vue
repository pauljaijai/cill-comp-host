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
import { animate } from 'motion';
import { computed, ref } from 'vue';
import { constant, times } from 'remeda';

import CatEar, {
  AnimateInstance,
  AnimateMap,
  Props as EarProps,
} from './base-cat-ear.vue';

import { useMouseInElement } from '@vueuse/core';

interface Props extends Pick<
  EarProps, 'emotion' | 'mainColor' | 'innerColor'
> { }
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

function fixAnimateLoop(instance: anime.AnimeInstance, value: number) {
  try {
    const tween = instance.animations[0].tweens[0] as any;
    tween.from.numbers = [value]
  } catch (error) {
    console.error('[ fixAnimateLoop ] : ', error);
  }
}

interface ResetAnimateOption {
  duration?: number;
  onComplete?: () => void;
}
/** 回復初始外觀，消除 SVG 變形動畫 */
function resetEarAnimate(
  { insideEl }: GetAnimateParam,
  option?: ResetAnimateOption
): AnimateInstance {
  const {
    duration, onComplete,
  } = option ?? {}

  anime({
    targets: insideEl,
    d: 'M195 17.5C319 184 329.5 313 340.5 364.997C292.5 380.5 211 396.5 136.5 364.997C136.5 295.5 121 243.003 195 17.5Z',
    duration,
    complete: onComplete,
  })

  return {
    stop() {
      anime.remove(insideEl);
    },
  };
}

function startRelaxedAnimate(param: GetAnimateParam): AnimateInstance {
  const { earEl } = param;
  const finalValue = -10;

  const initStep = resetEarAnimate(param);

  const step02 = anime({
    targets: earEl,
    keyframes: [
      { rotate: 10 },
      { rotate: finalValue },
    ],
    duration: 2000,
    loop: true,
    /** 第一次循環時，強制調整 from，就不會有跳動問題了  */
    loopComplete() {
      fixAnimateLoop(step02, finalValue);
    },
  })

  return {
    stop() {
      anime.remove(earEl);
      initStep.stop();
    },
  };
}
function startFearAnimate({ earEl, insideEl }: GetAnimateParam): AnimateInstance {
  const finalValue = 92;

  anime({
    targets: insideEl,
    d: 'M195 17.5C319 184 340.5 336.5 340.5 364.997C323 370 305 371 284 364.997C284 315 289.5 269 195 17.5Z',
    duration: 500,
  })
  anime({
    targets: earEl,
    rotate: finalValue,
    duration: 500,
    complete: () => step02.play(),
  })

  const step02 = anime({
    targets: earEl,
    keyframes: [
      { rotate: 90 },
      { rotate: finalValue },
    ],
    duration: 100,
    loop: true,
    autoplay: false,
  })
  /** 因為有 step01 所以提早修正 */
  fixAnimateLoop(step02, finalValue);

  return {
    stop() {
      anime.remove(earEl);
    },
  };
}
function startDispleasedAnimate({ earEl, insideEl }: GetAnimateParam): AnimateInstance {
  const finalValue = 85;

  anime({
    targets: insideEl,
    d: 'M195 17.5C319 184 340.5 336.5 340.5 364.997C323 370 305 371 284 364.997C284 315 289.5 269 195 17.5Z',
    duration: 500,
  })
  anime({
    targets: earEl,
    rotate: finalValue,
    duration: 500,
    complete: () => step02.play(),
  })

  const step02 = anime({
    targets: earEl,
    keyframes: [
      { rotate: 90 },
      { rotate: finalValue },
    ],
    duration: 1000,
    loop: true,
    autoplay: false,
  })
  fixAnimateLoop(step02, finalValue);

  return {
    stop() {
      anime.remove(earEl);
    },
  };
}
function startShakeAnimate(param: GetAnimateParam): AnimateInstance {
  const { earEl } = param;
  const finalValue = -10;

  const initStep = resetEarAnimate(param);

  const step = anime({
    targets: earEl,
    keyframes: [
      { rotate: -10, easing: 'easeOutBack' },
      { rotate: 110, easing: 'easeInBack' },
      { rotate: -10, easing: 'easeOutBack', endDelay: 100 },
      { rotate: 110, easing: 'easeInBack' },
      { rotate: -10, easing: 'easeOutBack', endDelay: 500 },
      { rotate: 110, easing: 'easeInBack' },
      { rotate: finalValue },
    ],
    duration: 800,
    loop: true,
    loopComplete() {
      fixAnimateLoop(step, finalValue);
    },
  })

  return {
    stop() {
      anime.remove(earEl);
      initStep.stop();
    },
  };
}

const initAnimate: InitAnimate = (param) => {
  const result: AnimateMap = {
    relaxed: () => startRelaxedAnimate(param),
    fear: () => startFearAnimate(param),
    displeased: () => startDispleasedAnimate(param),
    shake: () => startShakeAnimate(param),
  }

  return result;
}

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
