<template>
  <transition name="tooltip">
    <div
      v-if="hasTarget"
      class="tooltip-wrapper pointer-events-none"
    >
      <div
        ref="tooltipRef"
        :style="tooltipStyle"
        class="tooltip pointer-events-auto"
      >
        <div class="flex flex-col border rounded p-2">
          <base-btn
            v-for="(btn, i) in btnList"
            :key="i"
            :label="btn.label"
            data-sidekick-ignore
            class=" text-nowrap"
            @click="btn.onClick(props)"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watch } from 'vue';

import BaseBtn from '../base-btn.vue';

import { useElementBounding } from '@vueuse/core';

interface BtnOption {
  label: string;
  onClick: (param: Props) => void;
}

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

const btnList = computed<BtnOption[]>(() => {
  return [
    {
      label: '清空',
      onClick(param) {
        const { targetElement } = param;
        if (
          targetElement instanceof HTMLInputElement ||
          targetElement instanceof HTMLTextAreaElement
        ) {
          targetElement.value = '';
          targetElement.focus();
        }
      },
    },
  ]
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
.tooltip-wrapper
  position: absolute
  transition: transform 0.6s cubic-bezier(0.96, 0, 0.2, 1.15), opacity 0.6s
  opacity: 1
  
.tooltip
  background: rgba(white, 0.2)
  backdrop-filter: blur(5px)
  transition: transform 0.6s cubic-bezier(0.96, 0, 0.2, 1.15)

.tooltip-enter-from, .tooltip-leave-to
  opacity: 0 !important
</style>
