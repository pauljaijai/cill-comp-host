<template>
  <div
    ref="sliderRef"
    class="slider-stubborn relative py-3 cursor-grab"
    @mousedown="(e) => e.preventDefault()"
    @mousemove="(e) => e.preventDefault()"
    @touchstart="(e) => e.preventDefault()"
    @touchmove="(e) => e.preventDefault()"
  >
    <div
      class="track rounded-full "
      :class="props.trackClass"
    />

    <slider-thumb
      v-bind="props"
      :is-held="isHeld"
      :ratio="ratio"
      :mouse-ratio="mouseRatio"
    />
  </div>
</template>

<script setup lang="ts">
import { throttleFilter, useMouseInElement, useMousePressed, useVModel } from '@vueuse/core';
import { clamp, pipe } from 'remeda';
import { computed, reactive, ref, watch } from 'vue';

import SliderThumb from './slider-stubborn-thumb.vue'

// #region Props
interface Props {
  modelValue: number;
  disabled?: boolean;
  min?: number;
  max?: number;
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
  maxThumbLength: 200,
  thumbSize: 20,
  thumbColor: '#34c6eb',
  trackClass: ' bg-[#EEE]',
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

const modelValue = useVModel(props, 'modelValue', emit);

const isHeld = ref(false);
/** 切換滑鼠圖標 */
watch(isHeld, (value) => {
  if (value) {
    document.body.classList.add('grabbing')
  } else {
    document.body.classList.remove('grabbing')
  }
})

const { pressed } = useMousePressed()
watch(pressed, (isPressed) => {
  if (!mouseInSlider.isOutside && isPressed) {
    isHeld.value = true;
  }

  if (!isPressed) {
    isHeld.value = false;
  }
})

const sliderRef = ref<HTMLDivElement>();
const mouseInSlider = reactive(useMouseInElement(
  sliderRef, { eventFilter: throttleFilter(16) }
));

const ratio = computed(() => pipe(
  modelValue.value / (props.max - props.min) * 100,
  clamp({ min: 0, max: 100 }),
));
const mouseRatio = computed(() => pipe(
  mouseInSlider.elementX / mouseInSlider.elementWidth * 100,
  clamp({ min: 0, max: 100 }),
));

watch(() => [mouseRatio, isHeld], () => {
  if (props.disabled || !isHeld.value) return;

  modelValue.value = (props.max - props.min) * mouseRatio.value / 100;
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
