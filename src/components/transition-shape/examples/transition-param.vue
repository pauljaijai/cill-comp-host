<template>
  <div class="flex flex-col items-start gap-4 w-full border border-gray-300 p-6">
    <div class="flex flex-col gap-2 w-full">
      <div class="border flex items-center p-1 gap-3 w-full">
        <div class=" flex-1 text-right">
          顏色
        </div>
        <div class="flex flex-1 gap-1 p-2">
          <input
            v-model="colors[0]"
            type="color"
            class="flex-1 "
          >
          <input
            v-model="colors[1]"
            type="color"
            class="flex-1"
          >
          <input
            v-model="colors[2]"
            type="color"
            class="flex-1"
          >
        </div>
      </div>

      <!-- 進入 -->
      <div class="border flex flex-col items-center p-1 gap-1 w-full">
        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            進入 action
          </div>
          <select
            v-model="rectAction.enter.action"
            class=" bg-slate-200 rounded flex-1 p-2"
          >
            <option
              v-for="option in rectActionOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            easing
          </div>
          <select
            v-model="rectAction.enter.easing"
            class=" bg-slate-200 rounded flex-1 p-2"
          >
            <option
              v-for="option in easingOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            delay (ms)
          </div>
          <input
            v-model.number="rectAction.enter.delay"
            type="number"
            class=" bg-slate-200 rounded min-w-0 flex-1 p-2"
          >
        </div>

        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            duration (ms)
          </div>
          <input
            v-model.number="rectAction.enter.duration"
            type="number"
            class=" bg-slate-200 rounded min-w-0 flex-1 p-2"
          >
        </div>
      </div>

      <!-- 離開 -->
      <div class="border flex flex-col items-center p-1 gap-1 w-full">
        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            離開 action
          </div>
          <select
            v-model="rectAction.leave.action"
            class=" bg-slate-200 rounded flex-1 p-2"
          >
            <option
              v-for="option in rectActionOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            easing
          </div>
          <select
            v-model="rectAction.leave.easing"
            class=" bg-slate-200 rounded flex-1 p-2"
          >
            <option
              v-for="option in easingOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            delay (ms)
          </div>
          <input
            v-model.number="rectAction.leave.delay"
            type="number"
            class=" bg-slate-200 rounded min-w-0 flex-1 p-2"
          >
        </div>

        <div class=" flex items-center p-1 gap-3 w-full">
          <div class=" flex-1 text-right">
            duration (ms)
          </div>
          <input
            v-model.number="rectAction.leave.duration"
            type="number"
            class=" bg-slate-200 rounded min-w-0 flex-1 p-2"
          >
        </div>
      </div>

      <base-btn
        class="w-full "
        label="換魚"
        @click="changeFish()"
      />
    </div>

    <transition-shape :type="transitionType">
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
import { ref, computed } from 'vue';
import anime from 'animejs';

import BaseBtn from '../../base-btn.vue';
import TransitionShape, {
  RectAction, TransitionType,
} from '../transition-shape.vue';

const fishIndex = ref(0);
const fishList = [
  '🐟', '🐋', '🐠', '🐡'
];
function changeFish() {
  fishIndex.value++;
  fishIndex.value %= fishList.length;
}

const colors = ref<
  [string, string, string]
>(['#7DC8FF', '#677580', '#374855'])
const rectAction = ref<
  Record<'enter' | 'leave', {
    action: `${RectAction}`;
    easing: anime.EasingOptions;
    delay: number;
    duration: number;
  }>
>({
  enter: {
    action: 'slide-right',
    easing: 'easeOutQuart',
    delay: 100,
    duration: 800,
  },
  leave: {
    action: 'slide-right',
    easing: 'easeInQuart',
    delay: 100,
    duration: 800,
  },
});
const rectActionOptions = Object.values(RectAction);

const timingList = ['In', 'Out', 'InOut'];
const typeList = [
  'Quad', 'Cubic', 'Quart', 'Quint',
  'Sine', 'Expo', 'Circ', 'Back',
  'Elastic', 'Bounce',
];
const easingOptions = [
  'linear',
  ...typeList.flatMap((type) =>
    timingList.map((timing) => `ease${timing}${type}`)
  ),
];


const transitionType = computed<TransitionType>(() => ({
  name: 'rect',
  enter: rectAction.value.enter,
  leave: rectAction.value.leave,
  colors: colors.value,
}));
</script>
