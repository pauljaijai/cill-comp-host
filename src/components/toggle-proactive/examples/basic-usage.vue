<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex">
      <toggle-proactive v-model="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ToggleProactive from '../toggle-proactive.vue';

const value = ref(false);
</script>
