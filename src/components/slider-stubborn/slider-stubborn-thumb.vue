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
import {
  throttleFilter, useIntervalFn,
  useMouseInElement,
  useWindowSize
} from '@vueuse/core';
import anime from 'animejs';
import { computed, CSSProperties, reactive, ref, watch } from 'vue';
import { getVectorLength, mapNumber } from '../../common/utils';
import { add, pipe } from 'remeda';

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
  sliderSize: {
    width: number,
    height: number,
  };
}
const props = withDefaults(defineProps<Props>(), {});

const windowSize = reactive(useWindowSize());

const svgRef = ref<SVGElement>();
const mouseInSvg = reactive(useMouseInElement(
  svgRef, { eventFilter: throttleFilter(15) }
));
/** 以 svg 中心為 0 點 */
const mousePosition = computed(() => ({
  x: mouseInSvg.elementX - mouseInSvg.elementWidth / 2,
  y: mouseInSvg.elementY - mouseInSvg.elementHeight / 2,
}));

/** 動態調整 svg 尺寸，避免拉動 slider 時頁面產生多餘滾動條 */
const svgSize = ref(props.maxThumbLength + props.thumbSize * 1.5);
const svgAttrData = computed(() => ({
  width: svgSize.value,
  height: svgSize.value,
  viewBox: [
    svgSize.value / -2,
    svgSize.value / -2,
    svgSize.value,
    svgSize.value,
  ].join(' ')
}));

/** svgSize 動畫效果 */
useIntervalFn(() => {
  const newSize = pipe(0,
    () => {
      if (!props.isHeld || !props.disabled) {
        return props.thumbSize;
      }

      const size = Math.max(
        Math.abs(mousePosition.value.x),
        Math.abs(mousePosition.value.y),
        props.thumbSize,
      ) * 2

      if (size > props.maxThumbLength * 2) {
        return props.maxThumbLength * 2;
      }

      return size;
    },
    /** 1.5 是安全係數 */
    (value) => value + props.thumbSize * 1.5
  );

  const delta = newSize - svgSize.value;
  if (Math.abs(delta) < 0.01) {
    svgSize.value = newSize;
    return;
  }

  // 長大要快，縮小要慢
  if (delta > 0) {
    svgSize.value += delta;
  } else {
    svgSize.value += delta / 10;
  }
}, 15)


const svgStyle = computed<CSSProperties>(() => {
  const leftValue = pipe(null,
    () => {
      if (props.disabled) {
        return props.ratio;
      }

      return props.isHeld ? props.mouseRatio : props.ratio;
    }
  );

  return {
    left: `${leftValue}%`,
  }
});

/** svg path 的 Q 指令需要控制點與終點，表達二次貝茲曲線
 * 
 * [文件](https://www.oxxostudio.tw/articles/201406/svg-04-path-1.html)
 */
const ctrlPoint = ref({ x: 0, y: 0 });
/** 控制點速度，用來模擬震盪效果 */
let ctrlPointVelocity = { x: 0, y: 0 };
/** 彈性係數，根據目前長度映射，模擬拉越緊震動越快 */
const ctrlPointStiffness = computed(() => mapNumber(
  length.value,
  0, props.maxThumbLength,
  3.5, 4.5,
));
/** 速度衰減率，根據目前長度映射，模擬越短震動越快停止
 * 
 * 範圍 0 ~ 1。越小衰減越快
 */
const ctrlPointDamping = computed(() => mapNumber(
  length.value,
  0, props.maxThumbLength,
  0.85, 0.75,
));

const endPoint = ref({ x: 0, y: 0 });

const pathD = computed(() => {
  const { x: ctrlX, y: ctrlY } = ctrlPoint.value;
  const { x: endX, y: endY } = endPoint.value;

  return [
    `M0 0`,
    `Q${ctrlX} ${ctrlY}, ${endX} ${endY}`,
  ].join(' ')
});

/** 目前長度 */
const length = computed(() => {
  /** 因為起點是 0, 0，所以變化量直接等於終點座標 */
  const delta = {
    x: endPoint.value.x,
    y: endPoint.value.y,
  }

  return getVectorLength(delta);
});

const strokeMinWidth = computed(() => Math.max(props.thumbSize * 0.1, 5));
const strokeWidth = computed(() => mapNumber(
  length.value,
  0,
  props.maxThumbLength,
  props.thumbSize,
  strokeMinWidth.value,
));

/** 放開時，播放回彈動畫 */
watch(() => props.isHeld, (value) => {
  if (value) return;

  anime({
    targets: endPoint.value,
    x: 0,
    y: 0,
    easing: 'easeOutElastic',
    duration: 300,
  });
})

/** 滑鼠移動時，更新終點位置 */
watch(() => [
  mousePosition,
  props.sliderSize,
], () => {
  if (props.disabled) return;

  endPoint.value = {
    x: 0,
    y: 0,
  }
}, { deep: true })

/** 處理終點動畫 */
useIntervalFn(() => {
  if (!props.isHeld || !props.disabled) return;

  const newPoint = {
    x: (mousePosition.value.x - endPoint.value.x) / 2 + endPoint.value.x,
    y: (mousePosition.value.y - endPoint.value.y) / 2 + endPoint.value.y,
  }

  const length = getVectorLength(newPoint);

  // 如果超過 maxThumbLength，則將 newPoint 限制在 maxThumbLength 範圍內
  if (length > props.maxThumbLength) {
    // 製造抖動效果
    const noise = Math.random() * 4;

    const scaleFactor = props.maxThumbLength / length;
    newPoint.x = newPoint.x * scaleFactor + noise;
    newPoint.y = newPoint.y * scaleFactor + noise;
  }

  endPoint.value = newPoint;
}, 15)

/** 處理控制點 */
useIntervalFn(() => {
  const targetPoint = {
    x: endPoint.value.x / 2,
    y: endPoint.value.y / 2,
  }

  const dx = targetPoint.x - ctrlPoint.value.x
  const dy = targetPoint.y - ctrlPoint.value.y

  // 彈力公式：F = -k * x (k 是彈性係數，x 是位移)
  ctrlPointVelocity.x += ctrlPointStiffness.value * dx
  ctrlPointVelocity.y += ctrlPointStiffness.value * dy

  // 阻尼，減少速度
  ctrlPointVelocity.x *= ctrlPointDamping.value
  ctrlPointVelocity.y *= ctrlPointDamping.value

  if (Math.abs(ctrlPointVelocity.x) < 0.001 && Math.abs(ctrlPointVelocity.y) < 0.001) {
    ctrlPointVelocity = { x: 0, y: 0 }
    return;
  }

  // 更新座標
  ctrlPoint.value.x += ctrlPointVelocity.x
  ctrlPoint.value.y += ctrlPointVelocity.y

  // 不可以超出畫面
  if (Math.abs(ctrlPoint.value.x) > windowSize.width / 2) {
    ctrlPoint.value.x = ctrlPoint.value.x > 0 ? windowSize.width / 2 : -windowSize.width / 2;
  }
  if (Math.abs(ctrlPoint.value.y) > windowSize.height / 2) {
    ctrlPoint.value.y = ctrlPoint.value.y > 0 ? windowSize.height / 2 : -windowSize.height / 2;
  }
}, 15)
</script>

<style scoped lang="sass">
.thumb-svg
  top: 50%
  transform: translate(-50%, -50%)
  will-change: left width height view-box

.track
  height: 8px
  background: #EEE
</style>
