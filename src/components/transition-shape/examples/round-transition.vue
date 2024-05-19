<template>
  <div class="flex flex-col items-start gap-4 w-full border border-gray-300 p-6">
    <transition-shape
      v-for="type, i in typeList"
      :key="i"
      :type="type"
    >
      <div
        :key="fishIndex"
        class="text-[10rem] w-full text-center"
      >
        {{ fishList[fishIndex] }}
      </div>
    </transition-shape>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import anime from 'animejs';
import { useIntervalFn } from '@vueuse/core';

import TransitionShape, {
  TransitionType
} from '../transition-shape.vue';

const fishIndex = ref(0);
const fishList = [
  '🐟', '🐋', '🐠', '🐡'
];

function changeFish() {
  fishIndex.value++;
  fishIndex.value %= fishList.length;
}

useIntervalFn(() => {
  changeFish();
}, 3000);

const typeList: TransitionType[] = [

]
</script>
