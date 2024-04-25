<template>
  <div class="w-full py-10 border border-gray-300 flex flex-col gap-10 justify-center items-center">
    <div class="flex items-center p-10 border border-gray-300 rounded">
      <input
        v-model="mainColor"
        type="color"
      >

      <input
        v-model="innerColor"
        type="color"
      >

      <wrapper-cat-ear
        :main-color="mainColor"
        :inner-color="innerColor"
        class="ml-10"
      >
        <div
          class="rounded p-2 px-3  text-white "
          :style="{ backgroundColor: mainColor }"
          v-text="`◕ ω ◕`"
        />
      </wrapper-cat-ear>
    </div>

    <wrapper-cat-ear
      main-color="#3b3b3b"
      inner-color="#ffc2b8"
    >
      <div
        class="rounded p-2 px-3 bg-[#3b3b3b] text-white"
        v-text="`◕ ω ◕`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear
      main-color="#03a1fc"
      inner-color="#8f003e"
    >
      <div
        class="rounded p-2 px-3 bg-[#03a1fc] text-white"
        v-text="`◕ ω ◕`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear
      main-color="#ff852e"
      inner-color="#ffc2b8"
      class="mt-10"
    >
      <div
        class="rounded px-20 py-12 text-xl bg-[#ff852e] text-white"
        v-text="`> ◕ ω ◕ <`"
      />
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperCatEar from '../wrapper-cat-ear.vue';

const mainColor = ref('#b38546');
const innerColor = ref('#ffc2b8');
</script>
