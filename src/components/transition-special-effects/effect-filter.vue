<template>
  <svg class="hidden">
    <!-- wave 效果 -->
    <filter
      v-if="attrs?.name === 'wave'"
      :id="props.filterId"
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
          :slope
        />
      </feComponentTransfer>
    </filter>
  </svg>
</template>

<script setup lang="ts">
import type { AnimeAnimParams } from 'animejs'
import { reactiveComputed } from '@vueuse/core'
import { useProjection } from '@vueuse/math'
import anime from 'animejs'
import { ref } from 'vue'
import { TransitionName } from './type'

// #region Props
interface Props {
  filterId: string;
  name?: `${TransitionName}`;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  name: 'wave',
})

/** 播放進度。0~100 對應 enter~leave */
const progress = ref(0)
const progressRange = [0, 100] as const

/** 數值映射。[enter, leave] */
const valueMap = {
  [TransitionName.WAVE]: {
    baseFrequency: [0, 0.008],
    scale: [0, -50],
  },
} as const

function createProjection(range: readonly [number, number]) {
  return useProjection(progress, progressRange, range)
}
/** 不透明度 */
const slope = createProjection([1, 0])

const attrs = reactiveComputed(() => {
  if (props.name === TransitionName.WAVE) {
    const baseFrequency = createProjection(
      valueMap[TransitionName.WAVE].baseFrequency,
    )
    const scale = createProjection(
      valueMap[TransitionName.WAVE].scale,
    )

    return {
      name: TransitionName.WAVE,
      baseFrequency,
      scale,
    }
  }

  return {}
})

interface AnimeParams {
  duration?: number;
  easing?: AnimeAnimParams['easing'];
}

function enter(params?: AnimeParams) {
  anime.remove(progress)

  const {
    duration = 2000,
    easing = 'easeInOutExpo',
  } = params ?? {}

  return anime({
    targets: progress,
    value: progressRange[0],
    duration,
    easing,
  }).finished
}

function leave(params?: AnimeParams) {
  anime.remove(progress)

  const {
    duration = 2000,
    easing = 'easeInOutExpo',
  } = params ?? {}

  return anime({
    targets: progress,
    value: progressRange[1],
    duration,
    easing,
  }).finished
}

// #region Methods
defineExpose({
  enter,
  leave,
})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
