<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class=" border p-4 rounded"
    />

    <transition-shape>
      <div
        v-if="visible"
        class="text-xl"
      >
        我是一段文字
      </div>
    </transition-shape>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import TransitionShape from '../transition-shape.vue';

const visible = ref(true);
</script>
