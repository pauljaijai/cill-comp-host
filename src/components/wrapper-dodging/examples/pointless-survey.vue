<template>
  <div class="w-full flex justify-center p-6">
    <div class="flex flex-col items-start gap-4 border border-gray-300 rounded-xl p-6 px-10">
      <div class="text-xl font-bold">
        是否訂飲料
      </div>

      <div class="w-full flex flex-col flex-wrap select-none justify-between gap-4 whitespace-nowrap">
        <label class="flex items-center gap-2 text-lg">
          <input
            v-model="value"
            type="radio"
            value="yes"
            class="size-6"
          >
          喝都喝
        </label>

        <div
          v-for="option in ['不想喝', '有人請客我就喝', '晚一點再說', '看喝哪一家']"
          :key="option"
          class="flex gap-2 text-lg"
        >
          <wrapper-dodging class="flex items-center">
            <input
              v-model="value"
              type="radio"
              :value="option"
              class="pointer-events-none size-6"
            >
          </wrapper-dodging>
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WrapperDodging from '../wrapper-dodging.vue'

const value = ref('')
</script>
