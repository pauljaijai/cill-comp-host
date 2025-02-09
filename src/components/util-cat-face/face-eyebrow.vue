<template>
  <svg
    class="h-full w-full"
    viewBox="0 0 1500 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="cat-face">
      <path
        id="eyebrow-r"
        d="M488.637 226.299C508.23 224.465 512.982 222.616 532.387 223.274"
        stroke="black"
        stroke-width="50"
        stroke-linecap="round"
      />
      <path
        id="eyebrow-l"
        d="M996.368 226.553C976.798 224.491 972.067 222.588 952.656 223.021"
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
