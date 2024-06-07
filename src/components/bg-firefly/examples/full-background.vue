<template>
  <div class="flex flex-col gap-4 w-full py-2">
    <div class="border p-4">
      <base-checkbox
        v-model="isDark"
        label="顯示"
      />
    </div>

    <bg-firefly
      v-if="isDark"
      class="!fixed top-0 left-0 w-full h-full z-50"
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
