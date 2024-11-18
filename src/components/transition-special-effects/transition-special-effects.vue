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
    v-bind="enterFilterParams"
  />

  <effect-filter
    ref="leaveFilterRef"
    class="hidden"
    v-bind="leaveFilterParams"
  />
</template>

<script setup lang="ts">
import type { TransitionProps } from 'vue'
import type { EnterParams, LeaveParams } from './type'
import { pipe } from 'remeda'
import { computed, ref, useId } from 'vue'
import EffectFilter from './effect-filter.vue'

// #region Props
interface Props {
  appear?: boolean;
  enter?: EnterParams;
  leave?: LeaveParams;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  appear: false,
  enter: 'color-fringing',
  leave: 'color-fringing',
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

/** 如果 appear 為 false，則需快速結束第一次動畫 */
let isFirst = true

const enterId = `${useId()}-enter`
const enterFilterRef = ref<InstanceType<typeof EffectFilter>>()
const enterFilterParams = computed(() => pipe(
  props.enter,
  (data) => {
    if (typeof data === 'string') {
      return { name: data }
    }

    return data
  },
  (data) => ({
    ...data,
    filterId: enterId,
  }),
))

const leaveId = `${useId()}-leave`
const leaveFilterRef = ref<InstanceType<typeof EffectFilter>>()
const leaveFilterParams = computed(() => pipe(
  props.leave,
  (data) => {
    if (typeof data === 'string') {
      return { name: data }
    }

    return data
  },
  (data) => ({
    ...data,
    filterId: leaveId,
  }),
))

// --- enter hook ---
const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => {
  if (!(el instanceof HTMLElement))
    return

  el.style.filter = `url(#${enterId})`
}
const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
  if (!(el instanceof HTMLElement)) {
    return done()
  }

  await enterFilterRef.value?.leave({ duration: 0 })

  if (isFirst && !props.appear) {
    isFirst = false
    await enterFilterRef.value?.enter({
      ...enterFilterParams.value,
      duration: 0,
    })
    emit('afterTransition')
    return done()
  }

  await enterFilterRef.value?.enter(enterFilterParams.value)

  done()
}
const handleAfterEnter: TransitionProps['onAfterEnter'] = (el) => {
  //
}

// --- leave hook ---
const handleBeforeLeave: TransitionProps['onBeforeLeave'] = (el) => {
  if (!(el instanceof HTMLElement))
    return

  el.style.filter = `url(#${leaveId})`
}
const handleLeave: TransitionProps['onLeave'] = async (el, done) => {
  if (!(el instanceof HTMLElement)) {
    return done()
  }

  await leaveFilterRef.value?.enter({ duration: 0 })
  await leaveFilterRef.value?.leave(leaveFilterParams.value)

  done()
}
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  //
}
</script>

<style scoped lang="sass">
</style>
