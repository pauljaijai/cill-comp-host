<template>
  <div class="w-full flex flex-center flex-col gap-4 border border-gray-300 p-6">
    <label class="flex flex-1 items-center justify-center gap-4 border rounded-xl px-8 py-4">
      我接受以上條款

      <toggle-proactive
        v-model="value"
        :disabled="disabled"
        size="2rem"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToggleProactive from '../toggle-proactive.vue'

const disabled = ref(true)
const value = ref(false)
</script>
