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
import { ref } from 'vue';

import TransitionShape, {
  TransitionType
} from '../transition-shape.vue';

import { useIntervalFn } from '@vueuse/core';

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
  {
    name: 'round',
    enter: {
      action: 'scale',
      duration: 1000,
      delay: 100,
      easing: 'easeInOutExpo',
    },
    leave: {
      action: 'scale',
      duration: 1000,
      delay: 100,
      easing: 'easeInOutExpo',
    },
    colors: ['#FF0000', '#00FF00', '#0000FF'],
  },
]
</script>
