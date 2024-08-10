<template>
  <div class="flex flex-col w-full border border-gray-300 p-8 gap-10">
    <slider-stubborn
      v-model="value"
      disabled
      :max-thumb-length="thumbMaxLength / 4"
      thumb-color="#ff8d36"
      class="w-full"
    />

    <slider-stubborn
      v-model="value"
      disabled
      :max-thumb-length="thumbMaxLength / 3 * 2"
      :thumb-size="40"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import SliderStubborn from '../slider-stubborn.vue';

import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize()

const disabled = ref(false);
const value = ref(50);

const thumbMaxLength = computed(() =>
  Math.min(width.value, height.value)
);
</script>
