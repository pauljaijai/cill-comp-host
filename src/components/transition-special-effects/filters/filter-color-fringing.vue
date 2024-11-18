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
      v-bind="feAttrs.r"
      result="redOffset"
    />
    <feColorMatrix
      in="redOffset"
      type="matrix"
      v-bind="feAttrs.r"
      result="redChannel"
    />

    <!-- blue -->
    <feOffset
      in="SourceGraphic"
      v-bind="feAttrs.b"
      result="blueOffset"
    />
    <feColorMatrix
      in="blueOffset"
      type="matrix"
      v-bind="feAttrs.b"
      result="blueChannel"
    />

    <!-- green -->
    <feOffset
      in="SourceGraphic"
      v-bind="feAttrs.g"
      result="greenOffset"
    />
    <feColorMatrix
      in="greenOffset"
      type="matrix"
      v-bind="feAttrs.g"
      result="greenChannel"
    />

    <!-- Source -->
    <feComponentTransfer
      in="SourceGraphic"
      result="sourceChannel"
    >
      <feFuncA
        type="linear"
        v-bind="feAttrs.source"
      />
    </feComponentTransfer>

    <feBlend
      in="redChannel"
      in2="blueChannel"
      mode="screen"
      result="blendRedBlue"
    />
    <feBlend
      in="blendRedBlue"
      in2="greenChannel"
      mode="screen"
      result="rgbChannel"
    />

    <feMerge>
      <feMergeNode in="rgbChannel" />
      <feMergeNode in="sourceChannel" />
    </feMerge>
  </filter>
</template>

<script setup lang="ts">
import type { AnimeParams, FilterExpose } from '../type'
import anime from 'animejs'
import { map, pipe, times } from 'remeda'
import { computed, reactive } from 'vue'

interface Props {
  maxOffset?: number;
  times?: number;
}
const props = withDefaults(defineProps<Props>(), {
  maxOffset: 60,
  times: 8,
})

const attrs = reactive({
  r: { dx: 0, dy: 0, opacity: 0 },
  g: { dx: 0, dy: 0, opacity: 0 },
  b: { dx: 0, dy: 0, opacity: 0 },
  source: { opacity: 1 },
})

const feAttrs = computed(() => ({
  r: {
    dx: attrs.r.dx,
    dy: attrs.r.dy,
    values: [
      '1 0 0 0 0',
      '0 0 0 0 0',
      '0 0 0 0 0',
      `0 0 0 ${attrs.r.opacity} 0`,
    ].join(' '),
  },
  g: {
    dx: attrs.g.dx,
    dy: attrs.g.dy,
    values: [
      '0 0 0 0 0',
      '0 1 0 0 0',
      '0 0 0 0 0',
      `0 0 0 ${attrs.g.opacity} 0`,
    ].join(' '),
  },
  b: {
    dx: attrs.b.dx,
    dy: attrs.b.dy,
    values: [
      '0 0 0 0 0',
      '0 0 0 0 0',
      '0 0 1 0 0',
      `0 0 0 ${attrs.b.opacity} 0`,
    ].join(' '),
  },
  source: {
    slope: attrs.source.opacity,
  },
}))

function removeAnime() {
  anime.remove([
    attrs.r,
    attrs.g,
    attrs.b,
    attrs.source,
  ])
}

/** 取得遞增或遞減的隨機數值 */
function getRandomList(
  length: number,
  maxValue: number,
  inc = true,
) {
  return times(length, (i) => {
    const value = Math.max(inc ? i : length - i, 1)
    const offset = maxValue / length * value
    return Math.random() * offset * 2 - offset
  })
}

defineExpose<FilterExpose>({
  async enter(params?: AnimeParams) {
    // console.log('🚀 ~ [enter] params:', params)
    removeAnime()

    const {
      maxOffset,
      times: _times,
    } = props

    const {
      duration = 500,
    } = params ?? {}

    await Promise.all([
      ...pipe(
        ['r', 'g', 'b'] as const,
        map((key) => anime({
          targets: attrs[key],
          dx: getRandomList(_times, maxOffset, false),
          dy: getRandomList(_times, maxOffset, false),
          opacity: [
            // 0.1~1
            ...times(
              _times - 1,
              (i) => 1 / (_times - 1) * i + 0.1,
            ),
            0,
          ],
          duration,
          easing: 'steps(1)',
        }).finished),
      ),
      anime({
        targets: attrs.source,
        opacity: [
          ...times(_times - 1, () => 0),
          1,
        ],
        duration,
        easing: 'steps(1)',
      }).finished,
    ])
  },
  async leave(params?: AnimeParams) {
    // console.log('🚀 ~ [leave] params:', params)
    removeAnime()

    const {
      maxOffset,
      times: _times,
    } = props

    const {
      duration = 500,
    } = params ?? {}

    await Promise.all([
      ...pipe(
        ['r', 'g', 'b'] as const,
        map((key) => anime({
          targets: attrs[key],
          dx: getRandomList(_times, maxOffset),
          dy: getRandomList(_times, maxOffset),
          opacity: [
            // 1~0.1
            ...times(
              _times - 1,
              (i) => 1 - (1 / (_times - 1) * i + 0.1),
            ),
            0,
          ],
          duration,
          easing: 'steps(1)',
        }).finished),
      ),
      anime({
        targets: attrs.source,
        opacity: [0],
        duration,
        easing: 'steps(1)',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
