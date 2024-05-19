<template>
  <div class="flex flex-col items-start gap-4 w-full border border-gray-300 p-6">
    <div
      v-for="item in list"
      :key="item.key"
      class="w-full"
    >
      <transition-shape
        :type="item"
        @init="startInterval()"
      >
        <div
          :key="fishIndex"
          class="text-[10rem] w-full text-center"
        >
          {{ fishList[fishIndex] }}
        </div>
      </transition-shape>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import TransitionShape, {
  TransitionType
} from '../transition-shape.vue';

import { useIntervalFn } from '@vueuse/core';
import { nanoid } from 'nanoid';
import { debounce } from 'lodash-es';

const fishIndex = ref(0);
const fishList = [
  '🐟', '🐋', '🐠', '🐡'
];

function changeFish() {
  fishIndex.value++;
  fishIndex.value %= fishList.length;
}

const startInterval = debounce(() => {
  console.log("🚀 ~ startInterval:")
  useIntervalFn(() => {
    changeFish();
  }, 4000);
}, 500);

type Item = TransitionType & {
  key: string;
}
const list: Item[] = [
  {
    key: nanoid(),
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
    colors: ['#BDF2ED', '#B39689', '#F2CEBD', '#6C9D98'],
  },
  {
    key: nanoid(),
    name: 'round',
    enter: {
      action: 'slide-lb',
      duration: 1000,
      delay: 200,
      easing: 'easeInOutExpo',
    },
    leave: {
      action: 'slide-lb',
      duration: 1000,
      delay: 200,
      easing: 'easeInOutExpo',
    },
    colors: ['#BDE6F2', '#BDF2DB', '#F2CEBD'],
  },
]
</script>
