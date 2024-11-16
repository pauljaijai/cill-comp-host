<template>
  <filter
    x="-50%"
    y="-50%"
    width="200%"
    height="200%"
  >
    <!-- red -->
    <feOffset
      in="SourceGraphic"
      dx="10"
      dy="10"
      result="redOffset"
    />
    <feColorMatrix
      in="redOffset"
      type="matrix"
      values="1 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0"
      result="redChannel"
    />

    <!-- blue -->
    <feOffset
      in="SourceGraphic"
      dx="-10"
      dy="-10"
      result="blueOffset"
    />
    <feColorMatrix
      in="blueOffset"
      type="matrix"
      values="0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0"
      result="blueChannel"
    />

    <!-- green -->
    <feOffset
      in="SourceGraphic"
      dx="10"
      dy="-10"
      result="greenOffset"
    />
    <feColorMatrix
      in="greenOffset"
      type="matrix"
      values="0 0 0 0 0
              0 1 0 0 0
              0 0 0 0 0
              0 0 0 1 0"
      result="greenChannel"
    />

    <!-- Source -->
    <feOffset
      in="SourceGraphic"
      dx="0"
      dy="0"
      result="sourceOffset"
    />

    <feMerge>
      <feMergeNode in="redChannel" />
      <feMergeNode in="blueChannel" />
      <feMergeNode in="greenChannel" />
      <feMergeNode in="sourceOffset" />
    </feMerge>
  </filter>
</template>

<script setup lang="ts">
import type { AnimeParams, FilterExpose } from '../type'
import anime from 'animejs'
import { ref } from 'vue'

interface Props { }
const props = withDefaults(defineProps<Props>(), {})

const attrs = ref({
  baseFrequency: 0,
  scale: 0,
  slope: 1,
})

defineExpose<FilterExpose>({
  async enter(params?: AnimeParams) {
    anime.remove(attrs.value)

    const {
      duration = 2000,
    } = params ?? {}

    await Promise.all([
      anime({
        targets: attrs.value,
        baseFrequency: 0,
        scale: 0,
        slope: 1,
        duration,
        easing: 'easeInOutQuint',
      }).finished,
    ])
  },
  async leave(params?: AnimeParams) {
    anime.remove(attrs.value)

    const {
      duration = 2000,
    } = params ?? {}

    await Promise.all([
      anime({
        targets: attrs.value,
        baseFrequency: 0.008,
        scale: -50,
        slope: 0,
        duration,
        easing: 'easeInOutQuint',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
