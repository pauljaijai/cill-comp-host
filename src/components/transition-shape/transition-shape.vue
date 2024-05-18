<template>
  <transition
    :appear="props.appear"
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
    :width="enterElBounding.width.value"
    :height="enterElBounding.height.value"
  />
</template>

<script setup lang="ts">
import { computed, CSSProperties, ref, TransitionProps } from 'vue';
import { find, pipe } from 'remeda';

import ShapeMask from './shape-mask.vue';

import { useElementBounding } from '@vueuse/core';

// #region Props
interface Props {
  appear?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  appear: false,
});

// #region Slots
const slots = defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots
// console.log(`🚀 ~ slots:`, slots.default?.());

const enterElRef = ref<HTMLElement>();
const enterElBounding = useElementBounding(enterElRef);
/* 切換元素時，需要獨立調整元素 **/
const enterElClassObject = ref({
  position: '',
  display: '',
});

const leaveElRef = ref<HTMLElement>();
const leaveElBounding = useElementBounding(leaveElRef);
const leaveElClassObject = ref({
  position: '',
  display: '',
});

const maskRef = ref<InstanceType<typeof ShapeMask>>();
const maskVisible = ref(true);
const maskStyle = computed<CSSProperties>(() => pipe(
  [enterElBounding, leaveElBounding],
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
  console.log(`🚀 ~ handleEnter: `);
  if (!(el instanceof HTMLElement)) {
    return done()
  }

  // appear 時，需要等待 mask 初始化完成
  await maskRef.value?.initFinished();

  await maskRef.value?.enter(el);
  el.style.opacity = '1';

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
  console.log(`🚀 ~ handleLeave: `);
  if (!(el instanceof HTMLElement)) {
    return done()
  }

  await maskRef.value?.enter(el);
  el.style.opacity = '0';

  await maskRef.value?.leave(el);

  done();
};
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  leaveElRef.value = undefined;
};



</script>

<style lang="sass">
.enter-el
  position: v-bind('enterElClassObject.position') !important
  display: v-bind('enterElClassObject.display') !important
.leave-el
  position: v-bind('leaveElClassObject.position') !important
  display: v-bind('leaveElClassObject.display') !important
</style>
