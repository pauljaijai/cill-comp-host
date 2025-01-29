<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6 text-center">
    <div class="flex flex-col gap-4">
      <base-input
        v-model="params.text"
        label="自定義文字"
        type="text"
        class="w-full text-left"
      />

      <base-input
        v-model.number="params.evasionRadius"
        :label="`閃避半徑：${params.evasionRadius}`"
        type="range"
        class="w-full text-left"
        :max="300"
        :step="1"
        :min="20"
      />

      <base-input
        v-model.number="params.stiffness"
        :label="`約束力：${params.stiffness}`"
        type="range"
        class="w-full text-left"
        :max="0.3"
        :step="0.001"
        :min="0.001"
      />

      <base-input
        v-model.number="params.damping"
        :label="`阻尼：${params.damping}`"
        type="range"
        class="w-full text-left"
        :max="1"
        :step="0.01"
        :min="0"
      />
    </div>

    <div class="border p-4">
      <text-hate-mouse v-bind="params" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { ref } from 'vue'
import BaseInput from '../../base-input.vue'
import TextHateMouse from '../text-hate-mouse.vue'

type Props = ExtractComponentProps<typeof TextHateMouse>

const params = ref({
  text: '哆啦哆啦哆啦哆啦哆啦 A 夢',
  evasionRadius: 40,
  stiffness: 0.01,
  damping: 0.05,
} satisfies Props)
</script>
