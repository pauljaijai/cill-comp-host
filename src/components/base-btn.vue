<template>
  <button
    class="base-btn"
    type="button"
    @click="emit('click')"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
  transition: background-color 0.1s
  &:active
    background-color: #F0F0F0
</style>
