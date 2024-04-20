<template>
  <svg
    width="350"
    height="542"
    viewBox="0 0 350 542"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="175"
      cy="366.497"
      r="175"
      fill="#FFB74B"
    />
    <path
      d="M159.5 -0.00292969C350 153.5 350 366.497 350 366.497H0C0 366.497 0 155 159.5 -0.00292969Z"
      fill="#FFB74B"
    />
    <path
      d="M159.5 -0.00292969C350 153.5 350 366.497 350 366.497H136.5C136.5 366.497 85.4999 225.5 159.5 -0.00292969Z"
      fill="#FF8B66"
    />
  </svg>
</template>

<script setup lang="ts">
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

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots



// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
