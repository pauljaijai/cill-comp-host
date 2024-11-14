<template>
  <div :style>
    <slot />
  </div>

  <effect-filter
    class="hidden"
    :filter-id="id"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, useId } from 'vue'
import EffectFilter from './effect-filter.vue'

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>()
// #endregion Slots

const id = useId()

const style = computed<CSSProperties>(() => ({
  filter: `url(#${id})`,
}))
</script>

<style scoped lang="sass">
</style>
