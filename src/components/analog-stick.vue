<template>
  <div
    ref="padRef"
    class="pad select-none"
    @pointerdown="handleMouseDown"
    @pointerup="handleMouseUp"
    @touchmove="(e) => e.preventDefault()"
    @contextmenu="(e) => e.preventDefault()"
  >
    <div
      class="thumb"
      :class="{ 'active': thumb.active }"
      :style="thumbStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn, useMouseInElement, useMousePressed, whenever } from '@vueuse/core';
import { clamp } from 'lodash-es';
import { computed, ref, watch } from 'vue';
import { getUnitVector, getVectorLength } from '../common/utils';

interface Props {
  /** 尺寸，直徑 */
  size?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: '34rem'
});

const emit = defineEmits<{
  (e: 'trigger', data: { x: number, y: number }): void;
}>();


const padRef = ref<HTMLDivElement>();

const {
  elementX: mouseX, elementY: mouseY,
  elementWidth: width, elementHeight: height,
} = useMouseInElement(padRef);
const { pressed } = useMousePressed()

/** 計算滑鼠到與物體的中心距離 */
const coordinate = computed(() => {
  const x = width.value / 2 - mouseX.value;
  const y = height.value / 2 - mouseY.value;

  return {
    x, y
  }
});

const thumb = ref({
  offset: {
    x: 0,
    y: 0
  },
  active: false,
});
const thumbStyle = computed(() => ({
  transform: `translate(${thumb.value.offset.x}px, ${thumb.value.offset.y}px)`,
  opacity: thumb.value.active ? 0.8 : undefined,
}));

function handleMouseDown() {
  thumb.value.active = true;
}
function handleMouseUp() {
  thumb.value = {
    offset: { x: 0, y: 0 },
    active: false
  }

  emit('trigger', { x: 0, y: 0 });
}
function handleMouseMove() {
  if (!thumb.value.active) return;

  const { x, y } = coordinate.value;

  /** 計算位移的長度 */
  const vectorLength = getVectorLength({ x, y });

  /** 計算目前偏移最大值 */
  const xMax = (Math.abs(x) / vectorLength) * (width.value / 2);
  const yMax = (Math.abs(y) / vectorLength) * (height.value / 2);

  /** 利用 clamp 限制偏移數值在 -max 與 max 之間 */
  thumb.value.offset = {
    x: clamp(-x, -xMax, xMax),
    y: clamp(-y, -yMax, yMax),
  };
}

/** 偵測滑鼠狀態
 * 
 * 因為超出 DOM 後無法觸發 DOM 事件，所以直接偵測滑鼠狀態
 */
watch(
  () => [mouseX, mouseY],
  () => handleMouseMove(),
  { deep: true }
);
whenever(
  () => !pressed.value,
  () => handleMouseUp(),
  { deep: true }
);

useIntervalFn(() => {
  const { x, y } = thumb.value.offset;
  if (x === 0 && y === 0) return;

  /** 轉為單位向量，讓 x、y 的範圍介於 -1 至 1 之間 */
  const vector = getUnitVector({ x, y });
  emit('trigger', { x: vector.x, y: vector.y });
}, 50);
</script>

<style scoped lang="sass">
.pad
  width: v-bind('props.size')
  height: v-bind('props.size')
  display: flex
  justify-content: center
  align-items: center
  background: #DDD
  border-radius: 999rem
.thumb
  width: 40%
  height: 40%
  background: white
  border-radius: 9999px
  opacity: 0.4
  transition-duration: 0.3s
  transition-timing-function: cubic-bezier(0.000, 1.650, 0.190, 1.005)
  &.active
    transition-duration: 0s
</style>