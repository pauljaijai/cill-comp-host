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
</script>

<script setup lang="ts">
import type {
  CSSProperties,
  StyleValue,
} from 'vue'
import {
  reactiveComputed,
  throttleFilter,
  useIntersectionObserver,
  useIntervalFn,
  useMouseInElement,
  watchThrottled,
} from '@vueuse/core'

import {
  computed,
  provide,
  ref,
} from 'vue'
import { type Layer, PROVIDE_KEY } from '.'
import { mapNumber } from '../../common/utils'

// #region Props
interface StrategyParams {
  enable: boolean;
  xMaxAngle: number;
  yMaxAngle: number;
  zOffset: number;
  /** 以元素中心為零點，目前滑鼠的座標 */
  mousePosition: Record<'x' | 'y', number>;
  /** 元素尺寸 */
  size: Record<'width' | 'height', number>;
  /** 滑鼠是否在元素外 */
  isOutside: boolean;
  /** 元素是否可見 */
  isVisible: boolean;
}

interface Props {
  /** 是否開啟 */
  enable?: boolean;
  /** x 最大偏轉角度 */
  xMaxAngle?: number;
  /** y 最大偏轉角度 */
  yMaxAngle?: number;
  /** 懸浮高度 */
  zOffset?: number;

  /** 旋轉、懸浮邏輯 */
  strategy?: (params: StrategyParams) => Record<'x' | 'y', number>;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  enable: true,
  xMaxAngle: 15,
  yMaxAngle: 15,
  zOffset: 100,

  strategy: (params: StrategyParams) => {
    if (!params.isVisible || !params.enable) {
      return {
        x: 0,
        y: 0,
      }
    }

    const { xMaxAngle, yMaxAngle, mousePosition } = params
    const { x, y } = mousePosition

    return {
      x: mapNumber(y, -200, 200, -yMaxAngle, yMaxAngle),
      y: mapNumber(x, -200, 200, -xMaxAngle, xMaxAngle),
    }
  },
})

const wrapperRef = ref()
const {
  elementX: mouseX,
  elementY: mouseY,
  elementWidth: width,
  elementHeight: height,
  isOutside,
} = useMouseInElement(wrapperRef, {
  eventFilter: throttleFilter(35),
})

const isVisible = ref(false)
useIntersectionObserver(
  wrapperRef,
  (value) => {
    isVisible.value = !!value[0]?.isIntersecting
  },
)

/** 計算滑鼠到與元素的中心距離 */
const mousePosition = reactiveComputed(() => {
  const x = width.value / 2 - mouseX.value
  const y = height.value / 2 - mouseY.value

  return {
    x,
    y,
  }
})

const currentAngle = ref({ x: 0, y: 0 })
const targetAngle = ref({ x: 0, y: 0 })
watchThrottled(mousePosition, ({ x, y }) => {
  targetAngle.value = props.strategy({
    ...props,
    mousePosition: { x, y },
    size: { width: width.value, height: height.value },
    isOutside: isOutside.value,
    isVisible: isVisible.value,
  })
}, { throttle: 15 })

const style = computed<CSSProperties>(() => ({
  transform: `rotateX(${currentAngle.value.x}deg) rotateY(${-currentAngle.value.y}deg)`,
}))
/** 利用誤差積分方式調整角度，保證所有動作都有動畫效果 */
useIntervalFn(() => {
  const target = targetAngle.value

  currentAngle.value = {
    x: currentAngle.value.x + (target.x - currentAngle.value.x) * 0.2,
    y: currentAngle.value.y + (target.y - currentAngle.value.y) * 0.2,
  }
}, 15)

const slotStyle = computed<StyleValue>(() => ({
  transformStyle: 'preserve-3d',
}))

/** 儲存 layer */
const componentMap = new Map<string, Layer>()

function bindLayer(item: Layer) {
  componentMap.set(item.id, item)
}
function unbindLayer(id: string) {
  componentMap.delete(id)
}
provide(PROVIDE_KEY, {
  bindLayer,
  unbindLayer,
  zOffset: computed(() => props.zOffset),
})
</script>

<style scoped lang="sass">
.wrapper-stereoscopic
  transform-style: preserve-3d
  transform-origin: 50% 50% -50px
</style>
