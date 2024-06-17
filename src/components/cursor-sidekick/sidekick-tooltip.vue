<template>
  <transition name="tooltip-opacity">
    <div
      v-if="hasTarget"
      class=" tooltip-container pointer-events-none select-none "
      data-sidekick-ignore
    >
      <div
        ref="tooltipRef"
        class="tooltip border rounded p-2 duration-500 pointer-events-auto"
        data-sidekick-ignore
        :style="tooltipStyle"
      >
        <transition
          name="tooltip"
          mode="out-in"
        >
          <div
            :key="key"
            class=""
            data-sidekick-ignore
          >
            <div
              class="flex flex-col gap-2"
              data-sidekick-ignore
            >
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
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watch, watchEffect } from 'vue';

import BaseBtn from '../base-btn.vue';

import { useClipboard, useElementBounding } from '@vueuse/core';
import { filter, isTruthy, join, pipe } from 'remeda';
import { nanoid } from 'nanoid';

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

const gap = 0;
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
const key = computed(() => {
  if (props.targetElement) {
    return [
      props.targetElement.id,
      props.targetElement.className,
      props.targetElement.tagName,
      props.targetElement.textContent,
    ].join('-');
  }

  if (props.selectionState?.text) {
    const rect = props.selectionState.rect;
    return pipe(
      [
        props.selectionState?.text,
        rect?.width, rect?.height,
        rect?.x, rect?.y,
      ],
      filter(isTruthy),
      join('-'),
    );
  }

  return nanoid()
});

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
        // 觸發 input 事件
        const event = new Event('input', {
          bubbles: true,
          cancelable: false
        });
        targetElement.dispatchEvent(event);

        targetElement.focus();
      }
    },
  });

  return result;
});


</script>

<style scoped lang="sass">
.tooltip-container
  position: absolute
  transition: transform 0.6s cubic-bezier(0.96, 0, 0.2, 1.15), opacity 0.4s

.tooltip
  background: rgba(white, 0.2)
  backdrop-filter: blur(5px)
  transition: transform 0.6s cubic-bezier(0.96, 0, 0.2, 1.15)

.tooltip-opacity-enter-from, .tooltip-opacity-leave-to
  opacity: 0 !important

.tooltip-enter-active, .tooltip-leave-active
  transition-duration: 0.4s
.tooltip-enter-from, .tooltip-leave-to
  transform: scale(0.98) !important
  opacity: 0 !important
</style>
