<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex justify-center">
      <label>
        <div class="mb-1">
          <div class="font-bold">
            超機密 token
          </div>

          <div class="text-xs opacity-50">
            已無法再次觀看
          </div>
        </div>

        <wrapper-dodging class="w-full">
          <div class="border rounded bg-white">
            <input
              type="password"
              class="w-full cursor-not-allowed p-2 tracking-tighter"
              value="鱈魚超超超超超超超超超超超超超超超胖"
            >
          </div>
        </wrapper-dodging>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import WrapperDodging from '../wrapper-dodging.vue'
</script>
