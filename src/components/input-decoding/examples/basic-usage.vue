<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <input-decoding
      v-model="text"
      class="input-decoding px-3 py-2"
    />

    <span class="break-all border-b px-3 pb-1">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputDecoding from '../input-decoding.vue'

const text = ref('')
</script>

<style scoped lang="sass">
.input-decoding
  border: 1px solid #ccc
  border-inline: 2px solid #AAA
</style>
