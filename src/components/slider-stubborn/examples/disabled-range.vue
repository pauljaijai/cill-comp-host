<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col flex-1 justify-center">
      目前數值：{{ sliderValue }}

      <slider-stubborn
        v-model="sliderValue"
        v-bind="disabledParams"
        :max-thumb-length="thumbLength"
        :thumb-size="40"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import SliderStubborn from '../slider-stubborn.vue'

type Props = ExtractComponentProps<typeof SliderStubborn>

const { width, height } = useWindowSize()

const sliderValue = ref(50)

const disabledParams = computed<
  Pick<Props, 'minDisabled' | 'maxDisabled'>
>(() => ({
  minDisabled: 20,
  maxDisabled: 80,
}))

const thumbLength = computed(() =>
  Math.min(width.value, height.value) / 3,
)
</script>
