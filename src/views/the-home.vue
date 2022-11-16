<template>
  <div class="flex flex-col justify-center items-center gap-6 p-10">
    我是首頁
  </div>
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
  (e: 'update:modelValue', value: string): void;
}>();

</script>

<style scoped lang="sass">
</style>
