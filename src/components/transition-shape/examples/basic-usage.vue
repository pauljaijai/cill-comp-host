<template>
  <div class="flex flex-col items-start gap-4 w-full border border-gray-300 p-6">
    <base-checkbox
      v-model="state"
      label="切換"
      class=" border p-4 rounded w-full"
    />

    <transition-shape appear>
      <div
        v-if="state"
        class="text-xl"
      >
        我是一隻鱈魚 🐟
      </div>
    </transition-shape>

    <div
      class="border rounded px-4 py-2 cursor-pointer"
      @click="changeFish()"
    >
      換魚
    </div>

    <transition-shape appear>
      <div
        :key="fishIndex"
        class="text-[6rem]"
      >
        {{ fishList[fishIndex] }}
      </div>
    </transition-shape>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { pipe, sample } from 'remeda';

import BaseCheckbox from '../../base-checkbox.vue';
import TransitionShape from '../transition-shape.vue';

const state = ref(true);

const fishIndex = ref(0);
const fishList = [
  '🐟', '🐋🐋', '🐠', '🐡🐡'
];
function changeFish() {
  fishIndex.value++;
  fishIndex.value %= fishList.length;
}
</script>
