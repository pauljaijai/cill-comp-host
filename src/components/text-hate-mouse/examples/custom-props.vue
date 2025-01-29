<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6 text-center">
    <div class="flex flex-col p-4">
      <base-input
        v-model="params.text"
        label="自定義文字"
        type="text"
        class="w-full p-2 text-left"
      />

      <base-input
        v-model.number="params.stiffness"
        :label="`約束力：${params.stiffness}`"
        type="range"
        class="w-full p-2 text-left"
        :max="0.3"
        :step="0.001"
        :min="0.001"
      />

      <base-input
        v-model.number="params.damping"
        :label="`阻尼：${params.damping}`"
        type="range"
        class="w-full p-2 text-left"
        :max="1"
        :step="0.01"
        :min="0"
      />
    </div>

    <text-hate-mouse v-bind="params" />
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { ref } from 'vue'
import BaseInput from '../../base-input.vue'
import TextHateMouse from '../text-hate-mouse.vue'

type Props = ExtractComponentProps<typeof TextHateMouse>

const params = ref({
  text: '字字字字字字',
  evasionRadius: 40,
  stiffness: 0.01,
  damping: 0.05,
} satisfies Props)
</script>
