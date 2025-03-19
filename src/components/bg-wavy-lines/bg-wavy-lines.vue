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
import { computed, reactive, shallowRef, triggerRef, useTemplateRef, watch } from 'vue'

type Point = [
  /** x, y */
  number,
  number,
  /** dx, dy */
  number,
  number,
  /** vx, vy */
  number,
  number,
]

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
  lineGap: 5,
  pointGap: 2,
  lineColor: '#444',
})

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
      points.push([x, y, 0, 0, 0, 0])
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
      ([x, y, dx, dy]) => `${x + dx} ${y + dy}`,
    ).join(' ')}`,
  ),
)

useRafFn(() => {
  const now = Date.now() / 1000

  pointMatrix.value.forEach((points, i) => {
    points.forEach((point, j) => {
      /** 產生隨機力 */
      // point[5] += Math.random() * 0.1 - 0.05
      // point[4] += Math.random() * 0.1 - 0.05

      /** 速度積分 */
      point[2] += point[4]
      point[3] += point[5]
    })
  })

  triggerRef(pointMatrix)
})
</script>

<style scoped lang="sass">
</style>
