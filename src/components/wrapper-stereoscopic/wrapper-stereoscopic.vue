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
export const PROVIDE_KEY = Symbol('wrapper-stereoscopic') as InjectionKey<ProvideContent>;

export interface ProvideContent {
  bindLayer: (layer: Layer) => void;
  unbindLayer: (id: string) => void;
  zOffset: ComputedRef<number>;
}

export interface Layer {
  id: string;
}
</script>


<script setup lang="ts">
import { computed, ComputedRef, CSSProperties, HTMLAttributes, InjectionKey, provide, ref, StyleValue, watch } from 'vue';
import { mapNumber } from '../../common/utils';

import {
  useElementBounding, useMouse,
  useWindowScroll, watchThrottled
} from '@vueuse/core';

interface Props {
  enable?: boolean;
  xMaxAngle?: number;
  yMaxAngle?: number;
  zOffset?: number;
}
const props = withDefaults(defineProps<Props>(), {
  enable: true,
  xMaxAngle: 15,
  yMaxAngle: 15,
  zOffset: 100,
});

const wrapper = ref();
const { x: elX, y: elY, width, height } = useElementBounding(wrapper);
const { x: mouseX, y: mouseY } = useMouse();
const { x: scrollX, y: scrollY } = useWindowScroll();

const mouse = computed(() => {
  const x = mouseX.value - scrollX.value;
  const y = mouseY.value - scrollY.value;

  return {
    x, y
  }
});

/** 計算滑鼠與物體的中心距離 */
const coordinate = computed(() => {
  const x = elX.value + width.value / 2 - mouse.value.x;
  const y = elY.value + height.value / 2 - mouse.value.y;

  return {
    x, y
  }
});

const style = ref<CSSProperties>({
  transform: `rotateX(0deg) rotateY(0deg)`,
  transitionDuration: undefined,
});
watch(() => props.enable, (value) => {
  if (value) {
    style.value.transitionDuration = undefined;
  } else {
    style.value.transitionDuration = '0.4s';
  }
  style.value.transform = `rotateX(0deg) rotateY(0deg)`;
});
watchThrottled(coordinate, ({ x, y }) => {
  if (!props.enable) return;

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
  zOffset: computed(() => props.zOffset),
});
</script>

<style scoped lang="sass">
.wrapper-stereoscopic
  transform-style: preserve-3d
  transform-origin: 50% 50% -50px
</style>
