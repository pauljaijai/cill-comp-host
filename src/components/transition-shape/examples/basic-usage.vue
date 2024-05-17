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

    <transition-shape appear>
      <div
        :key="fish"
        class="text-3xl"
      >
        {{ fish }}
      </div>
    </transition-shape>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import TransitionShape from '../transition-shape.vue';
import { pipe, sample } from 'remeda';

const state = ref(true);

const fish = ref('🐟');
const fishList = [
  '🐟', '🐋', '🐠', '🐡'
];
watch(state, () => {
  fish.value = pipe(
    fishList,
    sample(1),
    ([value]) => value ?? fishList[0]!
  );
});
</script>
