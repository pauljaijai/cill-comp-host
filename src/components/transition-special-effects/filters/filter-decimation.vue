<template>
  <filter
    x="-50%"
    y="-50%"
    width="200%"
    height="200%"
  >
    <feTurbulence
      :baseFrequency="feAttrs.baseFrequency"
      result="noise"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="10"
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
import { computed, reactive } from 'vue'

interface Props { }
const props = withDefaults(defineProps<Props>(), {})

const attrs = reactive({
  baseFrequency: 0,
  scale: 100,
  slope: 1,
})

const feAttrs = computed(() => ({
  ...attrs,
  baseFrequency: `${attrs.baseFrequency} ${attrs.baseFrequency}`,
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
        baseFrequency: 0,
        slope: 1,
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
        baseFrequency: 0.05,
        slope: 0,
        duration,
        easing: 'easeInOutCirc',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
