<template>
  <div ref="blockRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { ref } from 'vue';

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

const blockRef = ref<HTMLElement>();

const blockBounding = useElementBounding(blockRef);

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots
</script>

<style scoped lang="sass">
</style>
