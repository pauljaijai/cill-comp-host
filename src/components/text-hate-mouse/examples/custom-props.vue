<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6 text-center">
    <text-hate-mouse
      v-for="item, i in list"
      :key="i"
      v-bind="item"
    />
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import TextHateMouse from '../text-hate-mouse.vue'

type Props = ExtractComponentProps<typeof TextHateMouse>

const list: Props[] = [
  {
    text: '怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕怕',
    stiffness: 0.2,
    damping: 0,
    evasionRadius: 30,
  },
  {
    text: '怕爆怕爆怕爆怕爆怕爆怕爆怕爆怕爆怕爆怕爆',
    evasionRadius: 200,
  },
]
</script>
