<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300">
    <div class="flex justify-center">
      <carousel-anamorphosis-text
        text="cod"
        :src-list="[
          '/photography-street-cat.jpg',
          '/photography-ears-of-rice.jpg',
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CarouselAnamorphosisText from '../carousel-anamorphosis-text.vue'
</script>
