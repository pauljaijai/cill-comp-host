<template>
  <q-item
    clickable
    :to="props.to"
    exact
  >
    <q-item-section avatar>
      <q-icon :name="props.icon" />
    </q-item-section>
    <q-item-section>
      {{ props.label }}
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  icon?: string;
  to?: any;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  icon: '',
  to: undefined,
});
</script>

<style scoped lang="sass">
</style>
