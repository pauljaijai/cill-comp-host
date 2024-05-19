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
    class=" fixed"
    :style="maskStyle"
    :type="props.type"
    :width="enterElBounding.width.value"
    :height="enterElBounding.height.value"
  />
</template>

<script lang="ts">
export * from './type';
</script>

<script setup lang="ts">
import { computed, CSSProperties, nextTick, ref, TransitionProps } from 'vue';
import { find, pipe } from 'remeda';
import { TransitionType } from './type';

import ShapeMask from './shape-mask.vue';

import { useElementBounding } from '@vueuse/core';

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
    colors: ['#EEF4FB', '#A5A9AD', '#84888B'],
  }),
});

// #region Emits
const emit = defineEmits<{
  (e: 'before-transition'): void;
  (e: 'after-transition'): void;
}>();
// #endregion Emits

// #region Slots
const slots = defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots


const enterElRef = ref<HTMLElement>();
const enterElBounding = useElementBounding(enterElRef);

const leaveElRef = ref<HTMLElement>();
const leaveElBounding = useElementBounding(leaveElRef);

const maskRef = ref<InstanceType<typeof ShapeMask>>();
const maskVisible = ref(true);
const maskStyle = computed<CSSProperties>(() => pipe(
  [leaveElBounding, enterElBounding],
  find(({ width }) => width.value > 0),
  (bounding) => ({
    top: `${bounding?.top.value}px`,
    left: `${bounding?.left.value}px`,
    width: `${bounding?.width.value}px`,
    height: `${bounding?.height.value}px`,
    opacity: maskVisible.value ? 1 : 0,
  })
));

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

  // 如果有 leaveElRef，表示為切換動畫
  if (leaveElRef.value) {
    // 將 enterEl 先脫離佔位
    el.style.position = 'fixed';
  }

  // appear 時，需要等待 mask 初始化完成
  await maskRef.value?.initFinished();

  await maskRef.value?.enter(el);

  el.style.opacity = '1';
  if (leaveElRef.value) {
    el.style.position = '';
    // 提早移除 leaveEl 以免影響定位
    leaveElRef.value = undefined;
  }

  await maskRef.value?.leave(el);

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

  await maskRef.value?.enter(el);

  el.style.opacity = '0';
  // 如果有 enterElRef，表示為切換動畫
  if (enterElRef.value) {
    // 將 leaveEl 脫離佔位
    el.style.position = 'fixed';
  }

  await maskRef.value?.leave(el);

  done();
};
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  leaveElRef.value = undefined;
};



</script>

<style lang="sass">
</style>
