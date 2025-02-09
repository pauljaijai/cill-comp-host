<template>
  <svg
    class="h-full w-full"
    viewBox="0 0 1500 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="cat-face">
      <path
        id="mouth"
        d="M630.439 663C587.274 706.267 623.48 751 666.346 751C720.972 751 745.419 669.6 748.475 669.6C751.531 669.6 774.069 751 831.75 751C882.417 751 907.767 707.733 869.568 663"
        stroke="black"
        stroke-width="50"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: (props: { isRunning: boolean }) => unknown;
}>()
// #endregion Slots

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
