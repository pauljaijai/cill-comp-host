<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300">
    <bg-wavy-lines
      v-slot="{ fps }"
      class="h-full w-full"
      renderer="glsl"
    >
      <div class="absolute left-2 top-2 opacity-40">
        {{ fps }}
      </div>
    </bg-wavy-lines>
  </div>
</template>

<script setup lang="ts">
import BgWavyLines from '../bg-wavy-lines.vue'
</script>
