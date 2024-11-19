<template>
  <filter
    x="-50%"
    y="-50%"
    width="200%"
    height="200%"
  >
    <feMorphology
      operator="erode"
      :radius="attrs.radius"
    />
  </filter>
</template>

<script setup lang="ts">
import type { AnimeParams, FilterExpose } from '../type'
import anime from 'animejs'
import { reactive } from 'vue'

interface Props { }
const props = withDefaults(defineProps<Props>(), {})

const attrs = reactive({
  baseFrequency: 0,
  scale: 0,
  radius: 0,
})

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
        radius: 0,
        duration,
        easing: 'easeInOutCirc',
      }).finished,
    ])
  },
  async leave(params?: AnimeParams) {
    // console.log('🚀 ~ [leave] params:', params)
    removeAnime()

    const {
      duration = 2000,
    } = params ?? {}

    await Promise.all([
      anime({
        targets: attrs,
        radius: 100,
        duration,
        easing: 'easeInOutCirc',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
