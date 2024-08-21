<template>
  <div ref="blockRef">
    <slot />

    <minecraft-world class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { eventKey } from './type';
import { nanoid } from 'nanoid';

import { useElementBounding, useEventBus } from '@vueuse/core';

import MinecraftWorld from './minecraft-world.vue';
import { pick } from 'remeda';

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

const bus = useEventBus(eventKey);

const id = nanoid();

const blockRef = ref<HTMLElement>();
const blockBounding = reactive(useElementBounding(blockRef));

watch(blockBounding, (value) => {
  if (value.width === 0) return;

  bus.emit({
    type: 'update',
    ...pick(value, ['x', 'y']),
  });
});

onMounted(() => {
  bus.emit({
    type: 'add',
    ...pick(blockBounding, ['x', 'y', 'width', 'height']),
  });
});

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots
</script>

<style scoped lang="sass">
</style>
