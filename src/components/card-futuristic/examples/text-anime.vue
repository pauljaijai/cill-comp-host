<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="sticky top-20 z-10 border rounded bg-white p-4 md:relative md:top-0"
    />

    <div class="flex flex-wrap items-center justify-center gap-20">
      <card-futuristic
        v-for="item, i in list"
        :key="i"
        v-on-click-outside="() => item.selected = false"
        v-bind="item"
        class="font-orbitron"
        @click="item.selected = true"
      >
        <div class="flex flex-col gap-2">
          <card-futuristic-text
            v-if="item.title"
            :text="item.title"
            :class="item.titleClass"
            class="!m-0"
          />

          <card-futuristic-text
            v-for="line, j in item.text"
            :key="j"
            :text="line"
            :class="item.textClass"
            class="!m-0"
          />
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
import CardFuturisticText from '../card-futuristic-text.vue'

type CardProp = Writable<ExtractComponentProps<typeof CardFuturistic>> & {
  title?: string;
  titleClass?: string;
  text?: string[];
  textClass?: string;
}

const list = ref(pipe(
  [
    {
      title: 'Futuristic Card',
      titleClass: 'text-xl font-bold',
      text: [
        `此元件主要由 border、bg、corner、content 與 ornament 子元件組成，由 card 父元件負責調度動畫。`,
        `子元件可以任意組合，藉此產生 N 種有趣的樣式設計。`,
        `使用 Vue 綁定 SVG 的 Attr 進行繪圖，並使用 anime.js 實現動畫`,
      ],
      bg: {
        type: 'halftone',
        color: '#0001',
        dotSize: '1px',
        size: '10px',
      },
      corner: {
        type: 'square',
        size: 3,
      },
      border: {
        type: 'typical',
        color: '#777',
      },
      animeSequence: {
        visible: {
          corner: { delay: 0 },
          bg: { delay: 400 },
          border: { delay: 400 },
          content: { delay: 500 },
        },
        hidden: {
          corner: { delay: 400 },
          bg: { delay: 200 },
          border: { delay: 100 },
          content: { delay: 100 },
        },
        hover: {
          corner: null,
          border: null,
          content: null,
        },
        selected: {
          corner: null,
          border: null,
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
    await promiseTimeout(100)
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
