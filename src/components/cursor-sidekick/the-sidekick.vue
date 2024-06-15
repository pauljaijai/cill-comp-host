<template>
  <div class="">
    <svg
      ref="sidekickRef"
      v-bind="size"
      :style="sidekickStyle"
      viewBox="0 0 703 703"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="sidekick pointer-events-none"
    >
      <path
        ref="bodyRef"
        d="M584 351.5C584 479.906 485.5 584 351.5 584C217.5 584 119 479.906 119 351.5C119 223.094 223.094 119 351.5 119C479.906 119 584 223.094 584 351.5Z"
        :fill="props.color"
        :style="bodyStyle"
        class="body"
      />

      <g
        :style="faceStyle"
        class="face"
      >
        <ellipse
          cx="289"
          cy="284.5"
          rx="24"
          ry="67.5"
          fill="white"
          class="eye"
        />
        <ellipse
          cx="415"
          cy="284.5"
          rx="24"
          ry="67.5"
          fill="white"
          class="eye"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watch } from 'vue';
import { mapNumber } from '../../common/utils';
import anime from 'animejs';

import { useElementBounding, useElementSize } from '@vueuse/core';

interface Position {
  x: number;
  y: number;
}

// #region Props
interface Props {
  size: number;
  color: string;
  /** 目前速度 */
  velocity: number;
  /** 人物目前位置 */
  position: Position;
  /** 游標位置 */
  cursorPosition: Position;
  /** 目標元素 */
  targetElement?: HTMLElement;
  /** 已選取文字 */
  selectedText?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  targetElement: undefined,
  selectedText: undefined,
});

const sidekickRef = ref<SVGElement>();
const bodyRef = ref<SVGPathElement>();
const size = computed(() => ({
  width: props.size,
  height: props.size,
}));

const targetElementBounding = useElementBounding(() => props.targetElement, {
  reset: false,
});
watch(() => props.targetElement, (el) => {
  const bodyEl = bodyRef.value;
  if (!bodyEl) return;

  if (el) {
    anime.remove(bodyEl);
    anime({
      targets: bodyEl,
      d: 'M691 20.4999C711 40.5 705 681 691 695C677 709 32.0003 714 13 695C-6.00038 676 -13.0001 46.5 12.9999 20.5C38.9999 -5.50002 671 0.499857 691 20.4999Z',
      duration: 800,
    })
  } else {
    anime.remove(bodyEl);
    anime({
      targets: bodyEl,
      d: 'M584 351.5C584 479.906 485.5 584 351.5 584C217.5 584 119 479.906 119 351.5C119 223.094 223.094 119 351.5 119C479.906 119 584 223.094 584 351.5Z',
      duration: 500,
    })
  }

  // console.log(`🚀 ~ value:`, value);
})


/** 根據目標位置計算身體旋轉角度，以 +x 為 0 度 */
const bodyAngle = computed(() => {
  if (props.targetElement) return 0;

  const size = props.size;
  const [x, y] = [
    props.cursorPosition.x - props.position.x - size / 2,
    props.cursorPosition.y - props.position.y - size / 2,
  ]
  return Math.atan2(y, x);
});

/** 速度越快身體越扁 */
const bodyStyle = computed<CSSProperties>(() => {
  const scaleX = mapNumber(props.velocity, 0, 1, 1, 1.4);

  return {
    transform: `rotate(${bodyAngle.value}rad) scaleX(${scaleX}) `,
  }
});

const FACE_MAX_ANGLE = 30;
/** 計算臉部旋轉 */
const faceStyle = computed<CSSProperties>(() => {
  const angle = bodyAngle.value;

  // 根據 2D 角度計算 3D 旋轉量
  const rotationX = Math.sin(angle) * FACE_MAX_ANGLE;
  const rotationY = -Math.cos(angle) * FACE_MAX_ANGLE;

  return {
    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
    opacity: props.targetElement ? 0 : 1,
  }
});

const faceTransformOrigin = computed(
  () => `50% 50% ${props.size * 3}px`
);

const sidekickStyle = computed<CSSProperties>(() => {
  if (!props.targetElement) return {};

  const [x, y] = [
    targetElementBounding.width.value / props.size,
    targetElementBounding.height.value / props.size,
  ]

  return {
    transform: `scale(${x}, ${y})`,
    opacity: props.targetElement ? 0.1 : 1,
  }
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.sidekick
  perspective: 10rem
  transition: transform 0.6s cubic-bezier(0.96, 0, 0.2, 1.15), opacity 0.4s
  transform-origin: 0% 0%
  image-rendering: auto

.body
  transform-origin: 50% 50%

.face
  transform-origin: v-bind(faceTransformOrigin)
  transition: opacity 0.4s
.eye
  transform-origin: 50% 50%

@keyframes blink 
  0%, 98%, 100%
    opacity: 1
  99%
    opacity: 0
</style>


  <!-- 包住元素 -->
<!-- 
  <svg
    width="703"
    height="703"
    viewBox="0 0 703 703"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="703"
      height="703"
      fill="white"
    />
    <path
      d="M691 20.4999C711 40.5 705 681 691 695C677 709 32.0003 714 13 695C-6.00038 676 -13.0001 46.5 12.9999 20.5C38.9999 -5.50002 671 0.499857 691 20.4999Z"
      fill="#515151"
    />
    <ellipse
      cx="289"
      cy="284.5"
      rx="24"
      ry="67.5"
      fill="white"
    />
    <ellipse
      cx="415"
      cy="284.5"
      rx="24"
      ry="67.5"
      fill="white"
    />
  </svg> 
  -->