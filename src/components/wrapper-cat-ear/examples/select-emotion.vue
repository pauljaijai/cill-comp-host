<template>
  <div class="w-full py-10 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <div class=" border border-gray-300 rounded">
      <select
        v-model="emotion"
        class="  p-2"
      >
        <option
          v-for="option in emotionOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <wrapper-cat-ear :emotion="emotion">
      <div
        class="border rounded p-2 bg-white"
        v-text="`・ω・`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear :emotion="emotion">
      <div
        class="border rounded px-6 py-10 bg-white"
        v-text="`ʘ ᴥ ʘ`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear :emotion="emotion">
      <div
        class="border rounded px-14 py-10 bg-white"
        v-text="`◕ ω ◕`"
      />
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperCatEar, { EmotionName } from '../wrapper-cat-ear.vue';

const emotion = ref<`${EmotionName}`>('relaxed');

const emotionOptions = Object.values(EmotionName);
</script>
