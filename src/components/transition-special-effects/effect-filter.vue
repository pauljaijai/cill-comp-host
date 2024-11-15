<template>
  <svg class="hidden">
    <!-- wave 效果 -->
    <filter
      v-if="attrs?.type === 'wave'"
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
        baseFrequency="0.05"
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

// #region Props
interface Props {
  filterId: string;
  type?: `${TransitionType}`;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  type: 'wave',
})

enum TransitionType {
  WAVE = 'wave',
}

/** 播放進度。0~100 對應 enter~leave */
const progress = ref(0)
const progressRange = [0, 100] as const

/** 數值映射。[enter, leave] */
const valueMap = {
  [TransitionType.WAVE]: {
    scale: [0, 200],
  },
} as const

function createProjection(range: readonly [number, number]) {
  return useProjection(progress, progressRange, range)
}
/** 不透明度 */
const slope = createProjection([1, 0])

const attrs = reactiveComputed(() => {
  if (props.type === TransitionType.WAVE) {
    const scale = createProjection(valueMap[TransitionType.WAVE].scale)

    return {
      type: TransitionType.WAVE,
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
