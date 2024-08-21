<template>
  <div ref="blockRef">
    <slot />

    <minecraft-world class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useElementBounding } from '@vueuse/core';

import MinecraftWorld from './minecraft-world.vue';


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
