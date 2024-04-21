<template>
  <cat-ear :init-animate="initAnimate" />
</template>

<script setup lang="ts">
import { animate } from "motion"
import { constant, times } from 'remeda';

import CatEar, {
  AnimateMap,
  Props as EarProps,
  Emits as EarEmits,
} from './base-cat-ear.vue';

interface Props extends Pick<EarProps, 'emotion' | 'color'> { }
const props = defineProps<Props>();

const emit = defineEmits<EarEmits>();

type GetAnimateParam = Parameters<
  InstanceType<typeof CatEar>['$props']['initAnimate']
>[0]
function getRelaxedAnimate({ earEl }: GetAnimateParam) {
  return animate(
    earEl,
    {
      rotate: [
        '3deg',
        '-3deg',
        '3deg',
      ],
    },
    {
      delay: 0.5,
      easing: times(3, constant('ease-in-out')),
      duration: 2,
      repeat: Infinity,
      autoplay: false,
    }
  )
}

function getDispleasedAnimate({ earEl }: GetAnimateParam) {
  return animate(
    earEl,
    {
      rotate: [
        '3deg',
        '-3deg',
        '3deg',
      ],
    },
    {
      delay: 0.5,
      easing: times(3, constant('ease-in-out')),
      duration: 2,
      repeat: Infinity,
      autoplay: false,
    }
  )
}

const initAnimate: InstanceType<typeof CatEar>['$props']['initAnimate'] = (param) => {
  const result: AnimateMap = {
    relaxed: getRelaxedAnimate(param),
    displeased: getDispleasedAnimate(param),
  }

  return result;
}

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
