<template>
  <div class="flex flex-wrap justify-center gap-4 w-full border border-gray-300 p-6">
    <div
      v-for="item in list"
      :key="item.key"
      class="w-full"
    >
      <transition-shape
        :type="item"
        @init="toggleReady(true)"
      >
        <div
          :key="fishIndex"
          class="py-6 text-[4rem] text-center w-full cursor-pointer"
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
import { throttle } from 'lodash-es';
import { hasAtLeast, map, pipe, shuffle } from 'remeda';

import TransitionShape, {
  TransitionType, RoundEnterAction, RoundBaseAction
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

const handleClick = throttle(() => {
  if (!isReady.value) {
    handleClick.cancel();
    return;
  }

  changeFish();
}, 4000, {
  leading: true,
  trailing: false,
});

const leaveActions = Object.values(RoundBaseAction);
const enterActions = [
  RoundEnterAction.SPREAD_LEFT,
  RoundBaseAction.SCALE,
  RoundBaseAction.SCALE_LB,
];

type Item = TransitionType & {
  key: string;
}
const list: Item[] = pipe(
  enterActions,
  map.indexed((action, i) => {
    const leaveAction = leaveActions[i % leaveActions.length];
    if (!leaveAction) {
      throw new Error('Leave action is required');
    }

    const colors = shuffle(['#BDF2ED', '#F2CEBD', '#B39689']);
    if (!hasAtLeast(colors, 1)) {
      throw new Error('At least one color is required');
    }

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
        action: leaveAction,
        duration: 1000,
        delay: 200,
        easing: 'easeInOutExpo',
      },
      colors,
    }

    return result;
  }),
);
</script>
