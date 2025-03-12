<template>
  <div class="">
    <slot />
  </div>
</template>

<script setup lang="ts">
// #region Props
interface Props {
  enable?: boolean;
}
// #endregion Props

// #region Slots
interface Slots {
  default?: () => unknown;
}
// #endregion Slots

const props = withDefaults(defineProps<Props>(), {
  enable: false,
})

defineSlots<Slots>()
</script>

<style scoped lang="sass">
</style>
