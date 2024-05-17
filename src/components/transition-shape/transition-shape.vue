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
    :width="enterElBounding.width.value"
    :height="enterElBounding.height.value"
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

const enterElRef = ref<HTMLElement>();
const enterElBounding = useElementBounding(enterElRef);

const leaveElRef = ref<HTMLElement>();
const leaveElBounding = useElementBounding(leaveElRef);

const maskRef = ref<InstanceType<typeof ShapeMask>>();
const maskVisible = ref(false);
const maskStyle = computed<CSSProperties>(() => ({
  top: `${enterElBounding.top.value}px`,
  left: `${enterElBounding.left.value}px`,
  width: `${enterElBounding.width.value}px`,
  height: `${enterElBounding.height.value}px`,
  opacity: maskVisible.value ? 1 : 0,
}));
async function handleInit() {
  console.log(`🚀 ~ handleInit:`);
}

/** appear 只會觸發 enter 事件，一般情況下則是 leave 接著 enter */
let isAppear = props.appear;


// 進入事件
const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => {
  console.log('--- handleBeforeEnter')
  if (!(el instanceof HTMLElement)) return;
  el.style.opacity = '0';

  maskVisible.value = true;
  enterElRef.value = el;
}
const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
  console.log('handleEnter')
  if (!(el instanceof HTMLElement)) {
    return done()
  }

  await maskRef.value?.initFinished();

  await maskRef.value?.enter(el);
  el.style.opacity = '1';

  await maskRef.value?.leave(el);

  console.log('maskRef leaved')

  done()
}
const handleAfterEnter: TransitionProps['onAfterEnter'] = (el) => {
  if (!(el instanceof HTMLElement)) return;

  /** appear 只會有一次 */
  isAppear = false;
};

// 離開事件
const handleBeforeLeave: TransitionProps['onBeforeLeave'] = (el) => {
  // console.log('handleBeforeLeave')
};
const handleLeave: TransitionProps['onLeave'] = async (el, done) => {
  console.log('handleLeave')

  if (!(el instanceof HTMLElement)) return;

  await maskRef.value?.enter(el);
  el.style.opacity = '0';

  await maskRef.value?.leave(el);

  done();
};
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  // console.log('handleAfterLeave')
  enterElRef.value = undefined;
};



</script>

<style scoped lang="sass">
</style>
