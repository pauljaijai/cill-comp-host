<template>
  <transition name="tooltip">
    <div
      v-if="hasTarget"
      class="tooltip-wrapper pointer-events-none select-none"
    >
      <div
        ref="tooltipRef"
        :style="tooltipStyle"
        class="tooltip pointer-events-auto"
      >
        <div class="flex flex-col gap-2 border rounded p-2">
          <base-btn
            v-for="(btn, i) in btnList"
            :key="i"
            :label="btn.label"
            data-sidekick-ignore
            class=" text-nowrap text-sm"
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

import { useClipboard, useElementBounding } from '@vueuse/core';
import { pipe } from 'remeda';

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

const tooltipRef = ref<HTMLDivElement>();
const tooltipBounding = useElementBounding(tooltipRef, {
  reset: false,
});

const gap = 10;
const tooltipStyle = computed<CSSProperties>(() => {
  const [x, y] = pipe(null,
    () => {
      if (props.selectionState?.text && props.selectionState.rect) {
        return {
          width: props.selectionState.rect.width,
          height: props.selectionState.rect.height,
        }
      }

      return {
        width: targetElementBounding.value.width.value,
        height: targetElementBounding.value.height.value,
      }
    },
    ({ width, height }) => {
      return [
        width / 2 + tooltipBounding.width.value / 2 + gap,
        0,
      ]
    }
  );

  return {
    transform: [
      `translateX(${x}px)`,
      `translateY(${y}px)`,
    ].join(' '),
  }
});

const hasTarget = computed(() => props.targetElement || props.selectionState?.text);

// --- 各類特殊功能
const clipboard = useClipboard()

const btnList = computed(() => {
  const result: BtnOption[] = [];

  if (clipboard.isSupported.value) {
    result.push({
      label: '📋 複製',
      onClick(param) {
        const { targetElement } = param;
        if (
          targetElement instanceof HTMLInputElement ||
          targetElement instanceof HTMLTextAreaElement
        ) {
          clipboard.copy(targetElement.value);
          targetElement.focus();
        }
      },
    });
  }

  result.push({
    label: '🧹 清空',
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
  });

  return result;
});


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
