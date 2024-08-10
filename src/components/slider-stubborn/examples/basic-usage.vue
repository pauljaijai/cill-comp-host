<template>
  <div class="flex flex-col w-full border border-gray-300 p-6">
    <base-checkbox
      v-model="disabled"
      class="p-4 w-full border rounded"
      label="停用"
    />

    <div class="flex flex-col justify-center flex-1">
      <slider-stubborn
        v-model="value"
        :disabled="disabled"
        :max-thumb-length="thumbLength"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import SliderStubborn from '../slider-stubborn.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize()

const disabled = ref(false);
const value = ref(50);

const thumbLength = computed(() =>
  Math.min(width.value, height.value) / 3
);
</script>
