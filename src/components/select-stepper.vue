<template>
  <div>
    <label
      v-if="props.label"
      class="text-sm font-bold"
      :class="props.labelClass"
    >
      {{ props.label }}
    </label>

    <div class="mt-1 flex flex-nowrap items-center border rounded">
      <button
        class="p-2 px-4 opacity-80"
        @click="prev()"
      >
        ◀
      </button>

      <select
        v-model="modelValue"
        v-bind="$attrs"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>

      <button
        class="p-2 px-4 opacity-80"
        @click="next()"
      >
        ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { syncRef, useCycleList, useVModel } from '@vueuse/core'

interface Props {
  modelValue?: string;
  label?: string;
  labelClass?: string;
  options?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  labelClass: '',
  options: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>()

const modelValue = useVModel(props, 'modelValue')

const {
  state,
  next,
  prev,
} = useCycleList(props.options, {
  initialValue: modelValue.value,
})

syncRef(modelValue, state)
</script>

<style scoped lang="sass">
.base-input
  border: 1px solid #888
  padding: 0.5rem 0.75rem
  border-radius: 0.5rem
</style>
