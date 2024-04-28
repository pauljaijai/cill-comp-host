<template>
  <div class="flex flex-col justify-center items-center gap-10 w-full border border-gray-300 p-6">
    <wrapper-kirby-mouthful-mode :is-mouthful="isMouthful">
      <div class="flex flex-col gap-4 border  rounded">
        <base-checkbox
          v-model="isMouthful"
          class=" p-4"
          label="塞滿嘴"
        />
      </div>
    </wrapper-kirby-mouthful-mode>

    <wrapper-kirby-mouthful-mode :is-mouthful="isMouthful">
      <div class="border bg-slate-100 rounded p-6">
        <div class=" text-xl font-bold">
          甚麼是塞滿嘴？
        </div>

        <div class="mt-2">
          在《星之卡比 探索發現》中，卡比新覺醒了可以把汽車或是自動販賣機等散落在這個新世界各處的道具塞進嘴裡來發動的「塞滿嘴變形」能力。
        </div>
      </div>
    </wrapper-kirby-mouthful-mode>

    <wrapper-kirby-mouthful-mode :is-mouthful="isMouthful">
      <button class="border bg-slate-600 text-white rounded px-4 py-2">
        讚
      </button>
    </wrapper-kirby-mouthful-mode>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import WrapperKirbyMouthfulMode from '../wrapper-kirby-mouthful-mode.vue';

const isMouthful = ref(false);
</script>
