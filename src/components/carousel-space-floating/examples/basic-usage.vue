<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <carousel-space-floating />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import CarouselSpaceFloating from '../carousel-space-floating.vue';

const text = ref('');
const disable = ref(true);
</script>
