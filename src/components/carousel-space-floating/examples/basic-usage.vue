<template>
  <div
    class="flex flex-col gap-4 w-full border border-gray-300"
    @click="handleClick"
  >
    <carousel-space-floating
      ref="carouselRef"
      class="h-full"
      :src-list="srcList"
      fps-visible
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CarouselSpaceFloating from '../carousel-space-floating.vue';

const srcList = [
  // '/profile-3.webp',
  '/painting-codfish-rain.webp',
  '/photography-fireworks.jpg',
  '/photography-morning-light-of-rice.jpg',
  '/photography-big-stupid-bird.jpg',
  '/photography-ears-of-rice.jpg',
]


const carouselRef = ref<InstanceType<typeof CarouselSpaceFloating>>();

const handleClick = () => {
  console.log(`🚀 ~ handleClick:`);
  carouselRef.value?.next();
}
</script>
