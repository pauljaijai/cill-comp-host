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
import { throttle, debounce, shuffle } from 'lodash-es';
import { hasAtLeast, map, pipe, reverse } from 'remeda';

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

    const colors = shuffle(['#27A4F2', '#44C1F2', '#85DEF2', '#DCEEF2', '#91E9F2',]);
    if (!hasAtLeast(colors, 1)) {
      throw new Error('At least one color is required');
    }

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
      colors,
    }

    return result;
  }),
);


</script>
