<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="visible"
      label="顯示"
      class="border rounded p-4"
    />

    <div class="flex justify-center">
      <card-futuristic
        v-for="item, i in list"
        :key="i"
        v-on-click-outside="() => item.selected = false"
        :visible
        :selected="item.selected"
        class="font-orbitron"
        @click="item.selected = true"
      >
        <div class="flex flex-col gap-4">
          <div class="text-xl font-bold">
            鱈魚 Codfish
          </div>

          <div>
            最擅長的球類是地瓜球
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
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import CardFuturistic from '../card-futuristic.vue'

const visible = ref(true)

const list = ref<
  Writable<ExtractComponentProps<typeof CardFuturistic>>[]
>([
  {
    selected: false,
  },
])
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Orbitron:wght@400..900&family=Oxanium:wght@200..800&display=swap')

.font-orbitron
  font-family: "Orbitron", sans-serif

.font-oxanium
  font-family: "Oxanium", sans-serif
</style>
