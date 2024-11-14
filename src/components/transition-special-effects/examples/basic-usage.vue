<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded p-4">
      <base-checkbox
        v-model="disabled"
        label="停用按鈕"
      />
    </div>

    <div class="flex justify-center">
      <transition-special-effects>
        <div class="flex flex-col items-center gap-4">
          <img
            src="/profile.webp"
            class="mb-4 h-60 w-60 overflow-hidden border-4 border-white rounded-full shadow-xl"
          >

          <div class="text-xl font-bold">
            鱈魚 Codfish
          </div>

          <div>
            魚魚魚魚魚魚魚魚魚魚魚魚魚魚魚魚
          </div>
        </div>
      </transition-special-effects>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import TransitionSpecialEffects from '../transition-special-effects.vue'

const text = ref('')
const disabled = ref(true)
</script>
