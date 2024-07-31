<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border p-4 rounded"
    />

    <div class="flex flex-col gap-2 text-3xl font-bold tracking-wider">
      <text-characters-transition
        v-for="({ name, enter, leave }, i) in list"
        :key="i"
        :visible="visible"
        label="一段展示用的文字"
        :name="name"
        :enter="enter"
        :leave="leave"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import TextCharactersTransition from '../text-characters-transition.vue';
import { ExtractComponentProps } from '../../../types';
import { useIntervalFn } from '@vueuse/core';

type Param = ExtractComponentProps<typeof TextCharactersTransition>

const visible = ref(false);
useIntervalFn(() => {
  visible.value = !visible.value;
}, 2000);

const list: Array<
  Pick<Param, 'name' | 'enter' | 'leave'>
> = [
    {},
    { name: 'blur' },
    { name: 'clip-right' },
    { name: 'random-spin' },
    { name: 'landing' },
    { name: 'flicker' },
    { name: 'converge' },
  ]
</script>
