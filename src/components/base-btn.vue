<template>
  <button
    class="base-btn"
    type="button"
    @click="emit('click')"
  >
    <slot>
      {{ props.label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  'click': [];
}>();
</script>

<style scoped lang="sass">
.base-btn
  padding: 0.5rem 1.5rem
  border: 1px solid #777
  border-radius: 0.25rem
  background-color: #FEFEFE
  cursor: pointer
  transition: background-color 0.1s, scale 0.4s
  scale: 1
  &:active
    background-color: #F0F0F0
    transition: scale 0.01s
    scale: 0.995
</style>
