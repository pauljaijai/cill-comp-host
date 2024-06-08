<template>
  <div class="flex flex-wrap justify-center gap-4 w-full border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="w-full border rounded p-4"
    />

    <template v-if="visible">
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
            class="py-6 text-[5rem] text-center w-full cursor-pointer"
            @click="handleClick()"
          >
            {{ fishList[fishIndex] }}
          </div>
        </transition-shape>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { debounce, throttle } from 'lodash-es';
import { hasAtLeast, map, pipe, shuffle } from 'remeda';

import BaseCheckbox from '../../base-checkbox.vue';
import TransitionShape, {
  TransitionType, RoundEnterAction, RoundBaseAction
} from '../transition-shape.vue';

import { useToggle } from '@vueuse/core';

const visible = ref(false);

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
}, 4000, {
  leading: true,
  trailing: false,
});

const leaveActions = Object.values(RoundBaseAction);
const enterActions = [
  RoundEnterAction.SPREAD_LEFT,
  RoundEnterAction.SPREAD_SCALE,
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

    const colors = shuffle(['#27A4F2', '#44C1F2', '#85DEF2', '#DCEEF2', '#91E9F2',]);
    if (!hasAtLeast(colors, 1)) {
      throw new Error('At least one color is required');
    }

    const result: Item = {
      key: action,
      name: 'round',
      enter: {
        action,
        duration: 900,
        delay: 200,
        easing: 'easeOutExpo',
      },
      leave: {
        action: leaveAction,
        duration: 900,
        delay: 200,
        easing: 'easeInExpo',
      },
      colors,
    }

    return result;
  }),
);
</script>
