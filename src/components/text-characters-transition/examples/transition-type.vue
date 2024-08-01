<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex flex-col items-center gap-2 text-3xl font-bold tracking-wider">
      <div
        v-for="(item, i) in list"
        :key="i"
        class="clickable-box relative border px-10 py-4"
        :class="{ 'border-x-4': item.visible }"
        @click="toggleVisible(item)"
      >
        <text-characters-transition
          label="一段展示用的文字"
          v-bind="item"
          class=" pointer-events-none"
        />

        <div class=" absolute left-0 bottom-0 p-2 px-3 text-sm font-normal tracking-normal opacity-20">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ExtractComponentProps } from '../../../types';
import { addProp, map } from 'remeda';

import TextCharactersTransition from '../text-characters-transition.vue';

type Param = ExtractComponentProps<typeof TextCharactersTransition>
type Item = Pick<Param, 'name' | 'visible'>;

const list = ref<Item[]>(
  map(
    [
      { name: 'blur' },
      { name: 'clip-right' },
      { name: 'random-spin' },
      { name: 'landing' },
      { name: 'flicker' },
      { name: 'converge' },
      { name: 'whirling' },
    ] as const,
    addProp('visible', false),
  )
);

function toggleVisible(item: Pick<Param, 'visible'>) {
  item.visible = !item.visible;
}
</script>

<style scoped lang="sass">
.clickable-box
  cursor: pointer
  transition-duration: 0.4s
  &:hover
    background-color: rgba(#CCC, 0.1)
  &:active
    transition-duration: 0.05s
    scale: 0.99
</style>
