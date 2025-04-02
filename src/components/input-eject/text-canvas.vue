<template>
  <canvas
    ref="canvas"
    class="pointer-events-none fixed left-0 top-0"
    :width="windowSize.width"
    :height="windowSize.height"
  />
</template>

<script setup lang="ts">
import { useRafFn, useWindowSize, whenever } from '@vueuse/core'
import { reactive, ref, useTemplateRef } from 'vue'

interface TextItem {
  id: string;
  index: number;
  text: string;
  data: {
    x: number;
    y: number;
    a: number;
    vx: number;
    vy: number;
    va: number;
  };
}

interface Props {
  /** 原點座標 */
  originPosition: {
    x: number;
    y: number;
  };
  textStyle?: {
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    color: string;
  };
  /** 重力 */
  gravity?: number;
}

interface Emits {
  remove: [id: string];
}

const props = withDefaults(defineProps<Props>(), {
  gravity: 0.5,
})

const emit = defineEmits<Emits>()

const windowSize = reactive(useWindowSize())

const canvasRef = useTemplateRef('canvas')
const context = ref<CanvasRenderingContext2D | null>()
whenever(canvasRef, () => {
  context.value = canvasRef.value?.getContext('2d')
})

const textMap = new Map<string, TextItem>()

useRafFn(({ delta }) => {
  const ctx = context.value

  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, windowSize.width, windowSize.height)

  const { fontSize, fontFamily, fontWeight, fontStyle, color } = props.textStyle || {}

  // 設定文字樣式
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`
  ctx.fillStyle = color || '#000' // 預設顏色為黑色

  /** 適度減慢動畫 */
  const dt = delta / 30

  textMap.forEach((item) => {
    item.data.x += item.data.vx * dt
    item.data.y += item.data.vy * dt
    item.data.vy += props.gravity * dt
    item.data.a += item.data.va * dt

    ctx.save()

    ctx.translate(
      props.originPosition.x + item.data.x,
      props.originPosition.y + item.data.y,
    )
    ctx.rotate(item.data.a)
    ctx.fillText(item.text, 0, 0)

    ctx.restore()
  })
})

// whenever(
//   () => textBounding.top > windowSize.height,
//   () => emit('remove', props.id),
// )

defineExpose({
  addText(text: string, index: number) {
    const item: TextItem = {
      id: crypto.randomUUID(),
      index,
      text,
      data: {
        x: 0,
        y: 0,
        a: 0,
        vx: Math.random() * 5 - 2.5,
        vy: -10 - Math.random() * 5,
        va: (Math.random() * 2 - 1) / 10,
      },
    }

    textMap.set(item.id, item)
  },
})
</script>
