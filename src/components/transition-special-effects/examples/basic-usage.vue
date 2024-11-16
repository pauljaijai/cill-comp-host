<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="visible"
        label="顯示"
        class="p-4"
      />
    </div>

    <div class="h-[50vh] flex items-center justify-center">
      <transition-special-effects>
        <div
          v-if="visible"
          class="flex flex-col items-center gap-4"
        >
          <img
            src="/profile.webp"
            class="mb-4 h-60 w-60 overflow-hidden border-4 border-white rounded-full shadow-xl"
          >

          <div class="text-xl font-bold">
            鱈魚 Codfish
          </div>

          <div>
            熱愛開發一些奇怪的東東
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

const visible = ref(true)
</script>
