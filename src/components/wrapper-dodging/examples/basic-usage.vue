<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="enable"
        label="開始閃躲飄"
        class="p-4"
      />
    </div>

    <div class="flex justify-center">
      <wrapper-dodging
        class="w-full"
        :enable
      >
        <div class="flex-1 border bg-white p-2 text-center">
          ─=≡Σ((( つ•̀ω•́)つ
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
