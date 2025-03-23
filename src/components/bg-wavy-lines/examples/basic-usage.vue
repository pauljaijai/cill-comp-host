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
      <select-stepper
        v-model="effect"
        label="效果"
        class="w-full"
        :options
      />

      <select-stepper
        v-model="mouseInteractionType"
        label="滑鼠互動"
        class="w-full"
        :options="mouseInteractionTypeOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { ref } from 'vue'
import SelectStepper from '../../select-stepper.vue'
import BgWavyLines from '../bg-wavy-lines.vue'

type Props = ExtractComponentProps<typeof BgWavyLines>

const effect = ref<Props['effect']>('orogeny')
const options: NonNullable<Props['effect']>[] = [
  'none',
  'wind',
  'waves',
  'orogeny',
]

type MouseInteractionType = NonNullable<Props['mouseInteraction']>['type']

const mouseInteractionType = ref<MouseInteractionType>('ripple')
const mouseInteractionTypeOptions: MouseInteractionType[] = [
  'smear',
  'black-hole',
  'white-hole',
  'ripple',
]
</script>
