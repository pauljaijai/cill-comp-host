<template>
  <transition
    appear
    :css="false"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
  >
    <slot />
  </transition>

  <shape-mask
    ref="maskRef"
    class="shape-mask fixed"
    :style="maskStyle"
    :type="props.type"
    :width="currentBounding?.width.value"
    :height="currentBounding?.height.value"
    @init="() => emit('init')"
    @before-transition="() => emit('before-transition')"
    @after-transition="() => emit('after-transition')"
  />
</template>

<script lang="ts">
export * from './type';
</script>

<script setup lang="ts">
import {
  computed, CSSProperties,
  nextTick, ref, TransitionProps
} from 'vue';
import { find, pipe } from 'remeda';
import { TransitionType } from './type';

import ShapeMask from './shape-mask.vue';

import { promiseTimeout, useElementBounding } from '@vueuse/core';

// #region Props
interface Props {
  // appear?: boolean;
  type?: TransitionType;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  // appear: false,
  type: () => ({
    name: 'rect',
    enter: {
      action: 'slide-right',
      delay: 100,
      duration: 1000,
      easing: 'easeInOutExpo',
    },
    leave: {
      action: 'slide-right',
      delay: 100,
      duration: 1000,
      easing: 'easeInOutExpo',
    },
    colors: ['#A5A9AD', '#84888B', '#5D6164'],
  }),
});

// #region Emits
const emit = defineEmits<{
  (e: 'init'): void;
  (e: 'before-transition'): void;
  (e: 'after-transition'): void;
}>();
// #endregion Emits

// #region Slots
const slots = defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

/** 當新舊元素尺寸不同時，會導致 mask 尺寸變化。
 * 
 * 為了防止視覺跳動，使用 CSS transition 過渡，所以 canvas 動畫也要有對應延遲。
 */
const SIZE_CHANGE_DELAY_SEC = 0.6;
const maskCssTransitionValue = computed(() => {
  return [
    `width ${SIZE_CHANGE_DELAY_SEC}s cubic-bezier(0.5, 0, 0, 1.2)`,
    `height ${SIZE_CHANGE_DELAY_SEC}s cubic-bezier(0.5, 0, 0, 1.2)`,
  ].join(', ')
});

const enterElRef = ref<HTMLElement>();
const enterElBounding = useElementBounding(enterElRef);

const leaveElRef = ref<HTMLElement>();
const leaveElBounding = useElementBounding(leaveElRef);

const currentBounding = computed(() => pipe(
  [leaveElBounding, enterElBounding],
  find(({ width }) => width.value > 0),
));

const maskRef = ref<InstanceType<typeof ShapeMask>>();
const maskVisible = ref(true);

const maskStyle = computed<CSSProperties>(() => pipe(
  currentBounding.value,
  (bounding) => ({
    top: `${bounding?.top.value}px`,
    left: `${bounding?.left.value}px`,
    width: `${bounding?.width.value}px`,
    height: `${bounding?.height.value}px`,
    opacity: maskVisible.value ? 1 : 0,
  })
));

function isSizeChanged(aBounding?: DOMRect, bBounding?: DOMRect) {
  if (!aBounding || !bBounding) {
    return false;
  }

  return aBounding.width !== bBounding.width
    || aBounding.height !== bBounding.height;
}

// 進入事件
const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => {
  if (!(el instanceof HTMLElement)) return;
  el.style.opacity = '0';

  enterElRef.value = el;
}
const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
  // nextTick 才能同時取得 enterElRef 和 leaveElRef
  await nextTick();
  // console.log(`🚀 ~ handleEnter: `);

  if (!(el instanceof HTMLElement)) {
    return done()
  }

  const enterElBounding = el.getBoundingClientRect();
  const leaveElBounding = leaveElRef.value?.getBoundingClientRect();

  // 如果有 leaveElRef，表示為切換動畫
  if (leaveElRef.value) {
    // 將 enterEl 先脫離佔位
    el.style.position = 'fixed';
  }

  // appear 時，需要等待 mask 初始化完成
  await maskRef.value?.initFinished();

  await maskRef.value?.enter(enterElBounding);

  // 如果有 leaveElRef，表示為切換動畫
  if (leaveElRef.value) {
    el.style.position = '';
    // 提早移除 leaveEl 以免影響定位
    leaveElRef.value = undefined;

    if (isSizeChanged(leaveElBounding, enterElBounding)) {
      // 等待 canvas 尺寸變化，同 .shape-mask 定義的 transition-duration
      await promiseTimeout(SIZE_CHANGE_DELAY_SEC * 1000);
    }
  }
  el.style.opacity = '1';

  await maskRef.value?.leave(enterElBounding);

  done()
}
const handleAfterEnter: TransitionProps['onAfterEnter'] = (el) => {
  enterElRef.value = undefined;
};

// 離開事件
const handleBeforeLeave: TransitionProps['onBeforeLeave'] = (el) => {
  if (!(el instanceof HTMLElement)) return;
  leaveElRef.value = el;
};
const handleLeave: TransitionProps['onLeave'] = async (el, done) => {
  // nextTick 才能同時取得 enterElRef 和 leaveElRef
  await nextTick();
  // console.log(`🚀 ~ handleLeave: `);
  // console.log(`🚀 ~ enterElRef: `, enterElRef);
  // console.log(`🚀 ~ leaveElRef: `, leaveElRef);

  if (!(el instanceof HTMLElement)) {
    return done()
  }

  const enterElBounding = enterElRef.value?.getBoundingClientRect();
  const leaveElBounding = el.getBoundingClientRect();

  await maskRef.value?.enter(leaveElBounding);

  el.style.opacity = '0';
  // 如果有 enterElRef，表示為切換動畫
  if (enterElRef.value) {
    // 將 leaveEl 脫離佔位
    el.style.position = 'fixed';

    if (isSizeChanged(leaveElBounding, enterElBounding)) {
      await promiseTimeout(SIZE_CHANGE_DELAY_SEC * 1000);
    }
  }

  await maskRef.value?.leave(leaveElBounding);

  done();
};
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  leaveElRef.value = undefined;
};

</script>

<style lang="sass">
.shape-mask
  transition: v-bind(maskCssTransitionValue) !important
</style>
