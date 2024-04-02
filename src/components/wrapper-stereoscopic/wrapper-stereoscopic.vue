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
  useElementBounding, useIntervalFn, useMouse,
  useWindowScroll, watchThrottled
} from '@vueuse/core';
import { pipe } from 'remeda';

// #region Props
interface Props {
  /** 是否開啟 */
  enable?: boolean;
  /** x 最大偏轉角度 */
  xMaxAngle?: number;
  /** y 最大偏轉角度 */
  yMaxAngle?: number;
  /** 懸浮高度 */
  zOffset?: number;
}
// #endregion Props
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

const currentAngle = ref({ x: 0, y: 0 });
const targetAngle = ref({ x: 0, y: 0 });
watchThrottled(coordinate, ({ x, y }) => {
  if (!props.enable) return;

  const { xMaxAngle, yMaxAngle } = props;

  const yAngle = mapNumber(x, -200, 200, -xMaxAngle, xMaxAngle);
  const xAngle = mapNumber(y, -200, 200, -yMaxAngle, yMaxAngle);

  targetAngle.value = {
    x: xAngle,
    y: yAngle,
  };
}, { throttle: 15 });

const style = computed<CSSProperties>(() => ({
  transform: `rotateX(${currentAngle.value.x}deg) rotateY(${-currentAngle.value.y}deg)`,
}));
useIntervalFn(() => {
  const target = pipe(props.enable,
    (enable) => {
      if (!enable) return { x: 0, y: 0 };
      return targetAngle.value;
    },
  );

  currentAngle.value = {
    x: currentAngle.value.x + (target.x - currentAngle.value.x) * 0.2,
    y: currentAngle.value.y + (target.y - currentAngle.value.y) * 0.2,
  };
}, 15);


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
