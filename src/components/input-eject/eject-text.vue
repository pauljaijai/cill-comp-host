<template>
  <span
    ref="text"
    class="pointer-events-none fixed origin-center leading-none"
    :style
  >
    {{ props.text }}
  </span>
</template>

<script setup lang="ts">
import { useElementBounding, useIntervalFn, useWindowSize, whenever } from '@vueuse/core'
import { computed, reactive, ref, useTemplateRef } from 'vue'

interface Props {
  id: string;
  index: number;
  text: string;
  /** 起點座標 */
  startPosition: {
    x: number;
    y: number;
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

const textRef = useTemplateRef('text')
const textBounding = reactive(useElementBounding(textRef))
const windowSize = reactive(useWindowSize())

const textData = ref({
  x: 0,
  y: 0,
  angle: 0,
  vx: Math.random() * 5 - 2.5,
  vy: -10 - Math.random() * 5,
  va: -5 + Math.random() * 10,
})

/** 設定 fpsLimit 會很明顯不流暢 */
// useRafFn(() => {
//   const { vx, vy } = textData.value

//   textData.value.x += vx
//   textData.value.y += vy

//   textData.value.vy += props.gravity
// }, {
//   fpsLimit: 60,
// })

useIntervalFn(() => {
  const { vx, vy } = textData.value

  textData.value.x += vx
  textData.value.y += vy
  textData.value.angle += textData.value.va

  textData.value.vy += props.gravity
}, 15)

const style = computed(() => {
  const { x, y } = props.startPosition

  return {
    left: `${x - textBounding.width / 2 + textData.value.x}px`,
    top: `${y - textBounding.height / 2 + textData.value.y}px`,
    rotate: `${textData.value.angle}deg`,
  }
})

whenever(
  () => textBounding.top > windowSize.height,
  () => emit('remove', props.id),
)
</script>
