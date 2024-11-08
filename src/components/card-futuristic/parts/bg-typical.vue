<template>
  <div
    ref="bgRef"
    :style
    class="bg-typical"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { PartAnimeFcnMap } from '../type'
import anime from 'animejs'
import { computed, inject, onMounted, ref } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props {
  /** @default 45deg */
  angle?: string;
  size?: string;
  color?: string;
  margin?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  angle: '-45deg',
  size: '4px',
  color: '#FAFAFA',
  margin: '8px',
})

const card = inject(PROVIDE_KEY)

const bgRef = ref<HTMLDivElement>()

const style = computed<CSSProperties>(() => ({
  inset: prop.margin,
  backgroundImage: [
    'repeating-linear-gradient(',
    `${prop.angle}, transparent,`,
    `transparent ${prop.size},`,
    `${prop.color} ${prop.size},`,
    `${prop.color} calc(${prop.size} * 2))`,
  ].join(''),
}))

const animeMap: PartAnimeFcnMap = {
  async normal(param) {
    anime.remove([bgRef.value])

    const {
      duration = 200,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: bgRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    anime.remove([bgRef.value])

    const {
      duration = 200,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: bgRef.value,
        opacity: [
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
    anime.remove([bgRef.value])

    const {
      duration = 200,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: bgRef.value,
        opacity: [
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
