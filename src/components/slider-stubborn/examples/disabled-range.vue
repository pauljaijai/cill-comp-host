<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-col flex-1 justify-center">
      <div class="mb-4 text-lg font-bold opacity-90">
        選擇喜歡的方案
      </div>

      <div class="mb-6 flex gap-4">
        <div
          class="h-[24vh] flex-center flex-col flex-1 transform rounded-lg from-gray-400 to-gray-500 bg-gradient-to-bl p-1 text-white shadow-md transition-all duration-200 md:h-[28vh] hover:shadow-lg hover:-translate-y-0.5"
          :class="{ ' border-[0.3rem]': plan === 'basic' }"
          @click="plan = 'basic'"
        >
          <div class="text-lg font-bold md:text-2xl">
            基本魚缸
          </div>

          <div class="mt-1 text-xs opacity-90 md:text-sm">
            1 隻剛剛好
          </div>
        </div>

        <div
          class="h-[24vh] flex-center flex-col flex-1 transform border-2 border-indigo-200 rounded-lg from-blue-400 to-indigo-500 bg-gradient-to-bl p-1 text-white shadow-lg transition-all duration-200 md:h-[28vh] hover:shadow-xl hover:-translate-y-1"
          :class="{ ' border-[0.3rem]': plan === 'premium' }"
          @click="plan = 'premium'"
        >
          <div class="text-lg font-bold md:text-2xl">
            高級池塘
          </div>

          <div class="mt-1 text-xs opacity-90 md:text-sm">
            3~6 隻吃飽飽
          </div>

          <div
            class="absolute right-0 top-0 translate-x-2 transform rounded-bl-lg rounded-tr-lg bg-yellow-400 px-2 py-1 shadow-sm -translate-y-2"
          >
            <div class="text-xs text-red-900 font-semibold md:text-sm">
              推薦方案
            </div>
          </div>
        </div>

        <div
          class="h-[24vh] flex-center flex-col flex-1 transform border-2 border-pink-200 rounded-lg from-purple-500 to-pink-500 bg-gradient-to-bl p-1 text-white shadow-xl transition-all duration-200 md:h-[28vh] hover:shadow-2xl hover:-translate-y-1.5"
          :class="{ ' border-[0.3rem]': plan === 'luxury' }"
          @click="plan = 'luxury'"
        >
          <div class="text-lg font-bold md:text-2xl">
            尊爵大海
          </div>

          <div class="mt-1 text-xs opacity-90 md:text-sm">
            任你選！
          </div>
        </div>
      </div>

      <div class="mb-4 text-lg font-bold opacity-90">
        可選鱈魚數：{{ Math.floor(sliderValue) }}
      </div>

      <slider-stubborn
        v-model="sliderValue"
        v-bind="disabledParams"
        :min="0"
        :max="10"
        :step="0.1"
        :max-thumb-length="thumbLength"
        :thumb-size="40"
        class="w-full py-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { useWindowSize } from '@vueuse/core'
import { pipe } from 'remeda'
import { computed, ref } from 'vue'
import SliderStubborn from '../slider-stubborn.vue'

type Props = ExtractComponentProps<typeof SliderStubborn>

type Plan = 'basic' | 'premium' | 'luxury'

const { width, height } = useWindowSize()

const plan = ref<Plan>('premium')
const sliderValue = ref(5)

const planRangleMap: Record<Plan, [number, number]> = {
  basic: [1, 1],
  premium: [3, 6],
  luxury: [-1, 11],
}
const disabledParams = computed<
  Pick<Props, 'minDisabled' | 'maxDisabled'>
>(() => pipe(
  planRangleMap[plan.value],
  ([min, max]) => ({
    minDisabled: min,
    maxDisabled: max,
  }),
))

const thumbLength = computed(() =>
  Math.min(width.value, height.value) / 3,
)
</script>

<style lang="sass" scoped>
</style>
