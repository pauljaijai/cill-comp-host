<template>
  <div class="w-full flex flex-col gap-4">
    <bg-wavy-lines
      v-slot="{ fps }"
      :effect
      :mouse-interaction="{ type: mouseInteractionType }"
      class="h-full w-full touch-none border border-gray-300"
    >
      <div class="absolute left-2 top-2 opacity-40">
        {{ fps }}
      </div>
    </bg-wavy-lines>

    <div class="flex gap-6">
      <div class="flex-1">
        <div class="mb-1">
          效果
        </div>

        <div class="border-2 border-[#999] rounded">
          <select
            v-model="effect"
            class="w-full p-2"
          >
            <option
              v-for="option in options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex-1">
        <div class="mb-1">
          滑鼠互動
        </div>

        <div class="border-2 border-[#999] rounded">
          <select
            v-model="mouseInteractionType"
            class="w-full p-2"
          >
            <option
              v-for="option in mouseInteractionTypeOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { ref } from 'vue'
import BgWavyLines from '../bg-wavy-lines.vue'

type Props = ExtractComponentProps<typeof BgWavyLines>

const effect = ref<Props['effect']>('none')
const options: Props['effect'][] = [
  'none',
  'wind',
]

type MouseInteractionType = NonNullable<Props['mouseInteraction']>['type']

const mouseInteractionType = ref<MouseInteractionType>('smear')
const mouseInteractionTypeOptions: MouseInteractionType[] = [
  'smear',
  'black-hole',
  'white-hole',
]
</script>
