<template>
  <div ref="contentRef" class="content-typical">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PartAnimeFcnMap } from '../type'
import anime from 'animejs'
import { inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
interface Props { }
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

defineSlots<{
  default?: () => unknown;
}>()

const card = inject(PROVIDE_KEY)

const contentRef = ref<HTMLDivElement>()

const animeMap: PartAnimeFcnMap = {
  async normal(param) {
    anime.remove([contentRef.value])

    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    anime.remove([contentRef.value])

    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: [
          0,
          0.1,
          0.8,
          0.3,
          1,
        ],
        duration,
        delay,
        easing: 'steps(1)',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hidden(param) {
    anime.remove([contentRef.value])

    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: [
          1,
          0.6,
          0.1,
          0.3,
          0,
        ],
        duration,
        delay,
        easing: 'steps(1)',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async selected(param) {
    return this.visible(param)
  },
  async hover(param) {
    anime.remove([contentRef.value])

    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: 0.6,
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
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
