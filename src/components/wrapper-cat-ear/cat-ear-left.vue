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

interface Props extends Pick<
  EarProps, 'action' | 'mainColor' | 'innerColor'
> { }
const props = defineProps<Props>();

const frameRef = ref<HTMLDivElement>();
const { isOutside } = useMouseInElement(frameRef);

const earProps = computed(() => {
  return {
    ...props,
    action: isOutside.value ? props.action : 'shake',
  }
});

type InitAnimate = InstanceType<typeof CatEar>['$props']['initAnimate'];
type GetAnimateParam = Parameters<InitAnimate>[0]

/** 修正不同 loop 動畫切換時，會導致起點閃爍問題 */
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
  { insideEl, outsideEl }: GetAnimateParam,
  option?: ResetAnimateOption
): AnimateInstance {
  const {
    duration, onComplete,
  } = option ?? {}

  anime({
    targets: outsideEl,
    d: 'M182.5 0C350 112.5 350 363.497 350 363.497C350 363.497 91.5 390 0 363.497C-4.92036e-05 253 50 108 182.5 0Z',
    duration,
    complete: onComplete,
  })
  anime({
    targets: insideEl,
    d: 'M184.5 28.5C330.5 155.5 330.5 335 330.5 363.497C313 368.5 182.5 390.5 127.5 363.497C127.5 287.5 122.5 183.5 184.5 28.5Z',
    duration,
    complete: onComplete,
  })

  return {
    stop() {
      anime.remove([insideEl, outsideEl]);
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
function startFearAnimate(param: GetAnimateParam): AnimateInstance {
  const { earEl, insideEl, outsideEl } = param;
  const finalValue = 92;

  anime({
    targets: outsideEl,
    d: 'M222.768 0C350 187 350 377.497 350 377.497C350 377.497 91.5 404 0 377.497C-4.92036e-05 267 54.2683 68 222.768 0Z',
    duration: 500,
  })
  anime({
    targets: insideEl,
    d: 'M228.268 39C316.768 154.5 340.5 349 340.5 377.497C323 382.5 305 383.5 284 377.497C284 301.5 277.768 144.5 228.268 39Z',
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
  /** 因為有轉換動畫所以提早修正 */
  fixAnimateLoop(step02, finalValue);

  return {
    stop() {
      anime.remove([earEl, insideEl, outsideEl]);
    },
  };
}
function startDispleasedAnimate(param: GetAnimateParam): AnimateInstance {
  const { earEl, insideEl, outsideEl } = param;
  const finalValue = 70;

  anime({
    targets: outsideEl,
    d: 'M43.0001 0C350 138.5 350 399.997 350 399.997C350 399.997 91.5003 426.5 0.000305281 399.997C0.000256077 289.5 15 144.5 43.0001 0Z',
    duration: 500,
  })
  anime({
    targets: insideEl,
    d: 'M58.9999 20.5C307 142 340.5 371.5 340.5 399.997C323 405 305 406 284 399.997C284 324 187 136 58.9999 20.5Z',
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
      { rotate: 80 },
      { rotate: finalValue },
    ],
    duration: 1000,
    loop: true,
    autoplay: false,
  })
  fixAnimateLoop(step02, finalValue);

  return {
    stop() {
      anime.remove([earEl, insideEl, outsideEl]);
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
      { rotate: -10, easing: 'easeOutBack', endDelay: 800 },
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
