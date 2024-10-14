<template>
  <label class="flex items-center">
    <input
      v-model="modelValue"
      type="checkbox"
    >
    <span
      v-if="props.label"
      class="ml-2"
    >
      {{ props.label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

interface Props {
  modelValue?: boolean;
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const modelValue = useVModel(props, 'modelValue')
</script>

<style scoped lang="sass">
</style>
