<template>
  <div class="flex flex-wrap justify-center gap-4 w-full border border-gray-300 p-6">
    <div
      v-for="item in list"
      :key="item.key"
      class="w-1/3"
    >
      <transition-shape
        :type="item"
        @init="startInterval()"
      >
        <div
          :key="fishIndex"
          class="text-[6rem] text-center"
        >
          {{ fishList[fishIndex] }}
        </div>
      </transition-shape>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { debounce } from 'lodash-es';
import { map, pipe, reverse, shuffle } from 'remeda';

import TransitionShape, {
  TransitionType, RoundAction
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

const startInterval = debounce(() => {
  useIntervalFn(() => {
    changeFish();
  }, 4000);
}, 1000);

const actions = Object.values(RoundAction);
const reverseActions = pipe(actions, reverse());

type Item = TransitionType & {
  key: string;
}
const list: Item[] = pipe(
  actions,
  map.indexed((action, i) => {
    const targetAction = reverseActions[i] ?? action;

    const result: Item = {
      key: action,
      name: 'round',
      enter: {
        action,
        duration: 1000,
        delay: 200,
        easing: 'easeInOutExpo',
      },
      leave: {
        action: targetAction,
        duration: 1000,
        delay: 200,
        easing: 'easeInOutExpo',
      },
      colors: shuffle(['#BDF2ED', '#F2CEBD', '#B39689']),
    }

    return result;
  }),
);
</script>
