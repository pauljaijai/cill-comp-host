<template>
  <div class="flex flex-col gap-4 w-full py-2">
    <base-checkbox
      v-model="enable"
      label="啟用"
      class="border rounded p-4"
    />

    <transition name="opacity">
      <bg-sakura-fubuki
        class="!fixed top-0 left-0 w-full h-full z-50 duration-500"
        :class="classes"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BgSakuraFubuki from '../bg-sakura-fubuki.vue';

const enable = ref(false);

const classes = computed(() => ({
  'opacity-0': !enable.value,
  'opacity-100': enable.value,
}));
</script>

<style scoped lang="sass">
</style>
