<template>
  <div
    ref="boxRef"
    class="flex flex-col justify-center gap-4 w-full border border-gray-300 p-6"
  >
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
          class="text-[5rem] text-center w-full"
        >
          {{ fishList[fishIndex] }}
        </div>
      </transition-shape>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import { hasAtLeast, map, pipe, reverse, shuffle } from 'remeda';

import TransitionShape, {
  TransitionType, FenceAction
} from '../transition-shape.vue';

import { useIntersectionObserver, useIntervalFn } from '@vueuse/core';

const fishIndex = ref(0);
const fishList = [
  '🐟', '🐋', '🐠', '🐡'
];

function changeFish() {
  fishIndex.value++;
  fishIndex.value %= fishList.length;
}

const { pause, resume } = useIntervalFn(() => {
  changeFish();
}, 4000);
pause()

const boxRef = ref();

const startInterval = debounce(() => {
  useIntersectionObserver(
    boxRef,
    ([item]) => {
      if (item?.isIntersecting) {
        resume();
      } else {
        pause();
      }
    },
  )
}, 1000);

const actions = Object.values(FenceAction);
// const actions = [FenceAction.SPREAD_RIGHT];
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
      name: 'fence',
      enter: {
        action,
        duration: 800,
        delay: 200,
        easing: 'easeInOutQuad',
      },
      leave: {
        action: targetAction,
        duration: 800,
        delay: 200,
        easing: 'easeInOutQuad',
      },
      colors: [
        '#D4F9FF', '#97D7E2',
        '#5CAAB8', '#2F7F8D',
        '#105663',
      ],
    }

    return result;
  }),
);


</script>
