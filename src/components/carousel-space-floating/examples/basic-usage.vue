<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <carousel-space-floating
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
  '/photography-王功漁火節煙火.jpg',
  '/photography-秧苗晨光.jpg',
  '/photography-大笨鳥.jpg',
  '/photography-稻穗.jpg',
]

</script>
