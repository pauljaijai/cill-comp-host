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
    @before-transition="() => emit('beforeTransition')"
    @after-transition="() => emit('afterTransition')"
  />
</template>

<script lang="ts">
</script>

<script setup lang="ts">
import type { CSSProperties, TransitionProps } from 'vue'
import type { TransitionType } from './type'
import { promiseTimeout, useElementBounding } from '@vueuse/core'
import { find, pipe } from 'remeda'
import {
  computed,
  nextTick,
  ref,
  useId,
} from 'vue'
import ShapeMask from './shape-mask.vue'

// #region Props
interface Props {
  appear?: boolean;
  type?: TransitionType;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  appear: false,
  type: () => ({
    name: 'rect',
    enter: {
      action: 'slide-right',
      delay: 100,
      duration: 1000,
      easing: 'easeOutExpo',
    },
    leave: {
      action: 'slide-right',
      delay: 100,
      duration: 1000,
      easing: 'easeInExpo',
    },
    colors: ['#A5A9AD', '#84888B', '#5D6164'],
  }),
})

// #region Emits
const emit = defineEmits<{
  (e: 'init'): void;
  (e: 'beforeTransition'): void;
  (e: 'afterTransition'): void;
}>()
// #endregion Emits

// #region Slots
const slots = defineSlots<{
  default?: () => unknown;
}>()
// #endregion Slots

/** 當新舊元素尺寸不同時，會導致 mask 尺寸變化。
 *
 * 為了防止視覺跳動，使用 CSS transition 過渡，所以 canvas 動畫也要有對應延遲。
 */
const SIZE_CHANGE_DELAY_SEC = 0.6
const maskCssTransitionValue = computed(() => {
  return [
    `width ${SIZE_CHANGE_DELAY_SEC}s cubic-bezier(0.5, 0, 0, 1.2)`,
    `height ${SIZE_CHANGE_DELAY_SEC}s cubic-bezier(0.5, 0, 0, 1.2)`,
  ].join(', ')
})

/** 如果 appear 為 false，則需快速結束第一次動畫 */
let isFirst = true

const enterEl = ref<HTMLElement>()
const enterElBounding = useElementBounding(enterEl)

const leaveEl = ref<HTMLElement>()
const leaveElBounding = useElementBounding(leaveEl)

const currentBounding = computed(() => pipe(
  [enterElBounding, leaveElBounding],
  find(({ width }) => width.value > 0),
))

const maskRef = ref<InstanceType<typeof ShapeMask>>()
const maskVisible = computed(() => !!enterEl.value || !!leaveEl.value)

const maskStyle = computed<CSSProperties>(() => pipe(
  currentBounding.value,
  (bounding) => ({
    top: `${bounding?.top.value}px`,
    left: `${bounding?.left.value}px`,
    width: `${bounding?.width.value}px`,
    height: `${bounding?.height.value}px`,
    // opacity: maskVisible.value ? 1 : 0,
  }),
))

function isSizeChanged(aBounding?: DOMRect, bBounding?: DOMRect) {
  if (!aBounding || !bBounding) {
    return false
  }

  return aBounding.width !== bBounding.width
    || aBounding.height !== bBounding.height
}

// 進入事件
const handleBeforeEnter: TransitionProps['onBeforeEnter'] = (el) => {
  if (!(el instanceof HTMLElement))
    return
  el.style.opacity = '0'
  el.classList.add('anchor')

  enterEl.value = el
}
const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
  // nextTick 才能同時取得 enterElRef 和 leaveElRef
  await nextTick()
  // console.log(`🚀 ~ handleEnter: `);

  if (!(el instanceof HTMLElement)) {
    return done()
  }

  const enterElBounding = el.getBoundingClientRect()
  const leaveElBounding = leaveEl.value?.getBoundingClientRect()

  // 初始化 mask
  await maskRef.value?.init(enterElBounding)

  if (isFirst && !props.appear) {
    isFirst = false
    el.style.opacity = '1'
    emit('afterTransition')
    return done()
  }

  // 如果有 leaveElRef，表示為切換動畫
  if (leaveEl.value) {
    // 將 enterEl 先脫離佔位
    el.style.display = 'none'
  }

  await maskRef.value?.enter(enterElBounding)

  // 如果有 leaveElRef，表示為切換動畫
  if (leaveEl.value) {
    el.style.display = ''
    // 提早移除 leaveEl 以免影響定位
    leaveEl.value = undefined

    if (isSizeChanged(leaveElBounding, enterElBounding)) {
      // 等待 canvas 尺寸變化，同 .shape-mask 定義的 transition-duration
      await promiseTimeout(SIZE_CHANGE_DELAY_SEC * 1000)
    }
  }
  el.style.opacity = '1'

  await maskRef.value?.leave(enterElBounding)

  done()
}
const handleAfterEnter: TransitionProps['onAfterEnter'] = (el) => {
  enterEl.value = undefined
}

// 離開事件
const handleBeforeLeave: TransitionProps['onBeforeLeave'] = (el) => {
  if (!(el instanceof HTMLElement))
    return
  el.classList.add('anchor')

  leaveEl.value = el
}
const handleLeave: TransitionProps['onLeave'] = async (el, done) => {
  // nextTick 才能同時取得 enterElRef 和 leaveElRef
  await nextTick()
  // console.log(`🚀 ~ handleLeave: `);

  if (!(el instanceof HTMLElement)) {
    return done()
  }

  const enterElBounding = enterEl.value?.getBoundingClientRect()
  const leaveElBounding = el.getBoundingClientRect()

  await maskRef.value?.enter(leaveElBounding)

  el.style.opacity = '0'
  // 如果有 enterElRef，表示為切換動畫
  if (enterEl.value) {
    // 將 leaveEl 脫離佔位
    el.style.display = 'none'

    if (isSizeChanged(leaveElBounding, enterElBounding)) {
      await promiseTimeout(SIZE_CHANGE_DELAY_SEC * 1000)
    }
  }

  await maskRef.value?.leave(leaveElBounding)

  done()
}
const handleAfterLeave: TransitionProps['onAfterLeave'] = (el) => {
  leaveEl.value = undefined
}

const anchorName = ref(`--${useId()}`)
</script>

<style lang="sass">
.shape-mask
  transition: v-bind(maskCssTransitionValue) !important
  position-anchor: v-bind(anchorName)
  top: anchor(top) !important
  left: anchor(left) !important

.anchor
  anchor-name: v-bind(anchorName)

// @supports (anchor-name: test)
//   .shape-mask
//     position-anchor: v-bind(anchorName)
//     top: anchor(top) !important
//     left: anchor(left) !important
</style>
