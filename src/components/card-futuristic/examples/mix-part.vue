<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border rounded p-4"
    />

    <div class="flex flex-wrap justify-center gap-20">
      <card-futuristic
        v-for="item, i in list"
        :key="i"
        v-on-click-outside="() => item.selected = false"
        v-bind="item"
        class="font-orbitron"
        @click="item.selected = true"
      >
        <div class="flex flex-col">
          <div
            v-if="item.title"
            :class="item.titleClass"
          >
            {{ item.title }}
          </div>

          <div
            v-if="item.text"
            :class="item.textClass"
          >
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
  titleClass?: string;
  text?: string;
  textClass?: string;
}

const list = ref(pipe(
  [
    {
      title: 'COD-00',
      titleClass: 'text-xl font-bold',
      text: 'FUTURISTIC CARD',
      bg: { type: 'halftone' },
      border: {
        type: 'specific',
        selectedColor: '#FFF',
        strokeWidth: 1,
        side: {
          t: {},
          l: {},
          b: {},
          r: {},
        },
      },
      animeSequence: {
        visible: {
          border: { duration: 400 },
        },
      },
    },
    {
      title: 'CARD-01',
      titleClass: 'text-xl font-bold',
      text: 'QUOTE CORNER',
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
      title: 'CARD-02',
      titleClass: 'text-xl font-bold text-white',
      text: 'SOLID BACKGROUND',
      textClass: 'text-white',
      corner: null,
      bg: {
        type: 'solid',
        selectedColor: '#444',
      },
      content: {
        type: 'typical',
        class: 'p-4 pl-6',
      },
      border: { type: 'specific' },
      animeSequence: {
        visible: {
          border: { delay: 400 },
        },
      },
    },
    {
      title: 'CARD-03',
      titleClass: 'text-xl font-bold ',
      text: 'BORDER SIDE',
      textClass: '',
      corner: null,
      bg: {
        type: 'typical',
        margin: '0',
      },
      border: { type: 'side' },
      animeSequence: {
        normal: {
          border: { delay: 0 },
        },
        visible: {
          border: { delay: 0 },
          bg: { delay: 200 },
          content: { delay: 300 },
        },
        hidden: {
          border: { delay: 300 },
          bg: { delay: 0 },
          content: { delay: 0 },
        },
      },
    },
    {
      title: 'ERROR',
      titleClass: 'text-2xl font-bold text-[#ba2507] ',
      text: 'FISH OVERWEIGHT',
      textClass: 'text-[#ba2507]',
      corner: null,
      bg: {
        type: 'typical',
        margin: '4px 0px',
        color: '#fecaca',
      },
      content: {
        type: 'typical',
        class: 'py-4 px-8',
      },
      border: {
        type: 'specific',
        color: '#ff2b00',
        selectedColor: '#FFF',
        strokeWidth: 2,
        side: {
          t: {},
          b: {},
        },
      },
      animeSequence: {
        normal: {
          border: { delay: 0 },
        },
        visible: {
          border: { delay: 0 },
          bg: { delay: 400 },
          content: { delay: 500 },
        },
        hidden: {
          border: { delay: 300 },
          bg: { delay: 0 },
          content: { delay: 0 },
        },
        // null 表示停用動畫
        selected: {
          content: null,
        },
        hover: {
          content: null,
        },
      },
    },
  ] as CardProp[],
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
