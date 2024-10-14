<template>
  <div class="w-full flex flex-col gap-10 border border-gray-300 p-8">
    <slider-stubborn
      v-model="value"
      disabled
      :max-thumb-length="thumbMaxLength / 4"
      thumb-color="#ff8d36"
      class="z-[999] w-full"
    />

    <slider-stubborn
      v-model="value"
      disabled
      :max-thumb-length="thumbMaxLength / 2"
      :thumb-size="40"
      class="z-[999] w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import SliderStubborn from '../slider-stubborn.vue'

const { width, height } = useWindowSize()

const value = ref(50)

const thumbMaxLength = computed(() =>
  Math.min(width.value, height.value),
)
</script>
