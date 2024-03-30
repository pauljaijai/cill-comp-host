<template>
  <div class="flex flex-col items-start gap-4 w-full border border-gray-300 p-6">
    <base-input
      v-model="maxMultiple"
      type="number"
      outlined
      label="倍數"
      min="1.5"
    />

    <btn-naughty
      label="按鈕"
      class=" font-bold"
      disable
      :max-multiple="maxMultiple"
      z-index="30"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseInput from '../../base-input.vue';
import BtnNaughty from '../btn-naughty.vue';

const maxMultiple = ref(1.5);
</script>
