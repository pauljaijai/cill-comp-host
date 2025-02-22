<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="visible"
        label="顯示"
        class="p-4"
      />
    </div>

    <div class="grid grid-cols-2 w-full gap-4 md:grid-cols-3">
      <div
        v-for="item in list"
        :key="item"
        class="border px-8 py-4 text-center"
        :style="{ cursor: item }"
      >
        <div class="text-sm opacity-60">
          {{ item }}
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
import type { CSSProperties } from 'vue'
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import CursorTrangram from '../cursor-trangram.vue'

const visible = ref(false)

const list: CSSProperties['cursor'][] = [
  'none',
  'pointer',
  'text',
  'wait',
  'move',
  'not-allowed',
  'help',
  'crosshair',
  'zoom-in',
  'zoom-out',
  'grab',
  'grabbing',
  'vertical-text',
  'cell',
  'copy',
  'alias',
]
</script>
