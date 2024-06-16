<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <cursor-sidekick />

    <div class="flex flex-col gap-2">
      <div class=" text-2xl font-bold">
        我是標題
      </div>

      <div class="">
        我是一段文字（嘗試反白文字看看）
      </div>

      <hr>

      <base-input label="文字輸入框" />
      <div class=" border rounded w-1/2 h-[20vh]">
        <textarea
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
        label="不可以瑟瑟 (。・ω・。)"
      />

      <hr>

      <base-checkbox
        label="檢核方塊"
        class="py-1 px-2 border rounded"
      />

      <hr>

      <a
        href="https://vocus.cc/salon/cod-aquarium"
        target="_blank"
      >
        鱈魚的魚缸
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import BaseBtn from '../../base-btn.vue';
import CursorSidekick from '../cursor-sidekick.vue';
</script>
