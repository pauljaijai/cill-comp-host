<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-center">
      <carousel-anamorphosis-text
        ref="carouselRef"
        :src-list
      />
    </div>

    <div class="w-full flex gap-4">
      <base-btn
        label="上一張"
        class="flex-1"
        @click="carouselRef?.prev()"
      />
      <base-btn
        label="下一張"
        class="flex-1"
        @click="carouselRef?.next()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBtn from '../../base-btn.vue'
import CarouselAnamorphosisText from '../carousel-anamorphosis-text.vue'

type SrcList = InstanceType<typeof CarouselAnamorphosisText>['srcList']

const srcList: SrcList = [
  {
    url: '/photography-street-cat.jpg',
    text: 'CAT',
  },
  {
    url: '/photography-ears-of-rice.jpg',
    text: 'RICE',
  },
  {
    url: '/photography-fireworks.jpg',
    text: 'FIREWORKS',
  },
  {
    url: '/photography-morning-light-of-rice.jpg',
    text: 'LIGHT',
  },
  {
    url: '/photography-big-stupid-bird.jpg',
    text: 'BIRD',
  },
]

const carouselRef = ref<InstanceType<typeof CarouselAnamorphosisText>>()
</script>
