<template>
  <div
    ref="sliderRef"
    class="slider-stubborn relative cursor-grab py-3"
    @mousedown="(e) => e.preventDefault()"
    @mousemove="(e) => e.preventDefault()"
    @touchstart="(e) => e.preventDefault()"
    @touchmove="(e) => e.preventDefault()"
  >
    <div
      class="track rounded-full"
      :class="props.trackClass"
    />

    <slider-thumb
      v-bind="props"
      :is-held="isHeld"
      :ratio="ratio"
      :mouse-ratio="mouseRatio"
      :slider-size="sliderSize"
      :disabled="disabledValue"
    />
  </div>
</template>

<script setup lang="ts">
import {
  throttleFilter,
  useElementSize,
  useMouseInElement,
  useMousePressed,
  useVModel,
} from '@vueuse/core'
import { clamp, pipe } from 'remeda'
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import SliderThumb from './slider-stubborn-thumb.vue'

// #region Props
export type DisabledCondition = (
  params: {
    value: number;
    min?: number;
    max?: number;
    direction: 'increase' | 'decrease';
  }
) => boolean

interface Props {
  modelValue: number;
  disabled?: boolean | DisabledCondition;
  min?: number;
  max?: number;
  step?: number;
  /** 握把被拉長的最大長度 */
  maxThumbLength?: number;
  thumbSize?: number;
  thumbColor?: string;
  trackClass?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  maxThumbLength: 200,
  thumbSize: 20,
  thumbColor: '#34c6eb',
  trackClass: ' bg-[#EEE]',
})

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>()
// #endregion Emits

const modelValue = useVModel(props, 'modelValue', emit)

const sliderRef = ref<HTMLDivElement>()
const mouseInSlider = reactive(useMouseInElement(
  sliderRef,
  { eventFilter: throttleFilter(15) },
))
const sliderSize = reactive(useElementSize(sliderRef))

const { pressed: isHeld } = useMousePressed({
  target: sliderRef,
})
/** 切換滑鼠圖標 */
watch(isHeld, (value) => {
  if (value) {
    document.body.classList.add('grabbing')
  }
  else {
    document.body.classList.remove('grabbing')
  }
})
onBeforeMount(() => {
  document.body.classList.remove('grabbing')
})

const ratio = computed(() => pipe(
  modelValue.value / (props.max - props.min) * 100,
  clamp({ min: 0, max: 100 }),
))
const mouseRatio = computed(() => pipe(
  mouseInSlider.elementX / mouseInSlider.elementWidth * 100,
  clamp({ min: 0, max: 100 }),
))

/** 拉動方向 */
const draggingDirection = computed(() => {
  if (mouseRatio.value > ratio.value) {
    return 'increase'
  }

  return 'decrease'
})

const stepPrecision = computed(() => {
  const stepString = props.step.toString()
  if (stepString.includes('.')) {
    return stepString.split('.')[1]?.length ?? 0
  }
  return 0
})

function fixed(value: number) {
  return Number(value.toFixed(stepPrecision.value))
}

function getValue(ratio: number) {
  const { min, max, step } = props

  const range = max - min
  const rawValue = min + (ratio / 100) * range
  const steppedValue = Math.round(rawValue / step) * step

  return steppedValue
}

const disabledValue = ref(false)
watch(() => [mouseRatio, isHeld], () => {
  if (!isHeld.value)
    return

  if (typeof props.disabled === 'function') {
    // 根據目前的 mouseRatio 與 step 產生連續數值，並依序放入 disabled 函式中判斷是否禁用
    const targetValue = getValue(mouseRatio.value)
    if (targetValue === modelValue.value) {
      return
    }

    const isGt = targetValue > modelValue.value

    let currentValue = modelValue.value
    do {
      disabledValue.value = props.disabled({
        min: props.min,
        max: props.max,
        value: currentValue,
        direction: draggingDirection.value,
      })

      if (!disabledValue.value) {
        modelValue.value = fixed(currentValue)
      }

      currentValue += props.step * (draggingDirection.value === 'increase' ? 1 : -1)

      if (isGt && currentValue > targetValue) {
        return
      }
      else if (!isGt && currentValue < targetValue) {
        return
      }
    } while (true)
  }

  if (props.disabled)
    return

  modelValue.value = getValue(mouseRatio.value)
}, {
  deep: true,
  flush: 'post',
})
</script>

<style scoped lang="sass">
.track
  height: 8px
</style>

<style lang="sass">
.grabbing *
  cursor: grabbing !important
</style>
