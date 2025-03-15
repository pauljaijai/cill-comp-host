<template>
  <div class="w-full flex flex-col items-center gap-4 py-10">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="enable"
        label="開始閃躲飄"
        class="p-4"
      />
    </div>

    <div class="w-full flex justify-center">
      <wrapper-dodging
        class="w-full"
        :enable
      >
        <div class="w-full border bg-white p-2 text-center">
          「這是鱈魚搞的 bug」
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
