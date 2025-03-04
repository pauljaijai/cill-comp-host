<template>
  <div class="w-full flex flex-col gap-8 border border-gray-300 p-6 text-center">
    <!-- 預算 radio -->
    <div class="flex flex-col items-start gap-4 border border-gray-300 rounded-xl p-6">
      <div class="font-bold">
        請選擇您的預算範圍：
      </div>

      <div class="w-full flex flex-wrap justify-between gap-4 whitespace-nowrap">
        <label
          v-for="item, i in budgetList"
          :key="i"
        >
          <input
            v-model="budget"
            type="radio"
            :value="i"
          >
          {{ item.text }}
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-1 p-6">
      <text-hate-mouse
        v-for="item, i in list"
        :key="i"
        v-bind="item"
        :evasion-radius
        class="!m-0"
        :class="{ 'select-none': evasionRadius > 0 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { computed, ref } from 'vue'
import TextHateMouse from '../text-hate-mouse.vue'

type Props = ExtractComponentProps<typeof TextHateMouse> & {
  class?: string;
}

const budget = ref(-1)
const budgetList = [
  { text: '$10,000 以下' },
  { text: '$10,000 - $50,000' },
  { text: '$50,000 - $100,000' },
  { text: '$100,000 以上' },
]

const evasionRadius = computed(() => budget.value === 0 ? 50 : 0)

const list: Props[] = [
  { text: '聯絡電話：0987-654-321' },
  { text: 'E-mail：hi@codlin.me' },
]
</script>
