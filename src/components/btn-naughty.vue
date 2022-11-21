<template>
  <!-- 外框 -->
  <div class="relative">
    <!-- 拓印容器 -->
    <div class=" absolute inset-0 pointer-events-none">
      <!-- 拓印 -->
      <div
        v-if="!slots.rubbing"
        class="btn-rubbing w-full h-full rounded"
      />
      <slot name="rubbing" />
    </div>


    <!-- 按鈕移動容器 -->
    <div
      ref="btn"
      class="content relative"
      :style="moveStyle"
      tabindex="0"
      @transitionend="setRunning(false)"
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
        <div
          v-if="!slots.default"
          class="btn p-3 px-6 select-none rounded"
          v-bind="attrs"
        >
          {{ props.label }}
        </div>

        <slot v-bind="attrs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inRange, random, throttle } from 'lodash-es';
import { computed, ref, useAttrs, useSlots } from 'vue';

import { useElementBounding, useIntersectionObserver, useElementVisibility, useElementHover } from '@vueuse/core';

interface Props {
  label?: string;
  disable?: boolean;
  zIndex?: number | string;
  maxMultiple?: number;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  disable: false,
  zIndex: undefined,
  maxMultiple: 1.5,
});

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'run'): void;
}>();

const attrs = useAttrs();
const slots = useSlots();

const btn = ref<HTMLDivElement>();
const { width, height } = useElementBounding(btn);
useIntersectionObserver(
  btn,
  ([{ isIntersecting }]) => {
    if (isIntersecting) return;
    back();
  },
);

function handleClick() {
  emit('click');

  if (!props.disable) return;
  run();
}
function handleMouseEnter() {
  if (!props.disable) return;
  run();
}


const offset = ref({
  x: 0,
  y: 0
});
const moveStyle = computed(() => {
  const { x, y } = offset.value;

  const cursor = props.disable ? 'not-allowed' : 'pointer';

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


function back() {
  offset.value.x = 0;
  offset.value.y = 0;
  counter.value = 0;
}

const isRunning = ref(false);
function setRunning(value: boolean) {
  isRunning.value = value;
}
const run = throttle(() => {
  setRunning(true);

  let ok = false,newX = 0, newY = 0;
  do {
    newX = offset.value.x + getRandomNumber(width.value, width.value * props.maxMultiple);
    newY = offset.value.y + getRandomNumber(height.value, height.value * props.maxMultiple);

    ok = inRange(newX, -width.value * props.maxMultiple, width.value * props.maxMultiple) &&
      inRange(newY, -height.value * props.maxMultiple, height.value * props.maxMultiple);
  } while (!ok);

  offset.value.x = newX;
  offset.value.y = newY;

  counter.value += 1;

  btn.value?.blur();
  emit('run');
}, 100, { trailing: false });

function getRandomNumber(min: number, max: number, mirror = true) {
  const result = random(min, max, true);

  if (mirror) {
    return Math.random() >= 0.5 ? result * -1 : result;
  }

  return result;
}

defineExpose({
  /** 移動 */
  run,
  /** 返回原點 */
  back,

  isRunning,
});
</script>

<style scoped lang="sass">
.content
  transition-duration: 0.6s
  transition-timing-function: cubic-bezier(0.170, 1.415, 0.525, 0.935)
  z-index: v-bind('props.zIndex')

.jelly-bounce
  animation: jelly-bounce 0.6s forwards

@keyframes jelly-bounce
  0%, 100%
    transform: scale(1, 1)
  50%
    transform: scale(1.3, 0.7)
  70%
    transform: scale(0.85, 1.15)
  85%
    transform: scale(1.05, 0.95)
  95%
    transform: scale(0.98, 1.02)

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
