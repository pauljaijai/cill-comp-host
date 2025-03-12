<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="enable"
        label="閃躲飄"
        class="p-4"
      />
    </div>

    <div class="flex justify-center">
      <wrapper-dodging class="w-full">
        <div class="border p-2">
          ( •̀ ω •́ )✧
        </div>
      </wrapper-dodging>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import WrapperDodging from '../wrapper-dodging.vue'

const enable = ref(true)
</script>
