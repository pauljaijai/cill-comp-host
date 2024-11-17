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
    <feOffset
      in="SourceGraphic"
      v-bind="feAttrs.source"
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
import { constant, map, pipe, randomInteger, times } from 'remeda'
import { computed, reactive } from 'vue'

interface Props {
  maxOffset?: number;
  times?: number;
}
const props = withDefaults(defineProps<Props>(), {
  maxOffset: 50,
  times: 5,
})

const attrs = reactive({
  r: { dx: 0, dy: 0, opacity: 0.5 },
  g: { dx: 0, dy: 0, opacity: 0.5 },
  b: { dx: 0, dy: 0, opacity: 0.5 },
  source: { dx: 0, dy: 0, opacity: 0.5 },
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
  source: attrs.source,
}))

function removeAnime() {
  anime.remove([
    attrs.r,
  ])
}

defineExpose<FilterExpose>({
  async enter(params?: AnimeParams) {
    removeAnime()

    const {
      maxOffset,
      times: _times,
    } = props

    const {
      duration = 300,
    } = params ?? {}

    await Promise.all([
      ...pipe(
        ['r', 'g', 'b'] as const,
        map((key) => anime({
          targets: attrs[key],
          dx: times(_times, () => randomInteger(-maxOffset, maxOffset)),
          dy: times(_times, () => randomInteger(-maxOffset, maxOffset)),
          opacity: [
            ...times(_times - 1, constant(0.1)),
            0,
          ],
          duration,
          easing: 'steps(1)',
        }).finished),
      ),
      anime({
        targets: attrs.source,
        dx: [
          ...times(_times, () => randomInteger(-maxOffset, maxOffset)),
          0,
        ],
        dy: [
          ...times(_times, () => randomInteger(-maxOffset, maxOffset)),
          0,
        ],
        duration,
        easing: 'steps(1)',
      }).finished,
    ])
  },
  async leave(params?: AnimeParams) {
    removeAnime()

    const {
      maxOffset,
      times: _times,
    } = props

    const {
      duration = 300,
    } = params ?? {}

    await Promise.all([
      ...pipe(
        ['r', 'g', 'b'] as const,
        map((key) => anime({
          targets: attrs[key],
          dx: times(_times, () => randomInteger(-maxOffset, maxOffset)),
          dy: times(_times, () => randomInteger(-maxOffset, maxOffset)),
          opacity: [
            ...times(_times - 1, constant(0.1)),
            0,
          ],
          duration,
          easing: 'steps(1)',
        }).finished),
      ),
      anime({
        targets: attrs.source,
        dx: [
          ...times(_times, () => randomInteger(-maxOffset, maxOffset)),
          0,
        ],
        dy: [
          ...times(_times, () => randomInteger(-maxOffset, maxOffset)),
          0,
        ],
        duration,
        easing: 'steps(1)',
      }).finished,
    ])
  },
})
</script>

<style scoped lang="sass">
</style>
