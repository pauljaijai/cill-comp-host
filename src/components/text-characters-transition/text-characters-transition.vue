<template>
  <component
    :is="props.tag"
    :aria-label="labelText"
  >
    <span
      v-for="char, i in chars"
      :key="i"
      aria-hidden
    >
      {{ char.value }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// #region Props
interface Props {
  label: string;
  /** html tag
   * 
   * @default 'p'
   */
  tag?: string;
  splitter?: RegExp;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  label: '',
  tag: 'p',
  splitter: () => /.*?/u,
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [];
}>();
// #endregion Emits

const labelText = computed(() => props.label);

const chars = computed(() => {
  return props.label
    .split(props.splitter)
    .map((char) => {

      return {
        value: char,
      }
    });
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
