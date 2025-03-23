<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <base-checkbox
      v-model="disabled"
      class="w-full border rounded p-4"
      label="停用"
    />

    <div class="flex flex-col flex-1 justify-center">
      目前數值：{{ Math.floor(value) }}

      <slider-stubborn
        v-model="value"
        :disabled="disabled"
        :max-thumb-length="thumbLength"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import SliderStubborn from '../slider-stubborn.vue'

const { width, height } = useWindowSize()

const disabled = ref(false)
const value = ref(50)

const thumbLength = computed(() =>
  Math.min(width.value, height.value) / 3,
)
</script>
