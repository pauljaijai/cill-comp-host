<template>
  <div class="w-full flex flex-col items-center justify-center gap-4 border border-gray-300 p-6">
    <div class="w-full flex gap-4 border rounded p-4">
      <base-btn
        label="移動"
        @click="run"
      />
      <base-btn
        label="返回"
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
import { ref } from 'vue'
import BaseBtn from '../../base-btn.vue'
import BtnNaughty from '../btn-naughty.vue'

const btn = ref<InstanceType<typeof BtnNaughty>>()
function run() {
  btn.value?.run()
}
function back() {
  btn.value?.back()
}
</script>
