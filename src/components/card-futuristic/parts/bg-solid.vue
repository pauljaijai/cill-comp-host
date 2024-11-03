<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-bg"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path v-bind="pathAttr" />
  </svg>
</template>

<script setup lang="ts">
import type { AnimeMap } from '../type'
import { reactiveComputed, useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { computed, inject, onMounted, reactive, ref, watch } from 'vue'
import { PROVIDE_KEY } from '../type'

// #region Props
export interface Props {
  color?: string;
  selectedColor?: string;
  chamfer?: {
    lt?: number;
    rt?: number;
    rb?: number;
    lb?: number;
  };
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  color: '#444',
  selectedColor: '#ff8d0a',
  chamfer: () => ({ lb: 10 }),
})

const card = inject(PROVIDE_KEY)
const cardSize = reactiveComputed(() => ({
  width: card?.contentSize.value.width ?? 0,
  height: card?.contentSize.value.height ?? 0,
}))

const svgRef = ref<SVGAElement>()
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

/** 倒角由 2 個點組成 */
const pointData = ref({
  lt: {
    p1: { x: 0, y: 0 },
    p2: { x: 0, y: 0 },
  },
  rt: {
    p1: { x: 0, y: 0 },
    p2: { x: 0, y: 0 },
  },
  rb: {
    p1: { x: 0, y: 0 },
    p2: { x: 0, y: 0 },
  },
  lb: {
    p1: { x: 0, y: 0 },
    p2: { x: 0, y: 0 },
  },
})
const color = ref(prop.color)

/** 取得所有座標 Normal 狀態數值 */
function getPointAttrMapNormal() {
  return {
    lt: {
      p1: {
        x: 0,
        y: prop.chamfer.lt ?? 0,
      },
      p2: {
        x: prop.chamfer.lt ?? 0,
        y: 0,
      },
    },
    rt: {
      p1: {
        x: svgSize.width - (prop.chamfer.rt ?? 0),
        y: 0,
      },
      p2: {
        x: svgSize.width,
        y: prop.chamfer.rt ?? 0,
      },
    },
    rb: {
      p1: {
        x: svgSize.width,
        y: svgSize.height - (prop.chamfer.rb ?? 0),
      },
      p2: {
        x: svgSize.width - (prop.chamfer.rb ?? 0),
        y: svgSize.height,
      },
    },
    lb: {
      p1: {
        x: prop.chamfer.lb ?? 0,
        y: svgSize.height,
      },
      p2: {
        x: 0,
        y: svgSize.height - (prop.chamfer.lb ?? 0),
      },
    },
  }
}

const pathAttr = computed(() => {
  const { lt, rt, rb, lb } = pointData.value

  return {
    d: [
      `M${lt.p1.x} ${lt.p1.y}`,
      `L${lt.p2.x} ${lt.p2.y}`,
      `L${rt.p1.x} ${rt.p1.y}`,
      `L${rt.p2.x} ${rt.p2.y}`,
      `L${rb.p1.x} ${rb.p1.y}`,
      `L${rb.p2.x} ${rb.p2.y}`,
      `L${lb.p1.x} ${lb.p1.y}`,
      `L${lb.p2.x} ${lb.p2.y}Z`,
    ].join(' '),
    fill: color.value,
  }
})

const style = computed(() => ({
  width: `${cardSize.width}px`,
  height: `${cardSize.height}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.width} ${cardSize.height}`,
)

function removeAnime() {
  anime.remove([
    pointData.value,
    svgRef.value,
  ])
}

const animeMap: AnimeMap = {
  async normal(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    await Promise.all([
      anime({
        targets: svgRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
      anime({
        targets: color,
        value: prop.color,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
    ])
  },
  async visible(param) {
    removeAnime()

    const {
      duration = 600,
      delay = 0,
    } = param ?? {}

    await anime({
      targets: svgRef.value,
      opacity: [
        0,
        0.1,
        0.8,
        0.3,
        1,
      ],
      duration: duration / 5,
      delay,
      easing: 'steps(1)',
    }).finished

    const target = getPointAttrMapNormal()

    const pointDuration = duration / 5 * 4
    await Promise.all([
      anime({
        targets: pointData.value.rb.p1,
        y: target.rb.p1.y,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,
      anime({
        targets: pointData.value.rb.p2,
        y: target.rb.p2.y,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,
      anime({
        targets: pointData.value.lb.p1,
        y: target.lb.p1.y,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,
      anime({
        targets: pointData.value.lb.p2,
        y: target.lb.p2.y,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,
    ])
  },
  async hidden(param) {
    removeAnime()

    const {
      duration = 600,
      delay = 0,
    } = param ?? {}

    const minHight = Math.max(
      prop.chamfer.lb ?? 0,
      prop.chamfer.rb ?? 0,
    )

    const pointDuration = duration / 5 * 4
    await Promise.all([
      anime({
        targets: pointData.value.rb.p1,
        y: pointData.value.rb.p1.y - svgSize.height + minHight,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,
      anime({
        targets: pointData.value.rb.p2,
        y: pointData.value.rb.p2.y - svgSize.height + minHight,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,
      anime({
        targets: pointData.value.lb.p1,
        y: pointData.value.lb.p1.y - svgSize.height + minHight,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,
      anime({
        targets: pointData.value.lb.p2,
        y: pointData.value.lb.p2.y - svgSize.height + minHight,
        duration: pointDuration,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
        delay,
      }).finished,

      anime({
        targets: svgRef.value,
        opacity: [
          1,
          0.6,
          0.1,
          0.3,
          0,
        ],
        duration: duration / 5,
        delay: pointDuration,
        easing: 'steps(1)',
      }).finished,
    ])
  },
  async selected(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}

    await Promise.all([
      anime({
        targets: color,
        value: prop.selectedColor,
        duration,
        delay,
        easing: 'cubicBezier(1, 0.1, 0, 0.9)',
      }).finished,
    ])
  },
  async hover(param) {
    return this.normal(param)
  },
}

/** 初始化所有點位，消除 cardSize 變化帶來的偏移 */
watch(svgSize, () => {
  pointData.value = getPointAttrMapNormal()

  if (card?.visible.value) {
    animeMap.visible({ delay: 0, duration: 0 })
  }
  else {
    animeMap.hidden({ delay: 0, duration: 0 })
  }
})

onMounted(async () => {
  if (!card) {
    console.warn('此元件必須包在 CardFuturistic 元件中')
    return
  }

  card.bindPart({
    name: 'bg',
    animeMap,
  })
})
</script>

<style scoped lang="sass">
</style>
