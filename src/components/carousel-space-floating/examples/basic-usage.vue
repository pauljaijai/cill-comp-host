<template>
  <div class="w-full flex flex-col gap-4">
    <carousel-space-floating
      ref="carouselRef"
      class="h-full border border-gray-300"
      :images="images"
      fps-visible
    />

    <div class="flex gap-4">
      <base-btn
        label="上一個"
        class="flex-1"
        @click="prev()"
      />
      <base-btn
        label="下一個"
        class="flex-1"
        @click="next()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBtn from '../../base-btn.vue'
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
