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

interface Props {
  list: Array<{
    id: string;
    index: number;
    text: string;
  }>;
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

const canvasRef = useTemplateRef('canvas')
const context = ref<CanvasRenderingContext2D | null>()
whenever(canvasRef, () => {
  context.value = canvasRef.value?.getContext('2d')
})

const windowSize = reactive(useWindowSize())

useRafFn(() => {
  const ctx = context.value

  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, windowSize.width, windowSize.height)

  const { fontSize, fontFamily, fontWeight, fontStyle, color } = props.textStyle || {}

  // 設定文字樣式
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`
  ctx.fillStyle = color || '#000' // 預設顏色為黑色

  // 畫出每個文字
  props.list.forEach((item) => {
    ctx.fillText(
      item.text,
      props.originPosition.x,
      props.originPosition.y,
    )
  })
})

// whenever(
//   () => textBounding.top > windowSize.height,
//   () => emit('remove', props.id),
// )
</script>
