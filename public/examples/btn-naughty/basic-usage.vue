<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex gap-4">
      <q-toggle
        v-model="disable"
        label="停用按鈕"
      />
      <q-input
        v-model="text"
        outlined
        placeholder="focus 在此並使用 tab 將焦點轉移至按鈕後，按下 Enter 看看"
        class=" w-full"
      />
    </div>

    <div class="flex">
      <btn-naughty
        label="調皮的按鈕"
        class=" font-bold"
        :disable="disable"
        z-index="9999"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BtnNaughty from '@/components/btn-naughty.vue';

const text = ref('');
const disable = ref(true);
</script>

<style scoped lang="sass">
</style>
