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
    <!-- 產生雜訊 -->
    <feTurbulence
      type="turbulence"
      :baseFrequency="attrs.baseFrequency"
      numOctaves="2"
      seed="1"
      stitchTiles="noStitch"
      result="turbulence"
    />
    <!-- 依照雜訊內容偏移 -->
    <feDisplacementMap
      in="SourceGraphic"
      in2="turbulence"
      :scale="attrs.scale"
      xChannelSelector="G"
      yChannelSelector="A"
      result="displacementMap"
    />
    <!-- 透明度 -->
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
