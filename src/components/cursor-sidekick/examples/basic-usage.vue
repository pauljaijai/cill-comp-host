<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <cursor-sidekick v-if="enable" />

    <base-checkbox
      v-model="enable"
      label="啟用小跟班"
      class="p-4 border rounded bg-gray-100"
    />

    <div class="flex flex-col gap-2">
      <div class=" text-2xl font-bold">
        我是標題
      </div>

      <div class="">
        我是一段文字（嘗試反白文字看看）
      </div>

      <hr>

      <base-input
        v-model="text"
        label="文字輸入框"
      />
      <div class=" border rounded w-1/2 h-[20vh]">
        <textarea
          v-model="text"
          placeholder="多行文字"
          class="w-full h-full p-2"
        />
      </div>

      <div
        contenteditable
        class="p-2 border rounded w-2/3"
      >
        可編輯的 div
      </div>

      <hr>

      <base-btn label="按鈕" />
      <base-btn
        disabled
        label="不可以色色 (ﾟДﾟ*)ﾉ"
      />

      <hr>

      <a
        href="https://vocus.cc/salon/cod-aquarium"
        target="_blank"
      >
        鱈魚的魚缸
      </a>

      <img
        src="/painting-codfish-bakery.webp"
        alt="貪吃的鱈魚"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import BaseBtn from '../../base-btn.vue';
import CursorSidekick from '../cursor-sidekick.vue';

const enable = ref(false);
const text = ref('');
</script>
