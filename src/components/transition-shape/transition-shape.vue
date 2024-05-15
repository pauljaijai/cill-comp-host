<template>
  <div class="">
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
  </div>
</template>

<script setup lang="ts">
import { ref, TransitionProps } from 'vue';

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => { }
const handleEnter: TransitionProps['onEnter'] = (el, done) => {
  done()
}
const handleAfterEnter: TransitionProps['onAfterEnter'] = (el) => {
};

const handleBeforeLeave: TransitionProps['onBeforeLeave'] = (el) => {
};
const handleLeave: TransitionProps['onLeave'] = (el, done) => {
  done();
};
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
};

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

</script>

<style scoped lang="sass">
</style>
