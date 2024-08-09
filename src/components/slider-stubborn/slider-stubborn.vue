<template>
  <div class=" relative">
    <div
      ref="trackRef"
      class="track rounded-full cursor-pointer"
      @mousedown="(e) => e.preventDefault()"
    />

    <svg
      ref="svgRef"
      v-bind="svgAttrData"
      :style="svgStyle"
      class="border absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
    >
      <path
        :d="pathD"
        stroke="black"
        :stroke-width="props.thumbSize"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { throttleFilter, useIntervalFn, useMouseInElement, useMousePressed, useVModel } from '@vueuse/core';
import anime from 'animejs';
import { clamp, pipe } from 'remeda';
import { computed, CSSProperties, reactive, ref, watch, watchEffect } from 'vue';

// #region Props
interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  /** 握把被拉長的最大長度 */
  maxThumbLength?: number;
  thumbSize?: number;
  disabled?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  maxThumbLength: 500,
  thumbSize: 20,
  disabled: false,
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

const modelValue = useVModel(props, 'modelValue', emit);

const isHeld = ref(false);
const { pressed } = useMousePressed()
watch(pressed, (isPressed) => {
  if (!mouseInTrack.isOutside && isPressed) {
    isHeld.value = true;
  }

  if (!isPressed) {
    isHeld.value = false;
  }
})

const trackRef = ref<HTMLDivElement>();
const mouseInTrack = reactive(useMouseInElement(
  trackRef, { eventFilter: throttleFilter(16) }
));

const ratio = computed(() => pipe(
  modelValue.value / (props.max - props.min) * 100,
  clamp({ min: 0, max: 100 }),
));
const mouseRatio = computed(() => pipe(
  mouseInTrack.elementX / mouseInTrack.elementWidth * 100,
  clamp({ min: 0, max: 100 }),
));

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

/** 中間點速度，用來模擬震盪效果 */
let midVelocity = { x: 0, y: 0 };
/** 彈性係數 */
const stiffness = 0.6;
/** 速度衰減率，範圍 0 ~ 1。越大速度衰減越快 */
let damping = 0.7;

/** 放開的瞬間，播放回彈動畫 */
watch(isHeld, (value) => {
  if (value) return;

  anime({
    targets: pathEnd.value,
    ...pathStart.value,
    easing: 'easeOutElastic',
    duration: 600,
  });
})

useIntervalFn(() => {
  if (!isHeld.value) return;

  if (!props.disabled) {
    modelValue.value = (props.max - props.min) * mouseRatio.value / 100;

    pathEnd.value = {
      ...pathStart.value
    }

    return;
  }

  pathEnd.value = {
    x: mouseInSvg.elementX,
    y: mouseInSvg.elementY,
  }
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
  midVelocity.x += stiffness * dx
  midVelocity.y += stiffness * dy

  // 阻尼：減少速度，模擬摩擦或空氣阻力
  midVelocity.x *= damping
  midVelocity.y *= damping

  if (Math.abs(midVelocity.x) < 0.001 && Math.abs(midVelocity.y) < 0.001) {
    midVelocity = { x: 0, y: 0 }
  }

  // 更新座標
  pathMid.value.x += midVelocity.x
  pathMid.value.y += midVelocity.y
}, 20)
</script>

<style scoped lang="sass">
.track
  height: 8px
  background: #EEE
</style>
