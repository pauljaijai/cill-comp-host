<template>
  <ellipse
    v-bind="style"
    fill="#111"
  />

  <ellipse
    ref="ballRef"
    v-bind="ballStyle"
    fill="white"
  />
</template>

<script setup lang="ts">
import { SVGAttributes, computed, ref } from 'vue';
import { AnimeComponent, Size, StyleMap } from './type';
import anime from 'animejs';
import { add, clamp, filter, hasAtLeast, isTruthy, map, pipe } from 'remeda';
import { throttleFilter, useElementVisibility, useMouseInElement, watchThrottled } from '@vueuse/core';
import { getUnitVector } from '../../common/utils';

interface Props {
  size: Size;
  style: SVGAttributes;
}
const props = withDefaults(defineProps<Props>(), {});

/** 眼睛反光 */
const ballRef = ref<SVGEllipseElement>();
const {
  elementX, elementY,
  elementWidth, elementHeight,
} = useMouseInElement(ballRef, {
  eventFilter: throttleFilter(35)
});
const visible = useElementVisibility(ballRef)

const ballOffset = computed(() => {
  if (!visible.value) {
    return { x: 0, y: 0 }
  }

  return pipe(
    /** 計算座標中心 */
    {
      x: elementX.value - elementWidth.value / 2,
      y: elementY.value - elementHeight.value / 2,
    },
    getUnitVector,
    /** 調整範圍，最大距離為寬度的 1/5 */
    ({ x, y }) => {
      const value = Number(props.style.rx) / 5;

      return {
        x: x * value,
        y: y * value,
      }
    },
  )
});


const ballStyle = computed<SVGAttributes>(() => {
  const style = props.style;

  const [rx, ry] = [
    Number(style.rx) / 2,
    Number(style.ry) / 2.5,
  ];

  const [cx, cy] = [
    Number(style.cx),
    Number(style.cy) - ry,
  ];

  return {
    rx, ry, cx, cy,
    style: {
      transform: `translate(${ballOffset.value.x}px, ${ballOffset.value.y}px)`,
    }
  }
})

// #region Methods
defineExpose<AnimeComponent>({
  enter(param) {

  },
  leave(param) {

  },
});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
