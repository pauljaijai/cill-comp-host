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
import { useMouseInElement, watchThrottled } from '@vueuse/core';
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
} = useMouseInElement(ballRef);

const ballOffset = ref({ x: 0, y: 0 });
watchThrottled(
  () => [elementX, elementY],
  () => {
    ballOffset.value = pipe(
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
  },
  { throttle: 30, deep: true },
)

const ballStyle = computed<SVGAttributes>(() => {
  const style = props.style;

  const [rx, ry] = [
    Number(style.rx) / 2,
    Number(style.ry) / 2.5,
  ];

  const [cx, cy] = [
    Number(style.cx) + ballOffset.value.x,
    Number(style.cy) - ry + ballOffset.value.y,
  ];

  return {
    rx, ry, cx, cy
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
