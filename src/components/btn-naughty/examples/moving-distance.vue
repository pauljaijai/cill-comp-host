<template>
  <div class="w-full flex flex-col items-center justify-center gap-4 border border-gray-300 p-6">
    <base-input
      v-model="maxMultiple"
      type="number"
      outlined
      label="倍數"
    />

    <btn-naughty
      label="按鈕"
      class="font-bold"
      disabled
      :max-distance-multiple="maxMultiple"
      z-index="30"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../../base-input.vue'
import BtnNaughty from '../btn-naughty.vue'

const maxMultiple = ref(5)
</script>
