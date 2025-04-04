<template>
  <div class="w-full flex flex-col items-center p-6">
    <input-eject
      v-model="text"
      class="input-eject p-3"
      :sanitization
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputEject from '../input-eject.vue'

const text = ref('')

function sanitization(text: string) {
  return text
    .replace(/c(o)+d/gi, '')
    .replaceAll('fish', '')
    .replaceAll('鱈魚', '')
}
</script>

<style scoped lang="sass">
:deep(.input-eject)
  border: 1px solid #ccc
  border-inline: 2px solid #AAA
</style>
