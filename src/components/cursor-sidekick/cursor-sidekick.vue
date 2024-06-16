<template>
  <div class="container fixed left-0 top-0 w-0 h-0 ">
    <the-sidekick
      v-bind="sidekickProp"
      :style="sidekickStyle"
    />

    <sidekick-tooltip
      v-bind="tooltipProp"
      :style="tooltipStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, shallowRef, watch, watchEffect } from 'vue';
import { getVectorLength } from '../../common/utils';

import TheSidekick from './the-sidekick.vue';
import SidekickTooltip from './sidekick-tooltip.vue';

import {
  throttleFilter, useActiveElement,
  useElementBounding, useElementByPoint,
  useMouse, useRafFn, useTextSelection
} from '@vueuse/core';
import { isNullish } from 'remeda';

type SidekickProp = InstanceType<typeof TheSidekick>['$props'];
type TooltipProp = InstanceType<typeof SidekickTooltip>['$props'];

/**
 * 此元件負責控制人物移動與目標檢測，情緒和互動交給 the-sidekick 處理
 */

// #region Props
interface Props {
  /** 單位 px */
  size?: number;
  /** \# 前綴之 HEX 格式
   * @default '#515151'
   */
  color?: string;
  /** 最大速度。越慢小跟班越悠哉。單位 px/ms
   * @default 1
   */
  maxVelocity?: number;
  /**  @default 100 */
  zIndex?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  size: 48,
  color: '#515151',
  maxVelocity: 2,
  zIndex: 100,
});

// #region Emits
const emit = defineEmits<{
  // 
}>();
// #endregion Emits

const mouseInfo = useMouse({
  eventFilter: throttleFilter(15),
  type: 'client',
})

// 判斷目標元素或文字選取
const currentActiveElement = shallowRef<HTMLElement | null>()
const activeElement = useActiveElement();
watch(activeElement, (el) => {
  if (!isNullish(el?.getAttribute('data-sidekick-ignore'))) {
    return;
  }

  currentActiveElement.value = el;
})

const { element } = useElementByPoint(mouseInfo);
const selectionState = useTextSelection();

/** 是否為可編輯的元素 */
function isContentEditable(el?: HTMLElement | null) {
  if (el instanceof HTMLInputElement) {
    const inputTypes = ['text', 'number', 'email', 'password', 'search', 'tel', 'url'];
    return inputTypes.includes(el.type);
  }

  if (el instanceof HTMLTextAreaElement) {
    return true
  }

  if (['true', 'plaintext-only'].includes(el?.contentEditable ?? '')) {
    return true;
  }

  return false;
}
/** 是否為有效的元素。目前支援的元素為：
 * 
 * - 連結
 * - 內有 checkbox 的 label
 * - 內有 radio 的 label
 * - 內有 select 的 label
 * - button 或 role 為 button 的元素
 * 
 * 若加入 data-sidekick-ignore 屬性則忽略
 */
function isValidElement(el?: HTMLElement | null) {
  if (!isNullish(el?.getAttribute('data-sidekick-ignore'))) {
    return false;
  }

  // a 連結
  if (el instanceof HTMLLinkElement) {
    return true;
  }
  if (
    el instanceof HTMLButtonElement
    || el?.getAttribute('role') === 'button'
  ) {
    return true;
  }

  return false;
}

/** 目標 element */
const targetElement = computed(() => {
  if (isContentEditable(currentActiveElement.value)) {
    return currentActiveElement.value ?? undefined;
  }

  if (isValidElement(element.value)) {
    return element.value ?? undefined;
  }

  return undefined;
});
const targetElementBounding = useElementBounding(targetElement, {
  reset: false,
});
watchEffect(() => {
  // console.log('targetElement: ', targetElement.value);
})

// --- 人物基礎參數

/** 目前位置 */
const position = ref({ x: 0, y: 0 });
/** 一般狀態為 cursor 位置，所有目標則為目標位置 */
const targetPosition = computed(() => {
  if (targetElement.value) {
    // 移動至目標元素中心
    return {
      x: targetElementBounding.x.value + targetElementBounding.width.value / 2 - props.size / 2,
      y: targetElementBounding.y.value + targetElementBounding.height.value / 2 - props.size / 2,
    }
  }

  if (selectionState.text.value) {
    const rect = selectionState.rects.value[0];
    if (!rect) return {
      x: mouseInfo.x.value,
      y: mouseInfo.y.value,
    }

    return {
      x: rect.left + rect.width / 2 - props.size / 2,
      y: rect.top + rect.height / 2 - props.size / 2,
    }
  }

  return {
    x: mouseInfo.x.value,
    y: mouseInfo.y.value,
  }
});
watchEffect(() => {
  // console.log('targetPosition: ', targetPosition.value);
})

/** 位移 */
const displacement = ref(0);
/** 速率。px/ms */
const velocity = ref(0);
/** 最大速率。一般狀態下等於 props.maxVelocity，特殊事件則無限制 */
const maxVelocity = computed(() => {
  if (targetElement.value || selectionState.text.value) {
    return 100;
  }

  return props.maxVelocity;
});
/** 阻力，讓移動有加速度效果，特殊事件則無限制 */
const resistance = computed(() => {
  if (targetElement.value || selectionState.text.value) {
    return 5;
  }

  return 20;
});

// 更新位移與速率
useRafFn(({ delta: deltaTime }) => {
  const delta = {
    x: targetPosition.value.x - position.value.x,
    y: targetPosition.value.y - position.value.y,
  }

  const deltaPosition = {
    x: delta.x / resistance.value,
    y: delta.y / resistance.value,
  }
  if (Math.abs(deltaPosition.x) < 0.1 && Math.abs(deltaPosition.y) < 0.1) {
    displacement.value = 0;
    velocity.value = 0;
    return;
  }

  displacement.value = getVectorLength(deltaPosition);
  velocity.value = displacement.value / deltaTime;

  if (velocity.value > maxVelocity.value) {
    deltaPosition.x /= velocity.value / maxVelocity.value;
    deltaPosition.y /= velocity.value / maxVelocity.value;
  }

  position.value.x += deltaPosition.x;
  position.value.y += deltaPosition.y;
})

const sidekickStyle = computed<CSSProperties>(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px)`
}));

const sidekickProp = computed(() => {
  const result: SidekickProp = {
    size: props.size,
    color: props.color,
    velocity: velocity.value,
    position: {
      x: position.value.x,
      y: position.value.y,
    },
    cursorPosition: {
      x: mouseInfo.x.value,
      y: mouseInfo.y.value,
    },
    targetElement: targetElement.value,
    targetElementBounding,
    selectionState: {
      text: selectionState.text.value,
      rect: selectionState.rects.value[0],
    },
  }

  return result;
});

const tooltipStyle = computed<CSSProperties>(() => {
  const [x, y] = [
    targetElementBounding.x.value + targetElementBounding.width.value / 2,
    targetElementBounding.y.value + targetElementBounding.height.value / 2,
  ]

  return {
    transform: [
      `translateX(${x}px)`,
      `translateX(-50%)`,
      `translateY(${y}px)`,
      `translateY(-50%)`,
    ].join(' ')
  }
});

const tooltipProp = computed(() => {
  const result: TooltipProp = {
    targetElement: targetElement.value,
    targetElementBounding,
    selectionState: {
      text: selectionState.text.value,
      rect: selectionState.rects.value[0],
    },
  }

  return result;
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.container
  z-index: v-bind('props.zIndex')
</style>
