<template>
  <div class="flex flex-col gap-4 w-full py-2">
    <base-checkbox
      v-model="enable"
      label="關燈"
      class="border rounded p-4"
    />

    <bg-sakura-fubuki
      v-if="enable"
      class="!fixed top-0 left-0 w-full h-full z-50"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BgSakuraFubuki from '../bg-sakura-fubuki.vue';

const enable = ref(false);
</script>

<style scoped lang="sass">
</style>
