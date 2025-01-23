<template>
  <div ref="contentRef" class="content-clip">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PartAnimeFcnMap } from '../type'
import anime from 'animejs'
import { ref } from 'vue'
import { useCardPart } from '../use-card-part'

// #region Props
export interface Props { }
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

defineSlots<{
  default?: () => unknown;
}>()

const contentRef = ref<HTMLDivElement>()

const animeMap: PartAnimeFcnMap = {
  async normal(param) {
    return this.visible(param)
  },
  async visible(param) {
    anime.remove([contentRef.value])

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    await anime({
      'targets': contentRef.value,
      'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration,
      delay,
      'easing': 'cubicBezier(1, 0.1, 0, 0.9)',
    }).finished
  },
  async hidden(param) {
    anime.remove([contentRef.value])

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    await anime({
      'targets': contentRef.value,
      'clip-path': 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
      duration,
      delay,
      'easing': 'cubicBezier(1, 0.1, 0, 0.9)',
    }).finished
  },
  async selected(param) {
    return this.visible(param)
  },
  async hover(param) {
    return this.visible(param)
  },
}

useCardPart('content', animeMap)
</script>

<style scoped lang="sass">
</style>
