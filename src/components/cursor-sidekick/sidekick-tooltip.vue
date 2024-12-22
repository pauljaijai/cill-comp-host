<template>
  <transition name="tooltip-opacity">
    <div
      v-if="tooltipVisible"
      class="tooltip-container pointer-events-none select-none"
      data-sidekick-ignore
    >
      <div
        v-if="tooltipContent"
        ref="tooltipRef"
        class="tooltip pointer-events-auto p-2"
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
            class="tooltip-content max-w-[90vw] min-w-[10rem] flex flex-col gap-2 border rounded p-2"
            :class="tooltipContent.class"
            data-sidekick-ignore
          >
            <div
              v-if="tooltipContent.text"
              class="text-center text-base"
              data-sidekick-ignore
              v-html="tooltipContent.text"
            />

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
                class="text-nowrap text-sm"
                @click="btn.onClick"
              />
            </div>

            <div
              v-if="tooltipContent.preview"
              class="flex flex-col gap-2"
              data-sidekick-ignore
            >
              <iframe
                v-bind="tooltipContent.preview"
                data-sidekick-ignore
                style="zoom: 0.6;"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ContentProvider } from './use-content-provider'
import {
  useCycleList,
  useElementBounding,
  useElementHover,
  useIntersectionObserver,
  useMousePressed,
} from '@vueuse/core'
import { nanoid } from 'nanoid'

import { filter, isTruthy, join, pipe } from 'remeda'

import { computed, ref } from 'vue'
import BaseBtn from '../base-btn.vue'
import { useContentProvider } from './use-content-provider'

type Position = 'top' | 'bottom' | 'left' | 'right'

// #region Props
interface Props {
  targetElement?: {
    value: HTMLElement;
    bounding: ReturnType<typeof useElementBounding>;
  };
  activeElement?: {
    value: HTMLElement;
    bounding: ReturnType<typeof useElementBounding>;
  };
  hoverElement?: {
    value: HTMLElement;
    bounding: ReturnType<typeof useElementBounding>;
  };
  /** 已選取文字 */
  selectionState?: {
    rect: DOMRect;
    text: string;
  };

  /** 用於 active element 的 Provider。
   *
   * 通常用於可點擊或 focus 的元素。
   */
  activeProviders?: ContentProvider[];

  /** 用於 hover element 的 Provider
   *
   * 只要 hover 到符合條件的元素，即會觸發。
   */
  hoverProviders?: ContentProvider[];

  /** 用於判斷選取文字的 Provider  */
  selectProviders?: ContentProvider[];
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  targetElement: undefined,
  activeElement: undefined,
  hoverElement: undefined,
  selectionState: undefined,

  activeProviders: () => [],
  hoverProviders: () => [],
  selectProviders: () => [],
})

const {
  state: currentPosition,
  next: nextPosition,
  go: setPositionByIndex,
} = useCycleList<Position>([
  'right',
  'left',
  'top',
  'bottom',
])

const targetElementBounding = computed(() => props.targetElement?.bounding)

const tooltipRef = ref<HTMLDivElement>()
const tooltipBounding = useElementBounding(tooltipRef, {
  reset: false,
})
/** 偵測 tooltip 內容可見性 */
const tooltipContentRef = ref<HTMLDivElement>()
useIntersectionObserver(
  tooltipContentRef,
  (data) => {
    if (!data[0])
      return

    const { isIntersecting } = data[0]
    // console.log(`🚀 ~ useIntersectionObserver:`, isIntersecting);

    if (!isIntersecting) {
      nextPosition?.()
    }
  },
  { threshold: 0.98 },
)

const { pressed: mousePressed } = useMousePressed()
const isContentHovered = useElementHover(tooltipContentRef)

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

const tooltipStyle = computed<CSSProperties>(() => {
  const [x, y] = pipe(null, () => {
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
  }, positionProviderMap[currentPosition.value])

  return {
    transform: [
      `translateX(${x}px)`,
      `translateY(${y}px)`,
    ].join(' '),
  }
})

const tooltipVisible = computed(() => {
  if (isContentHovered.value) {
    return true
  }

  // 按住且有選取文字時，不顯示 tooltip
  if (mousePressed.value && props.selectionState?.text) {
    return false
  }

  return props.targetElement || props.selectionState?.text
})
/** 為每一個目標產生專屬的 key */
const key = computed(() => {
  if (props.targetElement) {
    return [
      props.targetElement.value.id,
      props.targetElement.value.className,
      props.targetElement.value.tagName,
      props.targetElement.value.textContent,
    ].join('-')
  }

  if (props.selectionState?.text) {
    const rect = props.selectionState.rect
    return pipe(
      [
        props.selectionState?.text,
        rect?.width,
        rect?.height,
        rect?.x,
        rect?.y,
      ],
      filter(isTruthy),
      join('-'),
    )
  }

  return nanoid()
})
/** 目標發生變化時，將 position 重設 */
// watch(key, () => {
//   setPositionByIndex(0);
// })

const {
  activeContentProviders,
  hoverContentProviders,
  selectContentProviders,
} = useContentProvider({
  activeList: props.activeProviders,
  hoverList: props.hoverProviders,
  selectList: props.selectProviders,
})

/** 優先順序為：active、hover、select */
const tooltipContent = computed(() => {
  const provider = pipe(null, () => {
    const {
      activeElement,
      hoverElement,
      selectionState,
    } = props

    if (activeElement) {
      return activeContentProviders.value.find(
        ({ match }) => match(activeElement.value),
      )
    }

    if (hoverElement) {
      return hoverContentProviders.value.find(
        ({ match }) => match(hoverElement.value),
      )
    }

    if (selectionState?.text) {
      return selectContentProviders.value.find(
        ({ match }) => match(selectionState),
      )
    }
  })
  if (!provider)
    return

  return provider.getContent({
    element: props.targetElement,
    selectionState: props.selectionState,
  })
})
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
