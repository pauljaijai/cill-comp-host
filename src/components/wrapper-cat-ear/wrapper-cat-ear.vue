<template>
  <div
    ref="wrapperRef"
    class=" relative"
  >
    <ear-left
      class="absolute top-0 right-0 -z-10"
      :style="leftEarStyle"
      v-bind="props"
    />
    <ear-right
      class="right-ear absolute top-0 left-0 -z-10"
      :style="rightEarStyle"
      v-bind="props"
    />
    <slot />
  </div>
</template>

<script lang="ts">
export enum ActionName {
  PEEKABOO = 'peekaboo',
  RELAXED = 'relaxed',
  FEAR = 'fear',
  DISPLEASED = 'displeased',
  SHAKE = 'shake',
}
</script>

<script setup lang="ts">
import { computed, ref, CSSProperties } from 'vue';

import EarLeft from './cat-ear-left.vue';
import EarRight from './cat-ear-right.vue';

import { useMouseInElement } from '@vueuse/core';

// #region Props
interface Props {
  action?: `${ActionName}`;
  mainColor?: string;
  innerColor?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  action: 'relaxed',
  mainColor: '#E7E7E7',
  innerColor: '#fcfcfc',
});

// #region Emits
const emit = defineEmits<{
  'update:action': [value: Props['action']];
}>();
// #endregion Emits

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
