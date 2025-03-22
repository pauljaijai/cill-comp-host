<template>
  <div
    ref="box"
    class="relative"
  >
    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full"
    />

    <slot :fps="throttledFps" />
  </div>
</template>

<script setup lang="ts">
import { refThrottled, throttleFilter, useElementSize, useMouseInElement, useRafFn } from '@vueuse/core'
import { clamp } from 'remeda'
import { createNoise2D } from 'simplex-noise'
import { computed, reactive, ref, useTemplateRef, watch } from 'vue'

type Point = Record<'x' | 'y' | 'dx' | 'dy' | 'vx' | 'vy', number>

// #region Props
interface MouseEffect {
  type: 'smear';
  radius: number;
  force: number;
}

interface Props {
  /** 線條間距 */
  lineGap?: number;

  /** 線條之點間距 */
  pointGap?: number;

  /** 線條顏色 */
  lineColor?: string;

  /** 各種效果。例：風吹、波動等等 */
  effect?: 'wind';

  mouseEffect?: MouseEffect;
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
  effect: 'wind',
  mouseEffect: () => ({
    type: 'smear',
    radius: 80,
    force: 6,
  }),
})
defineSlots<Slots>()

const noise = createNoise2D()

const boxRef = useTemplateRef('box')
const boxSize = reactive(useElementSize(boxRef))

const pMouse = ref({ px: 0, py: 0 })
const throttledPMouse = refThrottled(pMouse, 15)
const mouse = reactive(useMouseInElement(boxRef, {
  eventFilter: throttleFilter(15),
  handleOutside: false,
}))

const canvasRef = useTemplateRef('canvas')
const ctx = computed(() => canvasRef.value?.getContext('2d'))

/** 偏移量 */
const pointMatrix: Point[][] = []

function initPointMatrix() {
  const { lineGap, pointGap } = props
  const { width, height } = boxSize

  /** 超出畫布範圍，避免露出白底 */
  const offset = props.lineGap * 3

  const lineCount = Math.ceil((width + offset * 2) / lineGap)
  const pointCount = Math.ceil((height + offset * 2) / pointGap)

  for (let i = 0; i < lineCount; i++) {
    const x = i * lineGap - offset
    const points: Point[] = []
    for (let j = 0; j < pointCount; j++) {
      const y = j * pointGap - offset
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

interface UpdatePointParams {
  points: Point[];
  pointsIndex: number;
  point: Point;
  index: number;
  delta: number;
}
const effectUpdatePointFcnMap: Record<
  NonNullable<Props['effect']>,
  (params: UpdatePointParams) => void
> = {
  wind: (params: UpdatePointParams) => {
    const {
      point,
    } = params

    const now = performance.now() / 10000

    const value = noise(
      point.x * 0.005 + now,
      point.y * 0.005 + now,
    )

    point.vx = Math.sin(value) * 2.5
    point.vy = Math.sin(value) * 2.5
  },
}

const mouseUpdatePointFcnMap: Record<
  NonNullable<MouseEffect['type']>,
  (params: UpdatePointParams, options: MouseEffect) => void
> = {
  smear: (
    params: UpdatePointParams,
    options: Extract<MouseEffect, { type: 'smear' }>,
  ) => {
    const { point } = params
    const { elementX, elementY } = mouse

    const { px, py } = throttledPMouse.value

    const distance = Math.sqrt(
      (point.x - elementX) ** 2 + (point.y - elementY) ** 2,
    )

    if (distance > options.radius) {
      return
    }
    /** 比率，越遠越小 */
    const ratio = 1 - distance / options.radius

    point.vx += clamp((elementX - px) * ratio, { min: -options.force, max: options.force })
    point.vy += clamp((elementY - py) * ratio, { min: -options.force, max: options.force })

    pMouse.value = { px: elementX, py: elementY }
  },
}

/** 更新 point */
function updatePoint(params: UpdatePointParams) {
  const { point } = params

  /** 阻力 */
  point.vx *= 0.9
  point.vy *= 0.9

  /** 恢復力 */
  point.vx += point.dx * -0.1
  point.vy += point.dy * -0.1

  point.dx += point.vx
  point.dy += point.vy
}

const fps = ref(0)
const throttledFps = refThrottled(fps, 30)

/** 繪製與更新 */
useRafFn(({ delta }) => {
  if (!ctx.value)
    return
  const context = ctx.value

  if (delta !== 0) {
    fps.value = Math.round(1000 / delta)
  }

  // 清除畫布
  context.clearRect(0, 0, boxSize.width, boxSize.height)

  // 繪製線條
  context.strokeStyle = props.lineColor
  context.lineWidth = 1

  pointMatrix.forEach((points, pointsIndex) => {
    context.beginPath()
    points.forEach((point, index) => {
      const params = {
        points,
        pointsIndex,
        point,
        index,
        delta,
      }

      effectUpdatePointFcnMap[props.effect](params)
      if (!mouse.isOutside) {
        mouseUpdatePointFcnMap[props.mouseEffect.type](
          params,
          props.mouseEffect,
        )
      }
      updatePoint(params)

      const x = point.x + point.dx
      const y = point.y + point.dy

      /** 繪製 */
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
  fps: throttledFps,
})
</script>
