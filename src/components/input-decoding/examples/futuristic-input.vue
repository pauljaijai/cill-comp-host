<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="visible"
        label="顯示輸入框"
        class="p-4"
      />
    </div>

    <div class="flex flex-col items-center gap-4 py-6">
      <card-futuristic
        :visible
        v-bind="cardParams"
      >
        <input-decoding
          v-model="text"
          class="font-orbitron px-3 py-2"
          :class="{ 'pointer-events-none': !visible }"
          charset="ᚠᚢᚦᚨᚱᚳᚷᚹᚻᚾᛁᛂᛇᛈᛉᛊᛏᛒᛖᛗᛚᛝᛟᛡᛢᛣᛤᛥᛦᛧᛨ"
        />
      </card-futuristic>

      <div class="font-orbitron">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import CardFuturistic from '../../card-futuristic/card-futuristic.vue'
import InputDecoding from '../input-decoding.vue'

type CardParams = ExtractComponentProps<typeof CardFuturistic>

const visible = ref(false)
const text = ref('codlin')

const cardParams: CardParams = {
  corner: {
    type: 'square',
    size: 2,
  },
  bg: null,
  content: {
    type: 'typical',
    class: 'p-1',
  },
  border: {
    type: 'typical',
    color: '#BBB',
  },
  animeSequence: {
    visible: {
      corner: { delay: 0 },
      border: { delay: 400 },
      content: { delay: 500 },
    },
    hidden: {
      corner: { delay: 400 },
      border: { delay: 0 },
      content: { delay: 0 },
    },
  },
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Orbitron:wght@400..900&family=Oxanium:wght@200..800&display=swap')

.font-orbitron
  font-family: "Orbitron", sans-serif
</style>
