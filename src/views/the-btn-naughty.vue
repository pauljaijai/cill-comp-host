<template>
  <div class="flex flex-col justify-center items-center gap-6 p-10">
    <div class="text-xl">
      展示各類酷酷的組件
    </div>

    <q-input
      outlined
      label="輸入框"
    />

    <btn-naughty
      label="調皮的按鈕"
      class=" font-bold"
      disable
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BtnNaughty from '../components/btn-naughty.vue';

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
