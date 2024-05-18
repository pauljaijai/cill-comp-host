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

      <div
        class="w-full text-center border rounded px-4 py-2 cursor-pointer "
        @click="changeFish()"
      >
        換魚
      </div>
    </div>

    <transition-shape
      :type="transitionType"
      appear
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
import { ref, watch, computed } from 'vue';
import anime from 'animejs';

import TransitionShape, {
  RectAction,
} from '../transition-shape.vue';
import { TransitionType } from '../type';

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
    easing: 'easeInOutExpo',
    delay: 100,
    duration: 800,
  },
  leave: {
    action: 'slide-right',
    easing: 'easeInOutExpo',
    delay: 100,
    duration: 800,
  },
});
const rectActionOptions = Object.values(RectAction);
const easingOptions = [
  'linear',
  'easeInQuad',
  'easeOutQuad',
  'easeInOutQuad',
  'easeInCubic',
  'easeOutCubic',
  'easeInOutCubic',
  'easeInQuart',
  'easeOutQuart',
  'easeInOutQuart',
  'easeInQuint',
  'easeOutQuint',
  'easeInOutQuint',
  'easeInSine',
  'easeOutSine',
  'easeInOutSine',
  'easeInExpo',
  'easeOutExpo',
  'easeInOutExpo',
  'easeInCirc',
  'easeOutCirc',
  'easeInOutCirc',
  'easeInBack',
  'easeOutBack',
  'easeInOutBack',
  'easeInElastic',
  'easeOutElastic',
  'easeInOutElastic',
  'easeInBounce',
  'easeOutBounce',
  'easeInOutBounce',
];
const transitionType = computed<TransitionType>(() => ({
  name: 'rect',
  enter: rectAction.value.enter,
  leave: rectAction.value.leave,
  colors: colors.value,
}));
</script>
