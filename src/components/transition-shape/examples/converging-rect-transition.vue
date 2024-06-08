<template>
  <div
    ref="boxRef"
    class="flex flex-col justify-center gap-4 w-full border border-gray-300 p-6"
  >
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
            class="text-[5rem] py-5 text-center w-full cursor-pointer"
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
import { throttle, debounce } from 'lodash-es';
import { map, pipe, reverse } from 'remeda';

import BaseCheckbox from '../../base-checkbox.vue';
import TransitionShape, {
  TransitionType, ConvergingRectAction,
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
}, 3000, {
  leading: true,
  trailing: false,
});

type Item = TransitionType & {
  key: string;
}
const list: Item[] = pipe(
  [0, 10, -30],
  map((angle) => {
    const action = ConvergingRectAction.SLIDE;

    const result: Item = {
      key: action,
      name: 'converging-rect',
      enter: {
        action,
        angle,
        duration: 800,
        delay: 100,
        easing: 'easeOutExpo',
      },
      leave: {
        action,
        duration: 800,
        delay: 100,
        easing: 'easeInExpo',
      },
      colors: [
        '#27A4F2', '#44C1F2', '#85DEF2',
        '#DCEEF2', '#91E9F2',
      ],
    }

    return result;
  }),
);


</script>
