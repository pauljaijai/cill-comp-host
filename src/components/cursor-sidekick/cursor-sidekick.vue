<template>
  <div class="sidekick fixed left-0 top-0 ">
    <svg
      :width="props.size"
      :height="props.size"
      viewBox="0 0 465 465"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :style="style"
      class=" "
    >
      <circle
        cx="232.5"
        cy="232.5"
        r="232.5"
        :fill="props.color"
      />
      <ellipse
        cx="170"
        cy="165.5"
        rx="24"
        ry="67.5"
        fill="white"
      />
      <ellipse
        cx="296"
        cy="165.5"
        rx="24"
        ry="67.5"
        fill="white"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref } from 'vue';
import { throttleFilter, useMouse, useRafFn } from '@vueuse/core';

// #region Props
interface Props {
  size?: string;
  /** \# 前綴之 HEX 格式
   * @default '#515151'
   */
  color?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  size: '3rem',
  color: '#515151',
});

// #region Emits
const emit = defineEmits<{
  // 
}>();
// #endregion Emits

const mouseInfo = useMouse({
  eventFilter: throttleFilter(15),
})

const position = ref({
  x: 0,
  y: 0,
});

const style = computed<CSSProperties>(() => {
  return {
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
  }
});

useRafFn(() => {
  const delta = {
    x: mouseInfo.x.value - position.value.x,
    y: mouseInfo.y.value - position.value.y,
  }

  position.value.x += delta.x / 5;
  position.value.y += delta.y / 5;
})



// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.sidekick
  transform: translate(-50%, -50%)
</style>
