<template>
  <div class="w-full flex flex-col items-start gap-4 border border-gray-300 p-6">
    <div class="w-full flex flex-col gap-2">
      <div class="w-full flex items-center gap-3 border p-1">
        <div class="flex-1 text-right">
          顏色
        </div>
        <div class="flex flex-1 gap-1 p-2">
          <input
            v-model="colors[0]"
            type="color"
            class="flex-1"
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
      <div class="w-full flex flex-col items-center gap-1 border p-1">
        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            進入 action
          </div>
          <select
            v-model="rectAction.enter.action"
            class="flex-1 rounded bg-slate-200 p-2"
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

        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            easing
          </div>
          <select
            v-model="rectAction.enter.easing"
            class="flex-1 rounded bg-slate-200 p-2"
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

        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            delay (ms)
          </div>
          <input
            v-model.number="rectAction.enter.delay"
            type="number"
            class="min-w-0 flex-1 rounded bg-slate-200 p-2"
          >
        </div>

        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            duration (ms)
          </div>
          <input
            v-model.number="rectAction.enter.duration"
            type="number"
            class="min-w-0 flex-1 rounded bg-slate-200 p-2"
          >
        </div>
      </div>

      <!-- 離開 -->
      <div class="w-full flex flex-col items-center gap-1 border p-1">
        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            離開 action
          </div>
          <select
            v-model="rectAction.leave.action"
            class="flex-1 rounded bg-slate-200 p-2"
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

        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            easing
          </div>
          <select
            v-model="rectAction.leave.easing"
            class="flex-1 rounded bg-slate-200 p-2"
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

        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            delay (ms)
          </div>
          <input
            v-model.number="rectAction.leave.delay"
            type="number"
            class="min-w-0 flex-1 rounded bg-slate-200 p-2"
          >
        </div>

        <div class="w-full flex items-center gap-3 p-1">
          <div class="flex-1 text-right">
            duration (ms)
          </div>
          <input
            v-model.number="rectAction.leave.duration"
            type="number"
            class="min-w-0 flex-1 rounded bg-slate-200 p-2"
          >
        </div>
      </div>

      <base-btn
        class="w-full"
        label="換魚"
        @click="changeFish()"
      />
    </div>

    <transition-shape :type="transitionType">
      <div
        :key="fishIndex"
        class="w-full text-center text-[10rem]"
      >
        {{ fishList[fishIndex] }}
      </div>
    </transition-shape>
  </div>
</template>

<script setup lang="ts">
import type anime from 'animejs'
import type { TransitionType } from '../type'
import { computed, ref } from 'vue'
import BaseBtn from '../../base-btn.vue'
import TransitionShape from '../transition-shape.vue'
import { RectAction } from '../type'

const fishIndex = ref(0)
const fishList = [
  '🐟',
  '🐋',
  '🐠',
  '🐡',
]
function changeFish() {
  fishIndex.value++
  fishIndex.value %= fishList.length
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
})
const rectActionOptions = Object.values(RectAction)

const timingList = ['In', 'Out', 'InOut']
const typeList = [
  'Quad',
  'Cubic',
  'Quart',
  'Quint',
  'Sine',
  'Expo',
  'Circ',
  'Back',
  'Elastic',
  'Bounce',
]
const easingOptions = [
  'linear',
  ...typeList.flatMap((type) =>
    timingList.map((timing) => `ease${timing}${type}`),
  ),
]

const transitionType = computed<TransitionType>(() => ({
  name: 'rect',
  enter: rectAction.value.enter,
  leave: rectAction.value.leave,
  colors: colors.value,
}))
</script>
