<template>
  <div
    ref="wrapper"
    :style="style"
    class="wrapper-stereoscopic"
  >
    <slot :style="slotStyle" />
  </div>
</template>

<script lang="ts">
export const PROVIDE_KEY = 'wrapper-stereoscopic';

export interface ProvideContent {
  bindLayer: (layer: Layer) => void;
  unbindLayer: (id: string) => void;
  zOffset: number;
}

export interface Layer {
  id: string;
}
</script>


<script setup lang="ts">
import { computed, provide, ref, StyleValue } from 'vue';
import { mapNumber } from '@/common/utils';

import { useElementBounding, useMouse, watchThrottled } from '@vueuse/core';
import { nanoid } from 'nanoid';

interface Props {
  xMaxAngle?: number;
  yMaxAngle?: number;
  zOffset?: number;
}
const props = withDefaults(defineProps<Props>(), {
  xMaxAngle: 15,
  yMaxAngle: 15,
  zOffset: 100,
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
}, { throttle: 15 });

const slotStyle = computed<StyleValue>(() => ({
  transformStyle: 'preserve-3d',
}));

const componentMap = new Map<string, Layer>();

function bindLayer(item: Layer) {
  componentMap.set(item.id, item);
}
function unbindLayer(id: string) {
  componentMap.delete(id);
}
provide(PROVIDE_KEY, {
  bindLayer,
  unbindLayer,
  zOffset: props.zOffset,
});
</script>

<style scoped lang="sass">
.wrapper-stereoscopic
  transform-style: preserve-3d
</style>
