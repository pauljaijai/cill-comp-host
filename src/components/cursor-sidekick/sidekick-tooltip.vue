<template>
  <transition name="tooltip-opacity">
    <div
      v-if="tooltipVisible"
      class=" tooltip-container pointer-events-none select-none "
      data-sidekick-ignore
    >
      <div
        v-if="tooltipContent"
        ref="tooltipRef"
        class="tooltip p-2  pointer-events-auto"
        data-sidekick-ignore
        :style="tooltipStyle"
      >
        <transition
          name="tooltip"
          mode="out-in"
        >
          <div
            ref="tooltipContentRef"
            :key="key"
            class="tooltip-content flex flex-col gap-2 border rounded p-2 max-w-[90vw]"
            :class="tooltipContent.class"
            data-sidekick-ignore
          >
            <div
              v-if="tooltipContent.text"
              class=" text-base"
              data-sidekick-ignore
            >
              {{ tooltipContent.text }}
            </div>


            <div
              v-if="tooltipContent.btnList"
              class="flex flex-col gap-2"
              data-sidekick-ignore
            >
              <base-btn
                v-for="(btn, i) in tooltipContent.btnList"
                :key="i"
                :label="btn.label"
                data-sidekick-ignore
                class=" text-nowrap text-sm"
                @click="btn.onClick"
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
import { nanoid } from 'nanoid';
import { filter, isTruthy, join, pipe } from 'remeda';

import BaseBtn from '../base-btn.vue';

import { useCycleList, useElementBounding, useIntersectionObserver, useMousePressed, whenever } from '@vueuse/core';
import { useContentProvider } from './use-content-provider';

type Position = 'top' | 'bottom' | 'left' | 'right'

// #region Props
interface Props {
  /** 目標元素 */
  targetElement?: HTMLElement;
  targetElementBounding: ReturnType<typeof useElementBounding>;
  /** 已選取文字 */
  selectionState?: {
    rect: DOMRect;
    text: string;
  };
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  targetElement: undefined,
  selectionState: undefined,
});

// 按住滑鼠時不顯示 tooltip
const { pressed } = useMousePressed()

const targetElementBounding = computed(() => props.targetElementBounding);

const tooltipRef = ref<HTMLDivElement>();
const tooltipBounding = useElementBounding(tooltipRef, {
  reset: false,
});
/** 偵測 tooltip 內容可見性 */
const tooltipContentRef = ref<HTMLDivElement>();
useIntersectionObserver(
  tooltipContentRef,
  (data) => {
    if (!data[0]) return;

    const { isIntersecting } = data[0];
    // console.log(`🚀 ~ useIntersectionObserver:`, isIntersecting);

    if (!isIntersecting) {
      nextPosition?.();
    }
  },
  { threshold: 0.98 },
)

const positionProviderMap: Record<
  Position,
  (size: Record<'width' | 'height', number>) => [number, number]
> = {
  top: ({ height }) => [
    0,
    -(height / 2 + tooltipBounding.height.value / 2),
  ],
  bottom: ({ height }) => [
    0,
    height / 2 + tooltipBounding.height.value / 2,
  ],
  left: ({ width }) => [
    -(width / 2 + tooltipBounding.width.value / 2),
    0,
  ],
  right: ({ width }) => [
    width / 2 + tooltipBounding.width.value / 2,
    0,
  ],
}

const {
  state: currentPosition,
  next: nextPosition,
  go: setPositionByIndex,
} = useCycleList<Position>([
  'right', 'left', 'top', 'bottom'
])
/** 選取文字從 left 開始 */
whenever(() => props.selectionState, () => {
  setPositionByIndex(1);
}, { deep: true })


const tooltipStyle = computed<CSSProperties>(() => {
  const [x, y] = pipe(null,
    () => {
      if (props.targetElement) {
        return {
          width: targetElementBounding.value.width.value,
          height: targetElementBounding.value.height.value,
        }
      }

      if (props.selectionState?.text && props.selectionState.rect) {
        return {
          width: props.selectionState.rect.width,
          height: props.selectionState.rect.height,
        }
      }

      return {
        width: 0,
        height: 0,
      }
    },
    positionProviderMap[currentPosition.value],
  );

  return {
    transform: [
      `translateX(${x}px)`,
      `translateY(${y}px)`,
    ].join(' '),
  }
});

const tooltipVisible = computed(() => {
  if (pressed.value) {
    return false;
  }

  return props.targetElement || props.selectionState?.text;
});
/** 為每一個目標產生專屬的 key */
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
/** 目標發生變化時，將 position 重設 */
// watch(key, () => {
//   setPositionByIndex(0);
// })

const { contentProviders } = useContentProvider();

const tooltipContent = computed(() => {
  const target = props.targetElement ?? props.selectionState;
  if (!target) return;

  const provider = contentProviders.find(({ match }) => match(target));
  if (!provider) return;

  return provider.getContent({
    element: props.targetElement ? {
      value: props.targetElement,
      bounding: props.targetElementBounding,
    } : undefined,
    selectionState: props.selectionState,
  });
});


</script>

<style scoped lang="sass">
.tooltip-container
  position: absolute
  transition: transform 0s cubic-bezier(0.96, 0, 0.2, 1.15), opacity 0.4s
.tooltip
  transition: transform 0s cubic-bezier(0.96, 0, 0.2, 1.15)
.tooltip-content
  background: rgba(#EEE, 0.8)
  backdrop-filter: blur(1px)

.tooltip-opacity-enter-from, .tooltip-opacity-leave-to
  opacity: 0 !important

.tooltip-enter-active, .tooltip-leave-active
  transition-duration: 0.3s
.tooltip-enter-from, .tooltip-leave-to
  transform: scale(0.98) !important
  opacity: 0 !important
</style>
