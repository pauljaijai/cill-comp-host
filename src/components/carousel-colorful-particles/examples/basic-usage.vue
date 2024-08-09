<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <carousel-colorful-particles class="h-[40vh]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CarouselColorfulParticles from '../carousel-colorful-particles.vue';

const srcList = [
  '/painting-codfish-bakery.webp',
  '/painting-codfish-rain.webp',
]
</script>
