<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <input-encoded
      v-model="text"
      class="input-encoded px-3 py-2"
    />

    <div class="">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputEncoded from '../input-encoded.vue'

const text = ref('')
</script>

<style scoped lang="sass">
.input-encoded
  border: 1px solid #ccc
  border-inline: 2px solid #AAA
</style>
