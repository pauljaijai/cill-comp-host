<template>
  <div class="w-full flex flex-col gap-4 py-2">
    <div class="flex flex-col gap-2 border p-4">
      <div class="flex gap-6">
        <base-input
          v-model.number="quantity"
          type="range"
          :label="`數量: ${quantity}`"
          class="flex-1"
          :min="100"
          :step="1"
          :max="10000"
        />
      </div>

      <div
        class="w-full cursor-pointer select-none border rounded px-4 py-2 text-center"
        @click="refresh()"
      >
        重新產生
      </div>
    </div>

    <bg-sakura-fubuki
      v-slot="{ fps }"
      :key="key"
      :capacity="quantity"
      :particle-size="{ width: 1.05, height: 1.5 }"
      class="bg h-full w-full"
    >
      <div class="absolute left-0 top-0 p-4 opacity-40">
        {{ fps }}
      </div>
    </bg-sakura-fubuki>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../../base-input.vue'
import BgSakuraFubuki from '../bg-sakura-fubuki.vue'

const quantity = ref(500)

const key = ref('')
function refresh() {
  key.value = Math.random().toFixed(5)
}
</script>

<style scoped lang="sass">
.bg
  background: linear-gradient(20deg, #def4ff, #FFF)
</style>
