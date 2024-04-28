<template>
  <!-- 外框 -->
  <div class="relative">
    <!-- 拓印容器 -->
    <div class=" absolute inset-0 pointer-events-none">
      <!-- 拓印 -->

      <slot
        name="rubbing"
        :is-running="isRunning"
      >
        <div class="btn-rubbing w-full h-full rounded" />
      </slot>
    </div>


    <!-- 按鈕移動容器 -->
    <div
      ref="carrierRef"
      class="content relative"
      :style="moveStyle"
      tabindex="0"
      @transitionend="toggleRunning(false)"
      @click="handleClick"
      @keydown.enter="handleClick"
      @mouseenter="handleMouseEnter"
    >
      <!-- 彈跳容器 -->
      <div
        :key="counter"
        :style="bounceStyle"
        class="jelly-bounce"
      >
        <!-- 本體 -->

        <slot
          v-bind="attrs"
          :is-running="isRunning"
        >
          <button class="btn p-3 px-6 select-none rounded">
            {{ props.label }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { throttle } from 'lodash-es';
import { computed, ref, useAttrs, watch } from 'vue';

import { throttleFilter, useIntersectionObserver, useMouseInElement, useToggle } from '@vueuse/core';
import { getUnitVector, getVectorLength } from '../../common/utils';
import { pipe } from 'remeda';

// #region Props
interface Props {
  /** 按鈕內文字 */
  label?: string;
  /** 是否停用 */
  disabled?: boolean;
  /** 同 CSS z-index */
  zIndex?: number | string;
  /** 最大移動距離，為按鈕尺寸倍數 */
  maxDistanceMultiple?: number;
  /** 同 html tabindex */
  tabindex?: number | string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
  zIndex: undefined,
  maxDistanceMultiple: 5,
  tabindex: undefined,
});

// #region Emits
const emit = defineEmits<{
  (e: 'click'): void;
  /** 開始移動時 */
  (e: 'run'): void;
  /** 開始返回時 */
  (e: 'back'): void;
}>();
// #endregion Emits

// #region Slots
defineSlots<{
  /** 按鈕 */
  default?: (props: { isRunning: boolean }) => unknown;
  /** 拓印 */
  rubbing?: (props: { isRunning: boolean }) => unknown;
}>();
// #endregion Slots

const attrs = useAttrs();

const carrierRef = ref<HTMLDivElement>();
const {
  elementX, elementY,
  elementWidth, elementHeight,
  isOutside
} = useMouseInElement(carrierRef, {
  eventFilter: throttleFilter(35)
});
useIntersectionObserver(
  carrierRef,
  (value) => {
    if (value[0]?.isIntersecting) return;
    back();
  },
);

function handleClick() {
  emit('click');

  if (!props.disabled) return;
  run();
}
function handleMouseEnter() {
  if (!props.disabled) return;
  run();
}
watch(isOutside, (value) => {
  if (value! || !props.disabled) return;
  run();
});

const offset = ref({
  x: 0,
  y: 0
});
const moveStyle = computed(() => {
  const { x, y } = offset.value;

  const cursor = props.disabled ? 'not-allowed' : 'pointer';

  return {
    transform: `translate(${x}px, ${y}px)`,
    cursor
  }
});

const counter = ref(0);
/** 初始化時，不播放彈跳動畫 */
const bounceStyle = computed(() => ({
  animationPlayState: counter.value === 0 ? 'paused' : 'running',
}));

watch(() => props.disabled, (value) => {
  if (value) return;
  back();
});
function back() {
  offset.value.x = 0;
  offset.value.y = 0;
  counter.value = 0;

  emit('back');
}

const [isRunning, toggleRunning] = useToggle(false);

const run = throttle(() => {
  toggleRunning(true);

  /** 計算滑鼠位置到按鈕中心的方向單位向量 */
  const direction = getUnitVector({
    x: elementWidth.value / 2 - elementX.value,
    y: elementHeight.value / 2 - elementY.value,
  });

  /** 往遠離滑鼠的方向移動 */
  offset.value.x += direction.x * elementWidth.value;
  offset.value.y += direction.y * elementHeight.value;

  counter.value += 1;

  carrierRef.value?.blur();

  /** 判斷是否超出限制距離 */
  const outOfRange = pipe(undefined,
    () => {
      const maxDistance = getVectorLength({
        x: elementWidth.value * Number(props.maxDistanceMultiple),
        y: elementHeight.value * Number(props.maxDistanceMultiple),
      });

      const distance = getVectorLength(offset.value);

      return distance > maxDistance;
    },
  );

  if (outOfRange) {
    back();
  } else {
    emit('run');
  }
}, 10, { trailing: false });

// #region Methods
defineExpose({
  /** 移動 */
  run,
  /** 返回原點 */
  back,
  /** 是否正在移動 */
  isRunning,
});
// #endregion Methods
</script>

<style scoped lang="sass">
.content
  transition-duration: 0.6s
  transition-timing-function: cubic-bezier(0.040, 0.430, 0.025, 1.070)
  z-index: v-bind('props.zIndex')

.jelly-bounce
  animation: jelly-bounce 0.6s forwards

@keyframes jelly-bounce
  0%, 100%
    transform: scale(1, 1)
  50%
    transform: scale(1.2, 0.8)
  80%
    transform: scale(0.9, 1.1)


.btn-rubbing
  border: 1px dashed rgba(black, 0.2)

.btn
  border: 1px solid #444
  background: #FEFEFE
  transition-duration: 0.2s
  &:active
    transition-duration: 0.1s
    transform: scale(0.98)

</style>
