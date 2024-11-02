<template>
  <div ref="contentRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { AnimeMap } from '../type'
import anime from 'animejs'
import { inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props { }
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

defineSlots<{
  default?: () => unknown;
}>()

const card = inject(PROVIDE_KEY)

const contentRef = ref<HTMLDivElement>()

const animeMap: AnimeMap = {
  async normal(param) {
    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: 1,
        scale: 1,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: {
          value: 1,
          delay: delay * 1.5,
          easing: 'linear',
        },
        scale: 1,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hidden(param) {
    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: {
          value: 0,
          duration: duration / 2,
          delay: delay / 2,
          easing: 'linear',
        },
        scale: 0,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async selected(param) {
    return this.visible(param)
  },
  async hover(param) {
    return this.visible(param)
  },
}

onMounted(() => {
  if (!card) {
    console.warn('此元件必須包在 CardFuturistic 元件中')
    return
  }

  card.bindPart({
    name: 'content',
    animeMap,
  })
})
</script>

<style scoped lang="sass">
</style>
