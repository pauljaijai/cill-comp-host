<template>
  <svg
    ref="svg"
    :view-box
  >
    <!-- 正中間垂直線 -->
    <path
      v-for="path, i in pathList"
      :key="i"
      :d="path"
      :stroke="props.lineColor"
      stroke-width="1"
      fill="none"
    />
  </svg>
</template>

<script setup lang="ts">
import { useElementSize, useRafFn } from '@vueuse/core'
import { createNoise2D } from 'simplex-noise'
import { computed, reactive, shallowRef, triggerRef, useTemplateRef, watch } from 'vue'

type Point = Record<'x' | 'y' | 'dx' | 'dy' | 'vx' | 'vy', number>

// #region Props
interface Props {
  /** 線條間距 */
  lineGap?: number;

  /** 線條之點間距 */
  pointGap?: number;

  /** 線條顏色 */
  lineColor?: string;

  /** 各種效果。例：風吹、波動等等 */
  effect?: string;
}
// #endregion Props

const props = withDefaults(defineProps<Props>(), {
  lineGap: 8,
  pointGap: 2,
  lineColor: '#444',
})

const noise = createNoise2D()

const svgRef = useTemplateRef('svg')
const svgSize = reactive(useElementSize(svgRef))

const viewBox = computed(() => `0 0 ${svgSize.width} ${svgSize.height}`)

/** 偏移量 */
const pointMatrix = shallowRef<Point[][]>([])

function initPointMatrix() {
  const { lineGap, pointGap } = props
  const { width, height } = svgSize

  const lineCount = Math.ceil(width / lineGap)
  const pointCount = Math.ceil(height / pointGap)

  for (let i = 0; i < lineCount; i++) {
    const x = i * lineGap
    const points: Point[] = []
    for (let j = 0; j < pointCount; j++) {
      const y = j * pointGap
      points.push({ x, y, dx: 0, dy: 0, vx: 0, vy: 0 })
    }
    pointMatrix.value.push(points)
  }

  triggerRef(pointMatrix)
}
watch(svgSize, () => {
  initPointMatrix()
})

const pathList = computed(() =>
  pointMatrix.value.map((points) =>
    `M ${points.map(
      ({ x, y, dx, dy }) => `${x + dx} ${y + dy}`,
    ).join(' ')}`,
  ),
)

useRafFn(() => {
  const now = Date.now() / 5000

  pointMatrix.value.forEach((points) => {
    points.forEach((point) => {
      const value = noise(
        point.x * 0.008 + now,
        point.y * 0.008 + now,
      )

      point.dx = Math.sin(value) * props.lineGap * 2
      point.dy = Math.sin(value) * props.lineGap * 2
    })
  })

  triggerRef(pointMatrix)
})
</script>

<style scoped lang="sass">
</style>
