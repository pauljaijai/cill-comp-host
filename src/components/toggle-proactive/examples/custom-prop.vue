<template>
  <div class="flex flex-col w-full border border-gray-300 p-8 gap-10">
    <toggle-proactive
      v-model="value"
      disabled
    />

    <toggle-proactive
      v-model="value"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToggleProactive from '../toggle-proactive.vue';

const value = ref(false);
</script>
