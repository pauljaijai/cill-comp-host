<template>
  <slot :style="style" />
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, StyleValue } from 'vue';
import { nanoid } from 'nanoid';

import { ProvideContent, PROVIDE_KEY } from './wrapper-stereoscopic.vue';

interface Props {
  index?: number;
}
const props = withDefaults(defineProps<Props>(), {
  index: 1,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const id = nanoid();

const style = computed<StyleValue>(() => {
  return {
    transform: `translateZ(${wrapper?.zOffset}px)`,
    transformStyle: 'preserve-3d',
  }
});

const wrapper = inject<ProvideContent>(PROVIDE_KEY);

onMounted(() => {
  wrapper?.bindLayer?.({ id });
});
onBeforeUnmount(() => {
  wrapper?.unbindLayer?.(id);
});

</script>
