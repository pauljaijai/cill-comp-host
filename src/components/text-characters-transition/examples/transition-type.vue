<template>
  <div class="w-full flex flex-col gap-4">
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
          class="pointer-events-none"
        />

        <div class="absolute bottom-0 left-0 p-2 px-3 text-sm font-normal tracking-normal opacity-20">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Writable } from 'type-fest'
import type { ExtractComponentProps } from '../../../types'
import { addProp, map } from 'remeda'
import { ref } from 'vue'
import TextCharactersTransition from '../text-characters-transition.vue'

type Param = Writable<ExtractComponentProps<typeof TextCharactersTransition>>
type Item = Pick<Param, 'name' | 'visible'>

const list = ref(
  map(
    [
      { name: 'clip-right' },
      { name: 'random-spin' },
      { name: 'landing' },
      { name: 'flicker' },
      { name: 'converge' },
      { name: 'whirling' },
      { name: 'gather' },
      { name: 'emerge' },
    ] satisfies Item[],
    addProp('visible', false),
  ),
)

function toggleVisible(item: Pick<Param, 'visible'>) {
  item.visible = !item.visible
}
</script>

<style scoped lang="sass">
.clickable-box
  cursor: pointer
  transition-duration: 0.4s
  &:active
    transition-duration: 0.1s
    scale: 0.98
</style>
