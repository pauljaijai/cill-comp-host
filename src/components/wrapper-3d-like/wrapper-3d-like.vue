<template>
  <div
    ref="wrapper"
    :style="style"
    class="wrapper-3d-like"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { mapNumber } from '@/common/utils';

import { useElementBounding, useMouse, watchThrottled } from '@vueuse/core';

interface Props {
  xMaxAngle?: number;
  yMaxAngle?: number;
}
const props = withDefaults(defineProps<Props>(), {
  xMaxAngle: 15,
  yMaxAngle: 15,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const wrapper = ref();
const { x: elX, y: elY, width, height } = useElementBounding(wrapper);
const mouse = useMouse();

/** 計算滑鼠與物體的中心距離 */
const coordinate = computed(() => {
  const x = elX.value + width.value / 2 - mouse.x.value;
  const y = elY.value + height.value / 2 - mouse.y.value;

  return {
    x, y
  }
});

const style = ref({
  transform: `rotateX(0deg) rotateY(0deg)`,
});

watchThrottled(coordinate, ({ x, y }) => {
  const { xMaxAngle, yMaxAngle } = props;

  const yAngle = mapNumber(x, -200, 200, -xMaxAngle, xMaxAngle);
  const xAngle = mapNumber(y, -200, 200, -yMaxAngle, yMaxAngle);

  style.value.transform = `rotateX(${xAngle}deg) rotateY(${-yAngle}deg)`;
},
  { throttle: 15 },
)
</script>

<style scoped lang="sass">
.wrapper-3d-like
  transform-style: 3d
</style>
