<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex-1 flex flex-col justify-around items-center gap-2 text-xl">
      <div
        v-for="(item, i) in list"
        :key="i"
        class=" clickable-box border px-10 py-4"
        :class="{ 'border-x-4': item.visible }"
        @click="toggleVisible(item)"
      >
        <text-characters-transition v-bind="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ExtractComponentProps } from '../../../types';
import anime from 'animejs';
import { sample } from 'remeda';

import TextCharactersTransition from '../text-characters-transition.vue';

type Param = ExtractComponentProps<typeof TextCharactersTransition>
type Item = Pick<Param, 'label' | 'enter' | 'leave' | 'visible'> & {
  class?: string;
};

const negativeList = [1, -1] as const;
const randomNegative = () => sample(negativeList, 1)[0];

const list = ref<Item[]>([
  {
    visible: false,
    label: '程式如詩寫，美到無人解',
    class: 'font-wenkai tracking-[0.2rem]',
    enter: (i) => ({
      opacity: [0, 1],
      filter: ['blur(20px)', 'blur(0px)'],
      translateX: () => [
        anime.random(40, 60) * randomNegative(),
        0,
      ],
      translateY: () => [
        anime.random(50, 60) * randomNegative(),
        0
      ],
      delay: i * 100,
      duration: 1600,
      easing: 'easeOutCirc',
    }),
    leave: (i) => ({
      opacity: 0,
      filter: 'blur(20px)',
      delay: i * 50,
      duration: 900,
      easing: 'easeInCirc',
    }),
  },
  {
    visible: false,
    label: '人和程式，一個能跑就行',
    class: 'tracking-[0.2rem] perspective',
    enter: (i) => ({
      opacity: [1, 1],
      rotateX: [270, 0],
      easing: 'easeOutCirc',
      duration: 800,
      delay: i * 100,
    }),
    leave: (i) => ({
      opacity: [1, 1],
      rotateX: [0, -270],
      easing: 'easeInCirc',
      duration: 800,
      delay: i * 100,
    }),
  },
  {
    visible: false,
    class: 'font-bold tracking-wider',
    label: [
      {
        value: '聽說鱈魚的體重',
        enter: () => ({
          opacity: [0, 1],
        }),
        leave: () => ({
          opacity: 0,
          delay: 500,
        }),
      },
      {
        value: '沒有',
        enter: () => ({
          fontSize: [
            '0rem',
            '1.25rem',
          ],
          delay: 2000,
        }),
        leave: () => ({
          opacity: 0,
          delay: 500,
        }),
      },
      {
        value: '破百',
        enter: () => ({
          opacity: [0, 1],
          fontSize: [
            { value: '3rem' },
            { value: '1.25rem' },
          ],
          color: [
            { value: '#f00' },
            { value: '#000' },
          ],
          rotate: [
            { value: '10deg' },
            { value: '0deg' },
          ],
          delay: 500,
        }),
        leave: () => ({
          opacity: [
            { value: 1 },
            { value: 0 },
          ],
          fontSize: [
            { value: '3rem' },
            { value: '1.25rem' },
          ],
          color: [
            { value: '#f0f' },
            { value: '#000' },
          ],
          rotate: [
            { value: '-10deg' },
            { value: '0deg' },
          ],
        }),
      },
    ],
  },
])

function toggleVisible(item: Pick<Param, 'visible'>) {
  item.visible = !item.visible;
}
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=Noto+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap')

.font-wenkai 
  font-family: "LXGW WenKai Mono TC", monospace
  font-weight: 400
  font-style: normal
  color: #222
  text-shadow: 0 0 10px rgba(#111, 0.1)

.perspective
  perspective: 100px
  transform-style: preserve-3d

.clickable-box
  cursor: pointer
  transition-duration: 0.4s
  &:active
    transition-duration: 0.1s
    scale: 0.98
</style>
