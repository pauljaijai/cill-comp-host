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

  <effect-filter
    ref="enterFilterRef"
    class="hidden"
    :filter-id="enterId"
  />

  <effect-filter
    ref="leaveFilterRef"
    class="hidden"
    :filter-id="leaveId"
  />
</template>

<script setup lang="ts">
import type { TransitionProps } from 'vue'
import { ref, useId } from 'vue'
import EffectFilter from './effect-filter.vue'

// #region Props
interface Props {
  appear?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  appear: false,
})

// #region Emits
const emit = defineEmits<{
  (e: 'init'): void;
  (e: 'beforeTransition'): void;
  (e: 'afterTransition'): void;
}>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>()
// #endregion Slots

const enterId = `${useId()}-enter`
const leaveId = `${useId()}-leave`

/** 如果 appear 為 false，則需快速結束第一次動畫 */
let isFirst = true

const enterFilterRef = ref<InstanceType<typeof EffectFilter>>()
const leaveFilterRef = ref<InstanceType<typeof EffectFilter>>()

// 進入事件
const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => {
  if (!(el instanceof HTMLElement))
    return

  el.style.filter = `url(#${enterId})`
  enterFilterRef.value?.leave({ duration: 0 })
}
const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
  if (!(el instanceof HTMLElement)) {
    return done()
  }

  if (isFirst && !props.appear) {
    isFirst = false
    emit('afterTransition')
    return done()
  }

  await enterFilterRef.value?.enter()

  done()
}
const handleAfterEnter: TransitionProps['onAfterEnter'] = (el) => {
  //
}

// 離開事件
const handleBeforeLeave: TransitionProps['onBeforeLeave'] = (el) => {
  if (!(el instanceof HTMLElement))
    return

  el.style.filter = `url(#${leaveId})`

  leaveFilterRef.value?.enter({ duration: 0 })
}
const handleLeave: TransitionProps['onLeave'] = async (el, done) => {
  if (!(el instanceof HTMLElement)) {
    return done()
  }

  await leaveFilterRef.value?.leave()

  done()
}
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  //
}
</script>

<style scoped lang="sass">
</style>
