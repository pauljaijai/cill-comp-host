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
    width: number;
    height: number;
    x: number;
    y: number;
    a: number;
    vx: number;
    vy: number;
    va: number;
  };
}

interface Props {
  inputSize: {
    width: number;
    height: number;
  };
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

const props = withDefaults(defineProps<Props>(), {
  gravity: 0.7,
})

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

  const {
    x: originX,
    y: originY,
  } = props.originPosition

  ctx.clearRect(0, 0, windowSize.width, windowSize.height)

  const { fontSize, fontFamily, fontWeight, fontStyle, color } = props.textStyle || {}

  // 設定文字樣式
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`
  ctx.fillStyle = color || '#000' // 預設顏色為黑色

  /** 適度減慢動畫 */
  const dt = delta / 30

  textMap.forEach((item, key) => {
    ctx.save()

    ctx.translate(
      originX + item.data.x,
      originY + item.data.y,
    )
    ctx.rotate(item.data.a)
    ctx.fillText(item.text, -item.data.width / 2, -item.data.height / 2)

    ctx.restore()

    // 更新粒子
    item.data.x += item.data.vx * dt
    item.data.y += item.data.vy * dt
    item.data.vy += props.gravity * dt
    item.data.a += item.data.va * dt

    // 刪除超出邊界文字
    if (item.data.y + originY > windowSize.height) {
      textMap.delete(key)
    }
  })
})

defineExpose({
  addText(text: string, index: number) {
    const ctx = context.value

    if (!ctx) {
      return
    }
    const { fontSize } = props.textStyle || {}

    const textWidth = ctx.measureText(text).width
    // 字高與字型大小相等
    const textHeight = Number.parseInt(fontSize ?? '', 10)

    const inputWidth = props.inputSize.width * 0.8

    const item: TextItem = {
      id: crypto.randomUUID(),
      index,
      text,
      data: {
        width: textWidth,
        height: textHeight,
        x: Math.random() * inputWidth - inputWidth / 2,
        y: 0,
        a: 0,
        vx: Math.random() * 10 - 5,
        vy: -10 - Math.random() * 5,
        va: (Math.random() * 2 - 1) / 10,
      },
    }

    textMap.set(item.id, item)
  },
})
</script>
