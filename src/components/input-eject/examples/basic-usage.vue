<template>
  <div class="w-full flex flex-col items-center p-6">
    <input-eject
      v-model="text"
      class="input-eject p-3"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputEject from '../input-eject.vue'

const text = ref('')
</script>

<style scoped lang="sass">
:deep(.input-eject)
  border: 1px solid #ccc
  border-inline: 2px solid #AAA
</style>
