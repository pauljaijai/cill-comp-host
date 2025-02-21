<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="visible"
        label="顯示"
        class="p-4"
      />
    </div>

    <div class="w-full flex flex-wrap gap-4">
      <div
        v-for="item in list"
        :key="item"
        class="border px-8 py-4"
        :class="item"
      >
        <div class="text-sm opacity-40">
          {{ item.replace('cursor-', '') }}
        </div>
      </div>
    </div>

    <cursor-trangram
      v-if="visible"
      class="z-50"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import CursorTrangram from '../cursor-trangram.vue'

const visible = ref(true)

const list: string[] = [
  'cursor-pointer',
  'cursor-text',
  'cursor-wait',
  'cursor-move',
  'cursor-not-allowed',
  'cursor-help',
  'cursor-crosshair',
  'cursor-zoom-in',
  'cursor-zoom-out',
  'cursor-grab',
  'cursor-grabbing',
  'cursor-all-scroll',
  'cursor-no-drop',
  'cursor-vertical-text',
  'cursor-context-menu',
  'cursor-cell',
  'cursor-progress',
  'cursor-copy',
  'cursor-alias',
]
</script>
