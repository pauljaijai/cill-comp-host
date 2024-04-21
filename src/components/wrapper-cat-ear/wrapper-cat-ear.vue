<template>
  <div
    ref="wrapperRef"
    class=" relative"
  >
    <ear-left
      class="absolute top-0 right-0 -z-10"
      :style="leftEarStyle"
    />
    <ear-right
      class="right-ear absolute top-0 left-0 -z-10"
      :style="rightEarStyle"
    />
    <slot />
  </div>
</template>

<script lang="ts">
export enum EmotionName {
  RELAXED = 'relaxed',
  DISPLEASED = 'displeased',
}
</script>

<script setup lang="ts">
import { computed, ref, CSSProperties } from 'vue';

import EarLeft from './cat-ear-left.vue';
import EarRight from './cat-ear-right.vue';

import { useMouseInElement, useVModel } from '@vueuse/core';

// #region Props
interface Props {
  emotion?: `${EmotionName}`;
  color?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  emotion: 'relaxed',
  color: '#CECECE',
});

// #region Emits
const emit = defineEmits<{
  'update:emotion': [value: Props['emotion']];
}>();
// #endregion Emits

const emotion = useVModel(props, 'emotion', emit);

const wrapperRef = ref<HTMLDivElement>();
const {
  elementWidth: width,
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
</style>
