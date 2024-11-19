<template>
  <filter
    color-interpolation-filters="linearRGB"
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    x="-50%"
    y="-50%"
    width="200%"
    height="200%"
  >
    <feTurbulence
      type="turbulence"
      :baseFrequency="attrs.baseFrequency"
      stitchTiles="noStitch"
      result="turbulence"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="turbulence"
      :scale="attrs.scale"
      result="displacementMap"
    />
    <feComponentTransfer
      in="displacementMap"
      result="alphaAdjust"
    >
      <feFuncA
        type="linear"
        :slope="attrs.slope"
      />
    </feComponentTransfer>
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
      duration = 1600,
    } = params ?? {}

    await Promise.all([
      anime({
        targets: attrs.value,
        baseFrequency: 0,
        scale: 0,
        slope: 1,
        duration,
        easing: 'easeInOutQuad',
      }).finished,
    ])
  },
  async leave(params?: AnimeParams) {
    anime.remove(attrs.value)

    const {
      duration = 1600,
    } = params ?? {}

    await Promise.all([
      anime({
        targets: attrs.value,
        baseFrequency: 0.03,
        scale: 10,
        slope: 0,
        duration,
        easing: 'easeInOutQuad',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
