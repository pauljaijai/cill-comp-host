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
    /** 計算座標中心 */
    const [x, y] = [
      elementX.value - elementWidth.value / 2,
      elementY.value - elementHeight.value / 2,
    ]

    /** 限制最大值 */
    const maxX = elementWidth.value / 5;
    const maxY = elementHeight.value / 5;

    ballOffset.value = {
      x: clamp(x, { min: -maxX, max: maxX }),
      y: clamp(y, { min: -maxY, max: maxY }),
    }
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
