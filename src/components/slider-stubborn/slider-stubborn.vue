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
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup lang="ts">
import {
  reactiveComputed,
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
interface Props {
  modelValue: number;
  disabled?: boolean;
  /** 小於此數值也會有 disabled 效果 */
  minDisabled?: number;
  /** 大於此數值也會有 disabled 效果 */
  maxDisabled?: number;
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

const disabledRange = reactiveComputed(() => {
  const { minDisabled, maxDisabled } = props

  return {
    min: minDisabled ?? props.min,
    max: maxDisabled ?? props.max,
  }
})

/** 拉動方向 */
const draggingDirection = computed(() => {
  if (mouseRatio.value > ratio.value) {
    return 1
  }

  return -1
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
  const rawValue = min + (ratio / 100) * (max - min)
  return Math.round(rawValue / step) * step
}

const disabledValue = ref(false)
const isDisabled = computed(() => props.disabled || disabledValue.value)

watch([mouseRatio, isHeld], () => {
  if (!isHeld.value || props.disabled)
    return

  const targetValue = getValue(mouseRatio.value)
  let currentValue = modelValue.value

  if (targetValue === currentValue)
    return

  const direction = draggingDirection.value
  const step = props.step * direction

  while (true) {
    if (
      (direction === -1 && currentValue < disabledRange.min)
      || (direction === 1 && currentValue > disabledRange.max)
    ) {
      disabledValue.value = true
      return
    }

    modelValue.value = fixed(currentValue)
    disabledValue.value = false

    if (
      (direction === 1 && currentValue >= targetValue)
      || (direction === -1 && currentValue <= targetValue)
    ) {
      return
    }

    currentValue += step
  }
}, { deep: true })
</script>

<style scoped lang="sass">
.track
  height: 8px
</style>

<style lang="sass">
.grabbing *
  cursor: grabbing !important
</style>
