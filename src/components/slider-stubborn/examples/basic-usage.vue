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
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import SliderStubborn from '../slider-stubborn.vue';

const disabled = ref(false);
const value = ref(0);
</script>
