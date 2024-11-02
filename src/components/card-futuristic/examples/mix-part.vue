<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border rounded p-4"
    />

    <div class="flex flex-wrap justify-center gap-16">
      <card-futuristic
        v-for="item, i in list"
        :key="i"
        v-on-click-outside="() => item.selected = false"
        v-bind="item"
        class="font-orbitron"
        @click="item.selected = true"
      >
        <div class="flex flex-col gap-4">
          <div
            v-if="item.title"
            class="text-xl font-bold"
          >
            {{ item.title }}
          </div>

          <div>
            {{ item.text }}
          </div>
        </div>
      </card-futuristic>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Writable } from 'type-fest'
import type { ExtractComponentProps } from '../../../types'
import { vOnClickOutside } from '@vueuse/components'
import { promiseTimeout } from '@vueuse/core'
import { map, pipe } from 'remeda'
import { ref, watch } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import CardFuturistic from '../card-futuristic.vue'

type CardProp = Writable<ExtractComponentProps<typeof CardFuturistic>> & {
  title?: string;
  text?: string;
}

const list = ref(pipe(
  [
    {
      title: '鱈魚 Codfish',
      text: '最擅長的球類是地瓜球',
    },
    {
      title: '鱈魚 Codfish',
      text: '最擅長的球類是地瓜球',
      corner: { type: 'quote' },
      content: {
        type: 'scale',
        class: 'p-4',
      },
      bg: { type: 'halftone' },
      border: null,
      animeSequence: {
        visible: {
          content: { delay: 200 },
          bg: { delay: 400 },
        },
      },
    },
    {
      title: '鱈魚 Codfish',
      corner: null,
      bg: { type: 'halftone' },
      border: null,
      animeSequence: {
        visible: {
          content: { delay: 200 },
          bg: { delay: 400 },
        },
      },
    },
  ] satisfies CardProp[],
  map((data) => ({
    ...data,
    visible: false,
    selected: false,
  })),
))

const visible = ref(false)
watch(visible, async (value) => {
  for (const data of list.value) {
    data.visible = value
    await promiseTimeout(200)
  }
})
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Orbitron:wght@400..900&family=Oxanium:wght@200..800&display=swap')

.font-orbitron
  font-family: "Orbitron", sans-serif

.font-oxanium
  font-family: "Oxanium", sans-serif
</style>
