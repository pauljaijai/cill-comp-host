<template>
  <svg
    ref="sidekickRef"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 465 465"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="sidekick pointer-events-none"
  >
    <circle
      cx="232.5"
      cy="232.5"
      r="232.5"
      :fill="props.color"
      :style="bodyStyle"
      class="body"
    />

    <g
      :style="faceStyle"
      class="face"
    >
      <ellipse
        cx="170"
        cy="165.5"
        rx="24"
        ry="67.5"
        fill="white"
      />
      <ellipse
        cx="296"
        cy="165.5"
        rx="24"
        ry="67.5"
        fill="white"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watch } from 'vue';
import { mapNumber } from '../../common/utils';
import { useElementSize } from '@vueuse/core';

interface Position {
  x: number;
  y: number;
}

// #region Props
interface Props {
  size: string;
  color: string;
  /** 目前速度 */
  velocity: number;
  /** 人物目前位置 */
  position: Position;
  /** 游標位置 */
  cursorPosition: Position;
  /** 目標元素 */
  targetElement?: HTMLElement;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  targetElement: undefined,
});

const sidekickRef = ref<SVGElement>();
const svgSize = useElementSize(sidekickRef);

watch(() => props.targetElement, (value) => {
  // console.log(`🚀 ~ value:`, value);
}, { deep: true })

/** 根據目標位置計算身體旋轉角度，以 +x 為 0 度 */
const bodyAngle = computed(() => {
  const [x, y] = [
    props.cursorPosition.x - props.position.x - svgSize.width.value / 2,
    props.cursorPosition.y - props.position.y - svgSize.height.value / 2,
  ]
  return Math.atan2(y, x);
});

/** 速度越快身體越扁 */
const bodyStyle = computed<CSSProperties>(() => {
  const scaleY = mapNumber(props.velocity, 0, 1, 1, 0.8);

  return {
    transform: `rotate(${bodyAngle.value}rad) scaleY(${scaleY}) `,
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
  }
});

const faceTransformOrigin = computed(
  () => `50% 50% ${Math.max(svgSize.width.value, svgSize.height.value) * 3}px`
);

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.sidekick
  perspective: 10rem

.body
  transform-origin: 50% 50%

.face
  transform-origin: v-bind(faceTransformOrigin)
</style>
