<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border rounded p-4"
    />

    <div class="flex flex-col gap-2">
      <text-characters-transition
        :visible="visible"
        label="我是鱈魚🐟"
        class="text-2xl tracking-wider"
      />

      <text-characters-transition
        :visible="visible"
        label="一段很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長的文字"
        :enter="(i) => ({
          delay: i * 5,
        })"
        :leave="(i) => ({
          delay: i * 5,
        })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import TextCharactersTransition from '../text-characters-transition.vue'

const visible = ref(false)
</script>
