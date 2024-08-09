<template>
  <div class="flex flex-col gap-4 w-full py-2">
    <base-checkbox
      v-model="isDark"
      label="關燈"
      class="border rounded p-4"
    />

    <bg-firefly
      v-if="isDark"
      class="!fixed top-0 left-0 w-full h-full z-50"
      color="#3cff00"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BgFirefly from '../bg-firefly.vue';

import { useData } from 'vitepress'

const { isDark } = useData();

onBeforeUnmount(() => {
  isDark.value = false;
});
</script>

<style scoped lang="sass">
</style>
