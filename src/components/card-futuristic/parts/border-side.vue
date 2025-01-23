<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="border-side"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line v-bind="lineAttrMap.l" />
    <line v-bind="lineAttrMap.r" />
  </svg>
</template>

<script setup lang="ts">
import type { PartAnimeFcnMap } from '../type'
import anime from 'animejs'
import { map, pipe } from 'remeda'
import { computed, ref, watch } from 'vue'
import { useCardPart } from '../use-card-part'

// #region Props
export interface Props {
  color?: string;
  selectedColor?: string;
  strokeWidth?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  color: '#777',
  selectedColor: '#ff8d0a',
  strokeWidth: 3,
})

const svgRef = ref<SVGAElement>()

const paddingX = ref(0)
const lineAttrMap = ref({
  l: {
    'x1': 0,
    'y1': 0,
    'x2': 0,
    'y2': 0,
    'stroke': props.color,
    'stroke-width': props.strokeWidth,
  },
  r: {
    'x1': 0,
    'y1': 0,
    'x2': 0,
    'y2': 0,
    'stroke': props.color,
    'stroke-width': props.strokeWidth,
  },
})

function removeAnime() {
  anime.remove([
    ...Object.values(lineAttrMap.value),
    paddingX,
  ])
}

const animeMap: PartAnimeFcnMap = {
  async normal(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const svgSize = {
      width: svgRef.value?.clientWidth ?? 0,
      height: svgRef.value?.clientHeight ?? 0,
    }

    // 要先扣掉，因為現在的 svgSize.width 是包含 padding 的
    const width = svgSize.width - paddingX.value * 2
    const tasks = [
      ...pipe(
        [
          {
            'targets': lineAttrMap.value.l,
            'x1': 0,
            'y1': 0,
            'x2': 0,
            'y2': svgSize.height,
            'stroke': props.color,
            'stroke-width': props.strokeWidth,
          },
          {
            'targets': lineAttrMap.value.r,
            'x1': width,
            'y1': 0,
            'x2': width,
            'y2': svgSize.height,
            'stroke': props.color,
            'stroke-width': props.strokeWidth,
          },
        ],
        map((data) => anime({
          ...data,
          duration,
          delay,
          easing: 'easeOutExpo',
        }).finished),
      ),
      anime({
        targets: paddingX,
        value: 0,
        duration,
        delay,
        easing: 'easeOutExpo',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const svgSize = {
      width: svgRef.value?.clientWidth ?? 0,
      height: svgRef.value?.clientHeight ?? 0,
    }

    await Promise.all(pipe(
      [
        {
          targets: lineAttrMap.value.l,
          y1: 0,
          y2: svgSize.height,
        },
        {
          targets: lineAttrMap.value.r,
          y1: 0,
          y2: svgSize.height,
        },
      ],
      map((data) => anime({
        ...data,
        duration: duration / 2,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished),
    ))

    await Promise.all(pipe(
      [
        {
          'targets': lineAttrMap.value.l,
          'x1': 0,
          'x2': 0,
          'stroke-width': props.strokeWidth,
        },
        {
          'targets': lineAttrMap.value.r,
          'x1': svgSize.width,
          'x2': svgSize.width,
          'stroke-width': props.strokeWidth,
        },
      ],
      map((data) => anime({
        ...data,
        duration: duration / 2,
        delay: 0,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished),
    ))
  },
  async hidden(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const svgSize = {
      width: svgRef.value?.clientWidth ?? 0,
      height: svgRef.value?.clientHeight ?? 0,
    }

    await Promise.all(pipe(
      [
        {
          'targets': lineAttrMap.value.l,
          'x1': svgSize.width / 2,
          'x2': svgSize.width / 2,
          'stroke-width': 1,
        },
        {
          'targets': lineAttrMap.value.r,
          'x1': svgSize.width / 2,
          'x2': svgSize.width / 2,
          'stroke-width': 1,
        },
      ],
      map((data) => anime({
        ...data,
        duration: duration / 2,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished),
    ))

    await Promise.all([
      ...pipe(
        [
          {
            targets: lineAttrMap.value.l,
            y1: svgSize.height / 2,
            y2: svgSize.height / 2,
          },
          {
            targets: lineAttrMap.value.r,
            y1: svgSize.height / 2,
            y2: svgSize.height / 2,
          },
        ],
        map((data) => anime({
          ...data,
          duration: duration / 2,
          delay: 0,
          easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        }).finished),
      ),
      anime({
        targets: paddingX,
        value: 0,
        duration,
        delay,
        easing: 'easeOutExpo',
      }).finished,
    ])
  },
  async selected(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const svgSize = {
      width: svgRef.value?.clientWidth ?? 0,
      height: svgRef.value?.clientHeight ?? 0,
    }

    const width = svgSize.width - paddingX.value * 2

    const tasks = [
      anime({
        'targets': lineAttrMap.value.l,
        'stroke': props.selectedColor,
        'stroke-width': props.strokeWidth * 2,
        duration,
        delay,
        'easing': 'easeOutExpo',
      }).finished,
      anime({
        'targets': lineAttrMap.value.r,
        'stroke': props.selectedColor,
        'stroke-width': props.strokeWidth * 2,
        'x1': width,
        'x2': width,
        duration,
        delay,
        'easing': 'easeOutExpo',
      }).finished,
      anime({
        targets: paddingX,
        value: 0,
        duration,
        delay,
        easing: 'easeOutExpo',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hover(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    const svgSize = {
      width: svgRef.value?.clientWidth ?? 0,
      height: svgRef.value?.clientHeight ?? 0,
    }

    const padding = props.strokeWidth * 2
    const tasks = [
      anime({
        'targets': lineAttrMap.value.l,
        'stroke-width': props.strokeWidth * 2,
        duration,
        delay,
        'easing': 'easeOutExpo',
      }).finished,
      anime({
        'targets': lineAttrMap.value.r,
        'stroke-width': props.strokeWidth * 2,
        'x1': svgSize.width + padding * 2,
        'x2': svgSize.width + padding * 2,
        duration,
        delay,
        'easing': 'easeOutExpo',
      }).finished,
      anime({
        targets: paddingX,
        value: padding,
        duration,
        delay,
        easing: 'easeOutExpo',
      }).finished,
    ]

    await Promise.all(tasks)
  },
}

const { cardSize, visible } = useCardPart('border', animeMap)

const style = computed(() => ({
  left: `${-paddingX.value}px`,
  width: `${cardSize.width + paddingX.value * 2}px`,
  height: `${cardSize.height}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.width} ${cardSize.height}`,
)

/** 重新初始化，消除 cardSize 變化帶來的偏移 */
watch(cardSize, () => {
  if (visible.value) {
    animeMap.visible({ delay: 0, duration: 0 })
  }
  else {
    animeMap.hidden({ delay: 0, duration: 0 })
  }
}, { deep: true })
</script>

<style scoped lang="sass">
</style>
