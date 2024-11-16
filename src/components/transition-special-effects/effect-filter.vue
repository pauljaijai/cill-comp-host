<template>
  <svg class="hidden">
    <defs v-if="attrs.name">
      <!-- wave -->
      <filter
        v-if="attrs.name === 'wave'"
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

      <!-- color-fringing -->
      <filter
        v-if="attrs.name === 'color-fringing'"
        :id="props.filterId"
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
          <feMergeNode in="sourceOffset" />
        </feMerge>
      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import type { AnimeAnimParams } from 'animejs'
import type { TransitionName } from './type'
import { reactiveComputed } from '@vueuse/core'
import { useProjection } from '@vueuse/math'
import anime from 'animejs'
import { ref } from 'vue'

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

function createProjection(range: readonly [number, number]) {
  return useProjection(progress, progressRange, range)
}
/** 不透明度 */
const slope = createProjection([1, 0])

const transitionAttrsMap = {
  'wave': {
    name: 'wave',
    baseFrequency: createProjection([0, 0.008]),
    scale: createProjection([0, -50]),
  },
  'color-fringing': {
    name: 'color-fringing',
  },
  'glitch': {
    name: 'glitch',
  },
} satisfies Record<
  TransitionName,
  {
    name: `${TransitionName}`;
    [key: string]: any;
  }
>

const attrs = reactiveComputed(() => transitionAttrsMap[props.name])

interface AnimeParams {
  duration?: number;
  easing?: AnimeAnimParams['easing'];
}

function enter(params?: AnimeParams) {
  anime.remove(progress)

  const {
    duration = 2000,
    easing = 'easeInOutQuint',
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
    easing = 'easeInOutQuint',
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
