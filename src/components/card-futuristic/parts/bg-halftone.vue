<template>
  <div
    ref="bodyRef"
    :style
    class="bg"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AnimeMap } from '../type'
import anime from 'animejs'
import { computed, inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props {
  /** @default 45deg */
  angle?: string;
  size?: string;
  dotSize?: string;
  color?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  angle: '-45deg',
  size: '4px',
  dotSize: '2px',
  color: '#F7F7F7',
})

const card = inject(PROVIDE_KEY)

// const card = computedInject(PROVIDE_KEY, (source) => source)

const bodyRef = ref<HTMLDivElement>()

const style = computed<CSSProperties>(() => ({
  inset: `0px`,
  backgroundImage: `radial-gradient(${prop.color} ${prop.dotSize}, transparent ${prop.dotSize})`,
  backgroundSize: `${prop.size} ${prop.size}`,
}))

const animeMap: AnimeMap = {
  async normal(param) {
    const {
      duration = 200,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: bodyRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    const {
      duration = 200,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: bodyRef.value,
        opacity: [
          0,
          0.1,
          0.8,
          0.3,
          1,
        ],
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hidden(param) {
    const {
      duration = 200,
      delay = 0,
    } = param ?? {}

    const tasks = [
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
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async selected(param) {
    return this.normal(param)
  },
  async hover(param) {
    return this.normal(param)
  },
}

onMounted(() => {
  if (!card) {
    console.warn('此元件必須包在 CardFuturistic 元件中')
    return
  }

  card.bindPart({
    name: 'bg',
    animeMap,
  })
})
</script>

<style scoped lang="sass">
</style>
