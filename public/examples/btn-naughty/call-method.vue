<template>
  <div class="flex flex-col items-start gap-4 w-full">
    <div class="flex gap-4">
      <q-btn
        label="移動"
        color="cyan"
        unelevated
        @click="run"
      />
      <q-btn
        label="返回"
        color="teal"
        unelevated
        @click="back"
      />
    </div>
    <btn-naughty
      ref="btn"
      label="按鈕"
      z-index="30"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BtnNaughty from '@/components/btn-naughty/btn-naughty.vue';

const btn = ref<InstanceType<typeof BtnNaughty>>();
function run() {
  btn.value?.run();
}
function back() {
  btn.value?.back();
}
</script>
