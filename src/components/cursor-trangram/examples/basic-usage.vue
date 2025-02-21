<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="visible"
        label="顯示"
        class="p-4"
      />
    </div>

    <div class="cursor-pointer">
      安安
    </div>

    <cursor-trangram />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import CursorTrangram from '../cursor-trangram.vue'

const visible = ref(true)
</script>
