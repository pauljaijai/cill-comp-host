<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border rounded p-4"
    />

    <div class="flex flex-col gap-2">
      <text-characters-transition
        :visible="visible"
        label="一隻熱愛程式的魚，但是沒有手指可以打鍵盤，更買不到能在水裡用的電腦。"
        :splitter="/(，)/"
      />

      <text-characters-transition
        :visible="visible"
        :label="[
          '鱈魚', '是一種', '很油', '很油', '的', '肥魚',
        ]"
        :enter="(i) => ({
          delay: i * 200,
        })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import TextCharactersTransition from '../text-characters-transition.vue'

const visible = ref(false)
</script>
