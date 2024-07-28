<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border p-4 rounded"
    />

    <div class="flex flex-col gap-2">
      <text-characters-transition
        :visible="visible"
        label="我是鱈魚🐟"
        class="text-2xl tracking-wider"
      />

      <text-characters-transition
        :visible="visible"
        label="一段很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長的文字"
        :default-enter="() => ({
          opacity: [0, 1],
          delay: (el, i) => i * 5,
        })"
        :default-leave="() => ({
          opacity: [1, 0],
          delay: (el, i) => i * 5,
        })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import TextCharactersTransition from '../text-characters-transition.vue';

const visible = ref(false);
</script>
