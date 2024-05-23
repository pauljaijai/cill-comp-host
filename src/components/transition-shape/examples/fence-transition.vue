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
        @after-transition="handleInit()"
      >
        <div
          :key="fishIndex"
          class="text-[5rem] text-center w-full cursor-pointer"
          @click="handleClick()"
        >
          {{ fishList[fishIndex] }}
        </div>
      </transition-shape>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { throttle, debounce } from 'lodash-es';
import { map, pipe, reverse } from 'remeda';

import TransitionShape, {
  TransitionType, FenceAction
} from '../transition-shape.vue';

import { useToggle } from '@vueuse/core';

const fishIndex = ref(0);
const fishList = [
  '🐟', '🐋', '🐠', '🐡'
];

function changeFish() {
  fishIndex.value++;
  fishIndex.value %= fishList.length;
}

const [isReady, toggleReady] = useToggle(false);

const handleInit = debounce(() => {
  toggleReady(true);
}, 1000);

const handleClick = throttle(() => {
  if (!isReady.value) {
    handleClick.cancel();
    return;
  }

  changeFish();
}, 3000, {
  leading: true,
  trailing: false,
});

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
        delay: 100,
        easing: 'easeOutExpo',
      },
      leave: {
        action: targetAction,
        duration: 800,
        delay: 100,
        easing: 'easeInExpo',
      },
      colors: [
        '#27A4F2', '#44C1F2',
        '#85DEF2', '#DCEEF2',
        '#91E9F2',
      ],
    }

    return result;
  }),
);


</script>
