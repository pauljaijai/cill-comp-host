<template>
  <div
    ref="box"
    class="relative"
  >
    <svg
      :view-box
      class="absolute inset-0 hidden h-full w-full"
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

    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { useElementSize, useRafFn } from '@vueuse/core'
import { createNoise2D } from 'simplex-noise'
import { computed, onMounted, reactive, shallowRef, triggerRef, useTemplateRef, watch } from 'vue'

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
  lineGap: 10,
  pointGap: 10,
  lineColor: '#444',
})

const noise = createNoise2D()

const boxRef = useTemplateRef('box')
const boxSize = reactive(useElementSize(boxRef))

const viewBox = computed(() => `0 0 ${boxSize.width} ${boxSize.height}`)

/** 偏移量 */
const pointMatrix = shallowRef<Point[][]>([])

function initPointMatrix() {
  const { lineGap, pointGap } = props
  const { width, height } = boxSize

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
watch(boxSize, () => {
  initPointMatrix()
})

const pathList = computed(() =>
  pointMatrix.value.map((points) =>
    `M ${points.map(
      ({ x, y, dx, dy }) => `${x + dx} ${y + dy}`,
    ).join(' ')}`,
  ),
)

/** 更新 point */
useRafFn(() => {
  const now = performance.now() / 5000

  pointMatrix.value.forEach((points) => {
    points.forEach((point) => {
      const value = noise(
        point.x * 0.005 + now,
        point.y * 0.005 + now,
      )

      point.dx = Math.sin(value) * props.lineGap * 2
      point.dy = Math.sin(value) * props.lineGap * 2
    })
  })

  triggerRef(pointMatrix)
})

const canvasRef = useTemplateRef('canvas')
const ctx = computed(() => canvasRef.value?.getContext('2d'))

onMounted(() => {
  if (!canvasRef.value) {
    return
  }

  canvasRef.value.width = boxSize.width
  canvasRef.value.height = boxSize.height
})

function draw() {
  if (!ctx.value)
    return
  const context = ctx.value

  // 清除畫布
  context.clearRect(0, 0, boxSize.width, boxSize.height)

  // 繪製線條
  context.strokeStyle = props.lineColor
  context.lineWidth = 1

  pointMatrix.value.forEach((points) => {
    context.beginPath()
    points.forEach((point, index) => {
      const x = point.x + point.dx
      const y = point.y + point.dy
      if (index === 0) {
        context.moveTo(x, y)
      }
      else {
        context.lineTo(x, y)
      }
    })
    context.stroke()
  })
}

useRafFn(draw)
</script>

<style scoped lang="sass">
</style>
