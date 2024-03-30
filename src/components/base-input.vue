<template>
  <div>
    <label
      v-if="props.label"
      class=" text-sm font-bold"
      :class="props.labelClass"
    >
      {{ props.label }}
    </label>

    <div class="mt-1">
      <input
        v-model="modelValue"
        class="base-input w-full"
        v-bind="$attrs"
        :class="props.inputClass"
        :placeholder="props.placeholder"
        :type="props.type"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { InputTypeHTMLAttribute, ref } from 'vue';

interface Props {
  modelValue?: string | number;
  label?: string;
  labelClass?: string;
  inputClass?: string;
  placeholder?: string;
  type?: InputTypeHTMLAttribute;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  labelClass: '',
  inputClass: '',
  placeholder: undefined,
  type: 'text',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void;
}>();

const modelValue = useVModel(props, 'modelValue');
</script>

<style scoped lang="sass">
.base-input
  border: 1px solid #888
  padding: 0.5rem 0.75rem
  border-radius: 0.5rem
</style>
