<template>
  <div
    ref="wrapperRef"
    class=" relative"
  >
    <cat-ear
      class="ear absolute top-0 right-0 -z-10"
      :style="leftEarStyle"
    />
    <cat-ear
      class="ear right absolute top-0 left-0 -z-10"
      :style="rightEarStyle"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, CSSProperties } from 'vue';

import CatEar from './cat-ear.vue';

import { useMouseInElement } from '@vueuse/core';

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

const wrapperRef = ref<HTMLDivElement>();
const {
  elementWidth: width,
  elementHeight: height,
} = useMouseInElement(wrapperRef);

const earWidth = computed(() => width.value / 4);

const leftEarStyle = computed<CSSProperties>(() => ({
  width: `${earWidth.value}px`,
  translate: `0% calc(-100% + ${earWidth.value / 2}px)`,
}));
const rightEarStyle = computed<CSSProperties>(() => ({
  width: `${earWidth.value}px`,
  translate: `0% calc(-100% + ${earWidth.value / 2}px)`,
}));

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.ear
  transform-origin: 50% 80%
  &.right
    scale: -1 1

</style>
