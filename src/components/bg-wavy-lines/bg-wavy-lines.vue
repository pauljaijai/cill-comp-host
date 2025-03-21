<template>
  <div
    ref="box"
    class="relative"
  >
    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full"
    />

    <slot :fps />
  </div>
</template>

<script setup lang="ts">
import { useElementSize, useRafFn } from '@vueuse/core'
import { createNoise2D } from 'simplex-noise'
import { computed, reactive, ref, useTemplateRef, watch } from 'vue'

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

// #region Slots
interface Slots {
  default?: (data: { fps: number }) => unknown;
}
// #endregion Slots

const props = withDefaults(defineProps<Props>(), {
  lineGap: 10,
  pointGap: 10,
  lineColor: '#999',
})
defineSlots<Slots>()

const fps = ref(0)

const noise = createNoise2D()

const boxRef = useTemplateRef('box')
const boxSize = reactive(useElementSize(boxRef))

const canvasRef = useTemplateRef('canvas')
const ctx = computed(() => canvasRef.value?.getContext('2d'))

/** 最大偏移量 */
const maxOffset = props.lineGap * 2

/** 偏移量 */
const pointMatrix: Point[][] = []

function initPointMatrix() {
  const { lineGap, pointGap } = props
  const { width, height } = boxSize

  const lineCount = Math.ceil((width + maxOffset * 2) / lineGap)
  const pointCount = Math.ceil((height + maxOffset * 2) / pointGap)

  for (let i = 0; i < lineCount; i++) {
    const x = i * lineGap - maxOffset
    const points: Point[] = []
    for (let j = 0; j < pointCount; j++) {
      const y = j * pointGap - maxOffset
      points.push({ x, y, dx: 0, dy: 0, vx: 0, vy: 0 })
    }
    pointMatrix.push(points)
  }
}
watch(boxSize, () => {
  initPointMatrix()

  if (canvasRef.value) {
    canvasRef.value.width = boxSize.width
    canvasRef.value.height = boxSize.height
  }
})

/** 繪製與更新 */
useRafFn(({ delta }) => {
  if (!ctx.value)
    return
  const context = ctx.value

  fps.value = Math.round(1000 / delta)

  // 清除畫布
  context.clearRect(0, 0, boxSize.width, boxSize.height)

  // 繪製線條
  context.strokeStyle = props.lineColor
  context.lineWidth = 1

  const now = performance.now() / 5000

  pointMatrix.forEach((points) => {
    context.beginPath()
    points.forEach((point, index) => {
      /** 更新座標 */
      const value = noise(
        point.x * 0.005 + now,
        point.y * 0.005 + now,
      )

      point.dx = Math.sin(value) * maxOffset
      point.dy = Math.sin(value) * maxOffset

      /** 繪製 */
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
})

// #region Methods
interface Expose {
  fps: typeof fps;
}
// #endregion Methods

defineExpose<Expose>({
  fps,
})
</script>
