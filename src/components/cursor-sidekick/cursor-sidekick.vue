<template>
  <div class="container fixed left-0 top-0 w-0 h-0 ">
    <the-sidekick
      v-bind="sidekickProp"
      :style="style"
    />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watch, watchEffect } from 'vue';
import { throttleFilter, useActiveElement, useElementBounding, useElementByPoint, useMouse, useRafFn, useTextSelection } from '@vueuse/core';
import { getVectorLength } from '../../common/utils';
import { pipe, piped } from 'remeda';

import TheSidekick from './the-sidekick.vue';

type SidekickProp = InstanceType<typeof TheSidekick>['$props'];

/**
 * 此元件負責控制人物移動、尺寸與目標檢測與，情緒和互動交給 the-sidekick 處理
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
  /** 目標元素被包裹時，會被移至比此值更大值
   * @default 100
   */
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
const activeElement = useActiveElement();
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
/** 是否為有效的元素。以下為目前支援的元素：
 * 
 * - 連結
 * - 內有 checkbox 的 label
 * - 內有 radio 的 label
 * - 內有 select 的 label
 * - button 或 role 為 button 的元素
 */
function isValidElement(el?: HTMLElement | null) {
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
  if (isContentEditable(activeElement.value)) {
    return activeElement.value ?? undefined;
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
    return {
      x: targetElementBounding.x.value,
      y: targetElementBounding.y.value,
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
    return 4;
  }

  return 20;
});

// 計算位移與速率
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

const style = computed<CSSProperties>(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px)`
}));

const sidekickProp = computed(() => {
  const result: SidekickProp = {
    zIndex: props.zIndex,
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
    selectedText: selectionState.text.value,
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
