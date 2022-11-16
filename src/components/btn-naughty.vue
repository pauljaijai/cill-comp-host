<template>
  <!-- 外框 -->
  <div class="relative">
    <!-- 按鈕印 -->
    <div class="btn-rubbing absolute inset-0 rounded pointer-events-none" />

    <!-- 按鈕容器 -->
    <div
      class="content relative"
      :style="style"
    >
      <!-- 本體 -->
      <div
        ref="btn"
        class="btn p-3 px-6 select-none rounded"
        v-bind="attrs"
        tabindex="0"
        @click="handleClick"
        @keydown.enter="handleClick"
        @mouseenter="handleMouseEnter"
      >
        {{ props.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementBounding, useIntersectionObserver } from '@vueuse/core';
import { computed, ref, useAttrs } from 'vue';

interface Props {
  label?: string;
  disable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  disable: false,
});

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'run'): void;
}>();

const attrs = useAttrs();

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

function back() {
  offset.value.x = 0;
  offset.value.y = 0;
}

function run() {
  offset.value.x += getRandomNumber(width.value, width.value * 1.1);
  offset.value.y += getRandomNumber(height.value, height.value * 1.1);

  btn.value?.blur();
  emit('run');
}

function getRandomNumber(min: number, max: number, mirror = false) {
  const result = (Math.random() * (max - min)) + min;

  if (mirror) {
    return Math.random() >= 0.5 ? result * -1 : result;
  }

  return result;
}

const style = computed(() => {
  const { x, y } = offset.value;

  const cursor = props.disable ? 'not-allowed' : 'pointer';

  return {
    transform: `translate(${x}px, ${y}px)`,
    cursor
  }
});

defineExpose({
  /** 移動 */
  run,
  /** 返回原點 */
  back,
})
</script>

<style scoped lang="sass">
.content
  transition-duration: 0.4s
  transition-timing-function: cubic-bezier(0.170, 1.415, 0.525, 0.935)

.btn-rubbing
  border: 1px dashed rgba(black, 0.2)

.btn
  border: 1px solid #444
  transition-duration: 0.2s
  &:active
    transition-duration: 0.1s
    transform: scale(0.98)

</style>
