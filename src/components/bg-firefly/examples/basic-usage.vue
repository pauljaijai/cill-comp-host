<template>
  <div class="flex flex-col gap-4 w-full py-2">
    <div class="flex flex-col border p-4">
      <div class="flex gap-6 ">
        <div class="flex flex-col">
          <label class=" text-sm font-bold">
            主色
          </label>

          <input
            v-model="color"
            type="color"
          >
        </div>

        <base-input
          v-model.number="quantity"
          type="range"
          :label="`最大數量: ${quantity}`"
          class="flex-1 "
          :min="100"
          :step="1"
          :max="10000"
        />

        <base-input
          v-model.number="emitRate"
          type="range"
          :label="`發射頻率: ${emitRate}`"
          class="flex-1 "
          :min="100"
          :step="1"
          :max="5000"
        />
      </div>

      <div
        class="border rounded px-4 py-2 cursor-pointer select-none w-full text-center"
        @click="refresh()"
      >
        重新產生
      </div>
    </div>


    <bg-firefly
      :key="key"
      v-slot="{ fps }"
      class="bg w-full h-full"
      :color="color"
      :quantity="quantity"
      :emit-rate="emitRate"
    >
      <div class="text-white absolute top-0 left-0 p-4">
        {{ fps }}
      </div>
    </bg-firefly>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseInput from '../../base-input.vue';
import BgFirefly from '../bg-firefly.vue';

const color = ref('#a4f522');
const quantity = ref(5000);
const emitRate = ref(100);

const key = ref('');
function refresh() {
  key.value = Math.random().toFixed(5)
}
</script>

<style scoped lang="sass">
.bg
  background: linear-gradient(to top, #102b19, #191f1b)
</style>
