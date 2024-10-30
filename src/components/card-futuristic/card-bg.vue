<template>
  <div
    ref="bodyRef"
    :style
    class="bg"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import anime from 'animejs'
import { computed, inject, ref, watch } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  /** @default 45deg */
  angle?: string;
  patternSize?: string;
  patternColor?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  angle: '-45deg',
  patternSize: '3px',
  patternColor: '#FAFAFA',
})

const card = inject(PROVIDE_KEY)

// const card = computedInject(PROVIDE_KEY, (source) => source)

const bodyRef = ref<HTMLDivElement>()

const style = computed<CSSProperties>(() => ({
  inset: `8px`,
  backgroundImage: [
    'repeating-linear-gradient(',
    `${prop.angle}, transparent,`,
    `transparent ${prop.patternSize},`,
    `${prop.patternColor} ${prop.patternSize},`,
    `${prop.patternColor} calc(${prop.patternSize} * 2))`,
  ].join(''),
}))

watch(() => card, (data) => {
  const { visible } = data ?? {}

  if (visible?.value) {
    anime({
      targets: bodyRef.value,
      opacity: [
        0,
        0.1,
        0.8,
        0.3,
        1,
      ],
      duration: 200,
      easing: 'linear',
    })
  }
  else {
    anime({
      targets: bodyRef.value,
      opacity: [
        1,
        0.6,
        0.1,
        0.8,
        0.3,
        0,
      ],
      duration: 200,
      easing: 'linear',
    })
  }
}, {
  deep: true,
})
</script>

<style scoped lang="sass">
</style>
