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
            class="tooltip-content flex flex-col gap-2 border rounded p-2 max-w-[90vw] min-w-[10rem]"
            :class="tooltipContent.class"
            data-sidekick-ignore
          >
            <div
              v-if="tooltipContent.text"
              class=" text-base text-center"
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
                v-for="btn in tooltipContent.btnList"
                :key="btn.label"
                :label="btn.label"
                data-sidekick-ignore
                class=" text-nowrap text-sm "
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
import { CSSProperties, computed, ref } from 'vue';
import { nanoid } from 'nanoid';
import { filter, isTruthy, join, pipe } from 'remeda';

import BaseBtn from '../base-btn.vue';

import {
  useCycleList, useElementBounding, useIntersectionObserver,
  useMousePressed, whenever
} from '@vueuse/core';
import { useContentProvider } from './use-content-provider';

type Position = 'top' | 'bottom' | 'left' | 'right'

// #region Props
interface Props {
  targetElement?: {
    value: HTMLElement,
    bounding: ReturnType<typeof useElementBounding>;
  };
  activeElement?: {
    value: HTMLElement,
    bounding: ReturnType<typeof useElementBounding>;
  };
  hoverElement?: {
    value: HTMLElement,
    bounding: ReturnType<typeof useElementBounding>;
  };
  /** 已選取文字 */
  selectionState?: {
    rect: DOMRect;
    text: string;
  };
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  targetElement: undefined,
  activeElement: undefined,
  hoverElement: undefined,
  selectionState: undefined,
});

const { pressed: mousePressed } = useMousePressed()

const targetElementBounding = computed(() => props.targetElement?.bounding);

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
      if (targetElementBounding.value) {
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
  // 按住且有選取文字時，不顯示 tooltip
  if (mousePressed.value && props.selectionState?.text) {
    return false;
  }

  return props.targetElement || props.selectionState?.text;
});
/** 為每一個目標產生專屬的 key */
const key = computed(() => {
  if (props.targetElement) {
    return [
      props.targetElement.value.id,
      props.targetElement.value.className,
      props.targetElement.value.tagName,
      props.targetElement.value.textContent,
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

const {
  activeContentProviders,
  hoverContentProviders,
  selectContentProviders,
} = useContentProvider();

/** 優先順序為：active、hover、select */
const tooltipContent = computed(() => {
  const provider = pipe(null,
    () => {
      const {
        activeElement, hoverElement, selectionState,
      } = props;

      if (activeElement) {
        return activeContentProviders.find(({ match }) => match(activeElement.value));
      }

      if (hoverElement) {
        return hoverContentProviders.find(({ match }) => match(hoverElement.value));
      }

      if (selectionState?.text) {
        return selectContentProviders.find(({ match }) => match(selectionState));
      }
    }
  );
  if (!provider) return;

  return provider.getContent({
    element: props.targetElement,
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
