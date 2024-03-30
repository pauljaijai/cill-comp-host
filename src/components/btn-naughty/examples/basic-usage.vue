<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col gap-4 border p-4 rounded">
      <base-checkbox
        v-model="disable"
        label="停用按鈕"
      />

      <base-input
        v-model="text"
        placeholder="點擊這裡並使用 tab 將焦點轉移至按鈕後，再按下 Enter 看看"
        class=" w-full "
      />
    </div>

    <div class="flex">
      <btn-naughty
        label="調皮的按鈕"
        class=" font-bold"
        :disable="disable"
        z-index="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import BtnNaughty from '../btn-naughty.vue';

const text = ref('');
const disable = ref(true);
</script>
