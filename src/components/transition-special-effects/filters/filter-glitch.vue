<template>
  <filter
    x="-50%"
    y="-50%"
    width="200%"
    height="200%"
  >
    <feTurbulence
      type="fractalNoise"
      :baseFrequency="feAttrs.baseFrequency"
      result="noise"
      numOctaves="1"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      :scale="feAttrs.scale"
      result="displacementMap"
    />
    <feComponentTransfer in="displacementMap">
      <feFuncA
        type="linear"
        :slope="feAttrs.slope"
      />
    </feComponentTransfer>
  </filter>
</template>

<script setup lang="ts">
import type { AnimeParams, FilterExpose } from '../type'
import anime from 'animejs'
import { times } from 'remeda'
import { computed, reactive } from 'vue'

interface Props { }
const props = withDefaults(defineProps<Props>(), {})

const attrs = reactive({
  baseFrequency: 0,
  scale: 0,
  slope: 1,
})

/** 參考：https://www.youtube.com/watch?v=JK7tXtFhfTU */
const feAttrs = computed(() => ({
  ...attrs,
  baseFrequency: `0 ${attrs.baseFrequency}`,
}))

/** 取得遞增或遞減的隨機數值 */
function getRandomList(
  length: number,
  maxValue: number,
  inc = true,
) {
  return times(length, (i) => {
    const value = Math.max(inc ? i : length - i, 1)
    const offset = maxValue / length * value
    return Math.random() * offset
  })
}

function removeAnime() {
  anime.remove([
    attrs,
  ])
}

defineExpose<FilterExpose>({
  async enter(params?: AnimeParams) {
    // console.log('🚀 ~ [enter] params:', params)
    removeAnime()

    const {
      duration = 200,
    } = params ?? {}

    const slope = [0.9, 0.2, 0.8, 0.8, 0.1, 1]

    await Promise.all([
      anime({
        targets: attrs,
        baseFrequency: {
          value: 0,
          easing: `steps(${slope.length})`,
        },
        scale: {
          value: 10,
          easing: `steps(${slope.length})`,
        },
        slope,
        duration,
        easing: 'steps(2)',
      }).finished,
    ])
  },
  async leave(params?: AnimeParams) {
    // console.log('🚀 ~ [leave] params:', params)
    removeAnime()

    const {
      duration = 200,
    } = params ?? {}

    const slope = [0.1, 0.9, 0.1, 0.1, 1, 0]

    await Promise.all([
      anime({
        targets: attrs,
        baseFrequency: {
          value: 1,
          easing: `steps(${slope.length})`,
        },
        scale: {
          value: 100,
          easing: `steps(${slope.length})`,
        },
        slope,
        duration,
        easing: 'steps(2)',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
