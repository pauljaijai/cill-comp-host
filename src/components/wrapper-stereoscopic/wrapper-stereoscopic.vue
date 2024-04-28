<template>
  <div
    ref="wrapperRef"
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
import {
  computed, ComputedRef, CSSProperties,
  InjectionKey, provide, ref, StyleValue
} from 'vue';
import { mapNumber } from '../../common/utils';

import {
  throttleFilter,
  useIntersectionObserver, useIntervalFn,
  useMouseInElement,
  watchThrottled
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

const wrapperRef = ref();
const {
  elementX: mouseX, elementY: mouseY,
  elementWidth: width, elementHeight: height,
} = useMouseInElement(wrapperRef, {
  eventFilter: throttleFilter(35)
});

const isVisible = ref(false)
useIntersectionObserver(
  wrapperRef,
  (value) => {
    isVisible.value = !!value[0]?.isIntersecting
  },
)

/** 畫面外自動停用 */
const enable = computed(() => props.enable && isVisible.value);

/** 計算滑鼠到與物體的中心距離 */
const coordinate = computed(() => {
  const x = width.value / 2 - mouseX.value;
  const y = height.value / 2 - mouseY.value;

  return {
    x, y
  }
});

const currentAngle = ref({ x: 0, y: 0 });
const targetAngle = ref({ x: 0, y: 0 });
watchThrottled(coordinate, ({ x, y }) => {
  if (!enable.value) return;

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
/** 利用誤差積分方式調整角度，保證所有動作都有動畫效果 */
useIntervalFn(() => {
  const target = pipe(enable.value,
    (value) => {
      if (!value) return { x: 0, y: 0 };
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

/** 儲存 layer */
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
