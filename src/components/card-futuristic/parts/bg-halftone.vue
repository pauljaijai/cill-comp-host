<template>
  <div
    ref="bgRef"
    :style
    class="card-bg"
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
  size?: string;
  dotSize?: string;
  color?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  size: '4px',
  dotSize: '2px',
  color: '#FAFAFA',
})

const card = inject(PROVIDE_KEY)

const bgRef = ref<HTMLDivElement>()

const style = computed<CSSProperties>(() => ({
  inset: `0px`,
  backgroundImage: `radial-gradient(${prop.color} ${prop.dotSize}, transparent ${prop.dotSize})`,
  backgroundSize: `${prop.size} ${prop.size}`,
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
    anime.remove([bgRef.value])

    const {
      duration = 200,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: bgRef.value,
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
