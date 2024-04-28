<template>
  <div class="w-full py-10 border border-gray-300 flex flex-col gap-10 justify-center items-center">
    <div class="flex items-center p-10 border border-gray-300 rounded">
      <input
        v-model="mainColor"
        type="color"
      >

      <input
        v-model="blushColor"
        type="color"
      >

      <wrapper-kirby-mouthful-mode
        is-mouthful
        :main-color="mainColor"
        :blush-color="blushColor"
        :body-rounded="9999"
        :mouth-rounded="9999"
        class="ml-10"
      >
        <div
          class="rounded px-10 py-14"
          v-text="`塞滿嘴`"
        />
      </wrapper-kirby-mouthful-mode>
    </div>

    <wrapper-kirby-mouthful-mode
      v-for="item, i in list"
      :key="i"
      is-mouthful
      v-bind="item"
      :body-rounded="9999"
      :mouth-rounded="9999"
    >
      <div
        class="rounded px-10 py-14 text-xl"
        v-text="`塞滿嘴`"
      />
    </wrapper-kirby-mouthful-mode>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperKirbyMouthfulMode from '../wrapper-kirby-mouthful-mode.vue';

const mainColor = ref('#FF9DC0');
const blushColor = ref('#FF639B');

const list = [
  {
    mainColor: '#ffea08',
    blushColor: '#fcb423',
  },
  {
    mainColor: '#5fd42c',
    blushColor: '#378c12',
  },
  {
    mainColor: '#f72a2a',
    blushColor: '#8f003e',
  },
]
</script>
