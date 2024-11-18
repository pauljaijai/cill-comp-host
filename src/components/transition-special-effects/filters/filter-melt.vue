<template>
  <filter
    x="-50%"
    y="-50%"
    width="200%"
    height="200%"
  >
    <feGaussianBlur
      in="SourceGraphic"
      :stdDeviation="feAttrs.stdDeviation"
      result="source"
    />
    <feColorMatrix
      in="source"
      type="matrix"
      :values="feAttrs.values"
      result="matrix"
    />

    <feMerge>
      <feMergeNode in="matrix" />
    </feMerge>
  </filter>
</template>

<script setup lang="ts">
import type { AnimeParams, FilterExpose } from '../type'
import anime from 'animejs'
import { computed, reactive } from 'vue'

interface Props { }
const props = withDefaults(defineProps<Props>(), {})

const attrs = reactive({
  expansion: 1,
  reduce: 0,
})

/** 參考：https://www.youtube.com/watch?v=JK7tXtFhfTU */
const feAttrs = computed(() => ({
  stdDeviation: attrs.reduce,
  values: [
    '1 0 0 0 0',
    '0 1 0 0 0',
    '0 0 1 0 0',
    `0 0 0 ${attrs.expansion} ${-attrs.reduce}`,
  ].join(' '),
}))

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
      duration = 2000,
    } = params ?? {}

    await Promise.all([
      anime({
        targets: attrs,
        expansion: {
          value: 1,
          delay: duration / 2,
          duration: duration / 2,
        },
        reduce: 0,
        duration,
        easing: 'easeOutQuint',
      }).finished,
    ])
  },
  async leave(params?: AnimeParams) {
    // console.log('🚀 ~ [leave] params:', params)
    removeAnime()

    const {
      duration = 3000,
    } = params ?? {}

    await Promise.all([
      anime({
        targets: attrs,
        expansion: 50,
        reduce: {
          value: 50,
          delay: duration / 2,
          duration: duration / 2,
        },
        duration,
        easing: 'easeInOutCubic',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
