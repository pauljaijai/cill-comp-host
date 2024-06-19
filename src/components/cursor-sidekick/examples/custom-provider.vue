<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <cursor-sidekick
      v-if="enable"
      color="#35abf0"
    />

    <base-checkbox
      v-model="enable"
      label="啟用小跟班"
      class="py-1 px-2 border rounded bg-gray-100"
    />

    <div class="flex flex-col gap-2">
      <div class="">
        嘗試反白這段文字中有鱈魚的部分和沒有鱈魚的部分，看看有甚麼差別。
      </div>

      <hr>

      <base-btn label="按鈕" />
      <base-btn
        disabled
        label="不可以瑟瑟 (。・ω・。)"
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
</script>
