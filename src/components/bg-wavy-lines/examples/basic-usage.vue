<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300">
    <bg-wavy-lines />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BgWavyLines from '../bg-wavy-lines.vue'

const text = ref('')
const disabled = ref(true)
</script>
