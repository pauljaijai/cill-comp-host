<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 rounded">
    <base-checkbox
      v-model="disabled"
      label="停用按鈕"
      class="p-4"
    />

    <bg-snow class="fixed left-0 top-0 z-[100] h-full w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import BgSnow from '../bg-snow.vue'

const text = ref('')
const disabled = ref(true)
</script>
