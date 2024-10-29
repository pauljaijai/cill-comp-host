<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border rounded p-4"
    />

    <div class="flex justify-center">
      <card-futuristic>
        <div class="text-xl">
          Title
        </div>

        <div>
          codfish codfish codfish codfish codfish codfish
        </div>
      </card-futuristic>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import CardFuturistic from '../card-futuristic.vue'

const visible = ref(false)
</script>
