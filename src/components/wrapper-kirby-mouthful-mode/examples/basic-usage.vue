<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border p-4 rounded">
      <!-- <base-checkbox
        v-model="disable"
        label="停用按鈕"
      />

      <base-input
        v-model="text"
        placeholder="點擊這裡並使用 tab 將焦點轉移至按鈕後，再按下 Enter 看看"
        class=" w-full "
      /> -->
    </div>

    <div class="flex">
      <wrapper-kirby-mouthful-mode>
        <div class="border bg-slate-400 text-white rounded p-10">
          按鈕
        </div>
      </wrapper-kirby-mouthful-mode>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import WrapperKirbyMouthfulMode from '../wrapper-kirby-mouthful-mode.vue';

const text = ref('');
const disable = ref(true);
</script>
