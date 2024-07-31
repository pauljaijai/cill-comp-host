<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border p-4 rounded"
    />

    <div class="flex-1 flex flex-col justify-around items-center gap-2 text-xl">
      <text-characters-transition
        v-for="(item, i) in list"
        :key="i"
        :visible="visible"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import TextCharactersTransition from '../text-characters-transition.vue';
import { ExtractComponentProps } from '../../../types';
import anime from 'animejs';
import { sample } from 'remeda';

type Param = ExtractComponentProps<typeof TextCharactersTransition>

const visible = ref(false);

const negativeList = [1, -1] as const;
const randomNegative = () => sample(negativeList, 1)[0];

const list: Array<
  Pick<Param, 'label' | 'name' | 'enter' | 'leave'> & {
    class?: string;
  }
> = [
    {
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
      label: ['人', '和', '程式', '，', '一個', '能跑', '就行'],
      class: 'tracking-[0.2rem]',
      enter: (i) => ({
        opacity: 1,
        fontSize: [
          '0rem',
          '1.25rem',
        ],
        // easing: 'easeOutBack',
        duration: 1400,
        delay: i * 100,
      }),
      leave: (i) => ({
        opacity: 1,
        fontSize: [
          { value: '3rem', easing: 'easeInOutQuint' },
          { value: '0rem', easing: 'easeInOutQuint' },
        ],
        duration: 600,
        delay: i * 40,
      }),
    },
    {
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
  ]
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=Noto+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap')

.font-wenkai 
  font-family: "LXGW WenKai Mono TC", monospace
  font-weight: 400
  font-style: normal
  color: #222
  text-shadow: 0 0 10px rgba(#111, 0.2)

</style>
