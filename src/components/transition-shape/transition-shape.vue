<template>
  <transition
    mode="out-in"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
  >
    <slot />
  </transition>

  <canvas
    v-show="canvasVisible"
    class=" fixed pointer-events-none bg-black/10"
    :style="canvasStyle"
  />
</template>

<script setup lang="ts">
import { useElementBounding, useEventListener } from '@vueuse/core';
import { pick } from 'remeda';
import { computed, CSSProperties, Ref, ref, shallowRef, TransitionProps, watch } from 'vue';

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

// #region Slots
const slots = defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots
// console.log(`🚀 ~ slots:`, slots.default?.());

const elRef = ref<HTMLElement>();
const elBounding = useElementBounding(elRef);

const canvasVisible = ref(false);
const canvasStyle = computed<CSSProperties>(() => ({
  top: `${elBounding.top.value}px`,
  left: `${elBounding.left.value}px`,
  width: `${elBounding.width.value}px`,
  height: `${elBounding.height.value}px`,
}));


const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => {
  canvasVisible.value = true;
  if (el instanceof HTMLElement) {
    elRef.value = el;
  }
}
const handleEnter: TransitionProps['onEnter'] = (el, done) => {
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
  canvasVisible.value = false;
  elRef.value = undefined;
};



</script>

<style scoped lang="sass">
</style>
