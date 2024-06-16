<template>
  <div class="absolute">
    <div
      ref="tooltipRef"
      :style="tooltipStyle"
    >
      <div class="flex flex-col border rounded p-2">
        安安
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watch } from 'vue';
import { mapNumber } from '../../common/utils';
import anime from 'animejs';
import { pipe } from 'remeda';

import { useElementBounding, useParentElement } from '@vueuse/core';

// #region Props
interface Props {
  /** 目標元素 */
  targetElement?: HTMLElement;
  targetElementBounding: ReturnType<typeof useElementBounding>;
  /** 已選取文字 */
  selectionState?: {
    rect?: DOMRect;
    text: string;
  };
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  targetElement: undefined,
  selectionState: undefined,
});

const targetElementBounding = computed(() => props.targetElementBounding);

watch(() => props.targetElement, (el) => {
})
watch(() => props.selectionState?.text, () => {
})

const hasTarget = computed(() => props.targetElement || props.selectionState?.text);

const btnList = computed(() => {
  return {}
});

const tooltipRef = ref<HTMLDivElement>();
const tooltipBounding = useElementBounding(tooltipRef, {
  reset: false,
});

const gap = 10;
const tooltipStyle = computed<CSSProperties>(() => {
  const { width, height } = targetElementBounding.value;

  const [x, y] = [
    width.value / 2 + tooltipBounding.width.value / 2 + gap,
    0,
  ]

  return {
    transform: [
      `translateX(${x}px)`,
      `translateY(${y}px)`,
    ].join(' '),
  }
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
