<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="disabled"
        label="停用按鈕"
        class="p-4"
      />
    </div>

    <div class="flex justify-center">
      <text-hate-mouse />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import TextHateMouse from '../text-hate-mouse.vue'

const text = ref('')
const disabled = ref(true)
</script>
