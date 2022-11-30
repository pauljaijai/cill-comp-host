<template>
  <div ref="wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useElementBounding, useMouse } from '@vueuse/core';

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const wrapper = ref();
const { x: elX, y: elY, width, height } = useElementBounding(wrapper);
const mouse = useMouse();

/** 計算滑鼠與物體的中心距離 */
const coordinate = computed(() => {
  const x = elX.value + width.value / 2 - mouse.x.value;
  const y = elY.value + height.value / 2 - mouse.y.value;

  return {
    x, y
  }
});

const style = computed(() => {

});
</script>

<style scoped lang="sass">
</style>
