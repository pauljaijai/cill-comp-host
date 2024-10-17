<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-center">
      <carousel-anamorphosis-text
        ref="carouselRef"
        :src-list
        height="60vh"
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
    url: '/profile.webp',
    text: ['FISH', 'COD', 'CHILL'],
  },
  {
    url: '/profile-2.webp',
    text: [
      { value: '肥', class: 'text-[18vmin]' },
      { value: '肥', class: 'text-[24vmin]' },
      { value: '魚', class: 'text-[18vmin]' },
      { value: '魚', class: 'text-[24vmin]' },
    ],
  },
  {
    url: '/profile-3.webp',
    text: ['吃', '爽', '魚'],
  },
]

const carouselRef = ref<InstanceType<typeof CarouselAnamorphosisText>>()
</script>
