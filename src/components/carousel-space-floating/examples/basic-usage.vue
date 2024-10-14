<template>
  <div
    class="w-full flex flex-col gap-4 border border-gray-300"
    @click="next"
    @click.right.prevent="prev"
  >
    <carousel-space-floating
      ref="carouselRef"
      class="h-full"
      :images="images"
      fps-visible
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CarouselSpaceFloating from '../carousel-space-floating.vue'

type Images = InstanceType<typeof CarouselSpaceFloating>['images']

const images: Images = [
  '/painting-codfish-bakery.webp',
  '/painting-codfish-rain.webp',
  '/photography-fireworks.jpg',
  '/photography-morning-light-of-rice.jpg',
  '/photography-big-stupid-bird.jpg',
  '/photography-ears-of-rice.jpg',
  '/photography-gaomei-windmill.jpg',
  '/photography-spider-at-night.jpg',
  '/photography-street-cat.jpg',
]

const carouselRef = ref<InstanceType<typeof CarouselSpaceFloating>>()

function next() {
  carouselRef.value?.next()
}

function prev() {
  carouselRef.value?.prev()
}
</script>
