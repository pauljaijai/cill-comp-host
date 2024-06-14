<template>
  <svg
    ref="sidekickRef"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 465 465"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="sidekick"
  >
    <circle
      cx="232.5"
      cy="232.5"
      r="232.5"
      :fill="props.color"
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
import { CSSProperties, computed, ref, watch, watchEffect } from 'vue';
import { getUnitVector } from '../../common/utils';
import { useElementSize } from '@vueuse/core';

// #region Props
interface Props {
  size: string;
  color: string;
  /** 人物目前位置 */
  position: { x: number; y: number };
  /** 目標位置 */
  targetPosition: { x: number; y: number };
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {});

const sidekickRef = ref<SVGElement>();
const svgSize = useElementSize(sidekickRef);

/** 根據目標位置計算身體旋轉角度，以 +x 為 0 度 */
const bodyAngle = computed(() => {
  const [x, y] = [
    props.targetPosition.x - props.position.x - svgSize.width.value / 2,
    props.targetPosition.y - props.position.y - svgSize.height.value / 2,
  ]
  return Math.atan2(y, x);
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

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.sidekick
  perspective: 10rem

.face
  transform-origin: 50% 50% 10rem
</style>
