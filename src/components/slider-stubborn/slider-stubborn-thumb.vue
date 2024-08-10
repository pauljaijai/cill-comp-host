<template>
  <svg
    ref="svgRef"
    v-bind="svgAttrData"
    :style="svgStyle"
    class="thumb-svg absolute pointer-events-none"
  >
    <path
      :d="pathD"
      :stroke="props.thumbColor"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
      stroke-linecap="round"
      fill="none"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<script setup lang="ts">
import { throttleFilter, useIntervalFn, useMouseInElement } from '@vueuse/core';
import anime from 'animejs';
import { computed, CSSProperties, reactive, ref, watch } from 'vue';
import { getVectorLength, mapNumber } from '../../common/utils';

interface Props {
  min: number;
  max: number;
  maxThumbLength: number;
  thumbSize: number;
  thumbColor: string;
  disabled: boolean;

  isHeld: boolean;
  ratio: number;
  mouseRatio: number;
}
const props = withDefaults(defineProps<Props>(), {});

const isHeld = computed(() => props.isHeld);
const ratio = computed(() => props.ratio);
const mouseRatio = computed(() => props.mouseRatio);

const svgRef = ref<SVGElement>();
const mouseInSvg = reactive(useMouseInElement(
  svgRef, { eventFilter: throttleFilter(16) }
));

const svgAttrData = computed(() => {
  const value = props.maxThumbLength * 2;

  return {
    width: value,
    height: value,
    viewBox: `0 0 ${value} ${value}`
  }
});
const svgStyle = computed<CSSProperties>(() => {
  if (props.disabled) {
    return {
      left: `${ratio.value}%`,
    }
  }

  const left = isHeld.value ? mouseRatio.value : ratio.value;
  return {
    left: `${left}%`,
  }
});

const pathStart = computed(() => {
  const point = props.maxThumbLength;
  return { x: point, y: point };
});
const pathMid = ref({
  x: pathStart.value.x,
  y: pathStart.value.y,
});
const pathEnd = ref({
  x: pathStart.value.x,
  y: pathStart.value.y,
});

const pathD = computed(() => {
  const { x: startX, y: startY } = pathStart.value;
  const { x: halfX, y: halfY } = pathMid.value;
  const { x: endX, y: endY } = pathEnd.value;

  return [
    `M${startX} ${startY}`,
    `Q${halfX} ${halfY},`,
    `${endX} ${endY}`,
  ].join(' ')
});

const length = computed(() => {
  const delta = {
    x: pathEnd.value.x - pathStart.value.x,
    y: pathEnd.value.y - pathStart.value.y,
  }

  return getVectorLength(delta);
});

const strokeWidth = computed(() => {
  return mapNumber(
    length.value,
    0,
    props.maxThumbLength,
    props.thumbSize,
    props.thumbSize * 0.1,
  );
});

/** 中間點速度，用來模擬震盪效果 */
let midVelocity = { x: 0, y: 0 };
/** 彈性係數，越大震動越快 */
const stiffness = computed(() => {
  return mapNumber(
    length.value,
    0,
    props.maxThumbLength,
    4,
    4.5,
  );
});
/** 速度衰減率，範圍 0 ~ 1。越小速度衰減越快 */
const damping = computed(() => {
  return mapNumber(
    length.value,
    0,
    props.maxThumbLength,
    0.85,
    0.75,
  );
});

/** 放開的瞬間，播放回彈動畫 */
watch(isHeld, (value) => {
  if (value) {
    return;
  }

  anime({
    targets: pathEnd.value,
    ...pathStart.value,
    easing: 'easeOutElastic',
    duration: 300,
  });
})

watch(() => [
  mouseInSvg.elementX, mouseInSvg.elementY
], () => {
  if (props.disabled) return;

  pathEnd.value = {
    ...pathStart.value
  }
}, { deep: true })

/** 更新終點位置 */
useIntervalFn(() => {
  if (!isHeld.value || !props.disabled) return;

  const newPoint = {
    x: (mouseInSvg.elementX - pathEnd.value.x) / 2 + pathEnd.value.x,
    y: (mouseInSvg.elementY - pathEnd.value.y) / 2 + pathEnd.value.y,
  }

  const delta = {
    x: newPoint.x - pathStart.value.x,
    y: newPoint.y - pathStart.value.y,
  }
  const deltaLength = getVectorLength(delta);

  // 如果超過 maxThumbLength，則將 newPoint 限制在 maxThumbLength 範圍內
  if (deltaLength > props.maxThumbLength) {
    // 製造抖動效果
    const noise = Math.random() * 4;

    const scaleFactor = props.maxThumbLength / deltaLength;
    newPoint.x = pathStart.value.x + delta.x * scaleFactor + noise;
    newPoint.y = pathStart.value.y + delta.y * scaleFactor + noise;
  }

  // 設定 pathEnd 為 newPoint
  pathEnd.value = newPoint;
}, 15)

/** 處理彈性動畫 */
useIntervalFn(() => {
  const targetPoint = {
    x: (pathEnd.value.x + pathStart.value.x) / 2,
    y: (pathEnd.value.y + pathStart.value.y) / 2,
  }

  const dx = targetPoint.x - pathMid.value.x
  const dy = targetPoint.y - pathMid.value.y

  // 彈力公式：F = -k * x (k 是彈性係數，x 是位移)
  midVelocity.x += stiffness.value * dx
  midVelocity.y += stiffness.value * dy

  // 阻尼：減少速度，模擬摩擦或空氣阻力
  midVelocity.x *= damping.value
  midVelocity.y *= damping.value

  if (Math.abs(midVelocity.x) < 0.001 && Math.abs(midVelocity.y) < 0.001) {
    midVelocity = { x: 0, y: 0 }
  }

  // 更新座標
  pathMid.value.x += midVelocity.x
  pathMid.value.y += midVelocity.y
}, 15)
</script>

<style scoped lang="sass">
.thumb-svg
  top: 50%
  transform: translate(-50%, -50%)
  will-change: left

.track
  height: 8px
  background: #EEE
</style>
