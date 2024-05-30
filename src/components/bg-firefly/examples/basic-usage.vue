<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <bg-firefly class="bg w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import BgFirefly from '../bg-firefly.vue';
</script>

<style scoped lang="sass">
.bg
  background: linear-gradient(to top, #102b19, #191f1b)
</style>
