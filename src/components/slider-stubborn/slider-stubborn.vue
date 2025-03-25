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
import { clamp, pick, pipe } from 'remeda'
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

const disabledValue = computed(() => {
  if (typeof props.disabled === 'function') {
    return props.disabled({
      ...pick(props, ['min', 'max']),
      value: modelValue.value,
      direction: mouseRatio.value > ratio.value ? 'increase' : 'decrease',
    })
  }

  return props.disabled
})

function getValue(ratio: number) {
  return Math.round(
    (ratio / 100) * (props.max - props.min) / props.step,
  ) * props.step
}

watch(() => [mouseRatio, isHeld], () => {
  if (typeof props.disabled === 'function') {
    return
  }

  if (props.disabled || !isHeld.value)
    return

  modelValue.value = getValue(mouseRatio.value)
}, {
  deep: true,
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
