<template>
  <div
    ref="containerRef"
    :style="style"
  >
    <slot v-bind="scopeProp" />
  </div>
</template>

<script setup lang="ts">
import { useElementBounding, useIntervalFn } from '@vueuse/core'
import { computed, inject, onMounted, reactive, ref, useId, watch } from 'vue'
import { PROVIDE_KEY } from '.'

// #region Props
interface Props {
  /** 物體形狀，預設為 rectangle
   *
   * - rectangle：尺寸同 DOM 之長寬
   * - circle：取 DOM 長寬最大值為直徑
   */
  polygon?: 'rectangle' | 'circle';

  /** 空氣阻力。物體在空氣中受到的阻力 */
  frictionAir?: number;
  /** 摩擦力。物體本身的摩擦力，必須為 0 ~ 1，0 表示持續滑動，1 表示受力後會立即停止 */
  friction?: number;
  /** 回彈力。碰撞的回彈係數，0 表示不反彈，1 表示完全反彈 */
  restitution?: number;
  /** 物體質量 */
  mass?: number;
  /** 靜止。會變成像地面那樣完全靜止的存在 */
  isStatic?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  polygon: 'rectangle',
  frictionAir: 0.01,
  friction: 0.1,
  restitution: 0.3,
  mass: undefined,
  isStatic: false,
})

// #region Slots
defineSlots<{
  default?: (props: {
    width: number;
    height: number;
    /** X 偏移量 */
    offsetX: number;
    /** Y 偏移量 */
    offsetY: number;
    /** 旋轉量 */
    rotate: number;
  }) => unknown;
}>()
// #endregion Slots

const id = useId()
const wrapper = inject(PROVIDE_KEY)
if (!wrapper) {
  console.warn('wrapper-physics-body 必須在 wrapper-physics 元件中使用')
}

watch(() => props, () => {
  wrapper?.updateBody(id, props)
}, { deep: true })

const containerRef = ref<HTMLDivElement>()
const containerBounding = reactive(
  useElementBounding(containerRef),
)

const info = ref({
  offsetX: 0,
  offsetY: 0,
  rotate: 0,
})
/** 數字最小不能小於 0.0001 */
function adjAccuracy(value: number) {
  return Math.abs(value) < 0.0001 ? 0 : value
}

useIntervalFn(() => {
  const newInfo = wrapper?.getInfo(id)
  if (!newInfo) {
    info.value = {
      offsetX: adjAccuracy(info.value.offsetX - info.value.offsetX * 0.05),
      offsetY: adjAccuracy(info.value.offsetY - info.value.offsetY * 0.05),
      rotate: adjAccuracy(info.value.rotate - info.value.rotate * 0.05),
    }
    return
  }

  info.value = {
    offsetX: info.value.offsetX + (newInfo.offsetX - info.value.offsetX) * 0.8,
    offsetY: info.value.offsetY + (newInfo.offsetY - info.value.offsetY) * 0.8,
    rotate: info.value.rotate + (newInfo.rotate - info.value.rotate) * 0.8,
  }
}, 10)

const style = computed(() => {
  if (!wrapper) {
    return undefined
  }

  const {
    offsetX,
    offsetY,
    rotate,
  } = info.value

  return {
    transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
  }
})

function bindBody() {
  wrapper?.bindBody({
    id,
    width: containerBounding.width,
    height: containerBounding.height,
    x: containerBounding.x,
    y: containerBounding.y,
    initial: {
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
    },
    ...props,
  })
}

onMounted(() => {
  bindBody()
})

const scopeProp = computed(() => {
  return {
    ...info.value,
    width: containerBounding.width,
    height: containerBounding.height,
  }
})
</script>

<style scoped lang="sass">
</style>
