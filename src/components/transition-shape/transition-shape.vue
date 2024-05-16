<template>
  <transition
    mode="out-in"
    :appear="props.appear"
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
    :width="elBounding.width.value"
    :height="elBounding.height.value"
    @init="handleInit()"
  />
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { computed, CSSProperties, ref, TransitionProps } from 'vue';

import ShapeMask from './shape-mask.vue';

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

const elRef = ref<HTMLElement>();
const elBounding = useElementBounding(elRef);

const maskRef = ref<InstanceType<typeof ShapeMask>>();
const maskVisible = ref(false);
const maskStyle = computed<CSSProperties>(() => ({
  top: `${elBounding.top.value}px`,
  left: `${elBounding.left.value}px`,
  width: `${elBounding.width.value}px`,
  height: `${elBounding.height.value}px`,
  opacity: maskVisible.value ? 1 : 0,
}));
function handleInit() {
  console.log(`🚀 ~ handleInit:`);

  setTimeout(() => {
    maskRef.value?.enter();
    setTimeout(() => {
      maskRef.value?.leave();
    }, 2000);
  }, 1000);
}


const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => {
  maskVisible.value = true;
  if (el instanceof HTMLElement) {
    elRef.value = el;
  }
}
const handleEnter: TransitionProps['onEnter'] = (el, done) => {
  setTimeout(() => {
    maskRef.value?.enter();
    setTimeout(() => {
      maskRef.value?.leave();
    }, 2000);
  }, 1000);

  console.log('handleEnter')
  done()
}
const handleAfterEnter: TransitionProps['onAfterEnter'] = (el) => {
  console.log('handleAfterEnter')
};

const handleBeforeLeave: TransitionProps['onBeforeLeave'] = (el) => {
  console.log('handleBeforeLeave')
};
const handleLeave: TransitionProps['onLeave'] = (el, done) => {
  console.log('handleLeave')

  done();
};
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  console.log('handleAfterLeave')
  maskVisible.value = false;
  elRef.value = undefined;
};



</script>

<style scoped lang="sass">
</style>
