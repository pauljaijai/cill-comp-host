<template>
  <slot />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { mapNumber } from '@/common/utils';
import { nanoid } from 'nanoid';

import { useElementBounding, useMouse, watchThrottled } from '@vueuse/core';

interface Props {
  xMaxAngle?: number;
  yMaxAngle?: number;
}
const props = withDefaults(defineProps<Props>(), {
  xMaxAngle: 15,
  yMaxAngle: 15,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const id = nanoid();

</script>
