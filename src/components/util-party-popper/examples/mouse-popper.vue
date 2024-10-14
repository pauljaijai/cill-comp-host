<template>
  <div class="w-full flex flex-col gap-4">
    <base-checkbox
      v-model="enable"
      class="border p-4"
      label="啟用"
    />

    <util-party-popper
      ref="popperRef"
      class="pointer-events-none left-0 top-0 z-50 h-full w-full !fixed"
      :confetti="confettiList"
      :quantity-of-per-emit="2"
      :max-concurrency="500"
      :max-angular-velocity="Math.PI / 100"
      :color="{ r: 1, g: 1, b: 1 }"
    />
  </div>
</template>

<script setup lang="ts">
import type { ExtractArrayType } from '../../../types/main.type'
import { Scalar } from '@babylonjs/core'
import { throttleFilter, useMouseInElement, useMousePressed, whenever } from '@vueuse/core'
import { ref, watch } from 'vue'

import BaseCheckbox from '../../base-checkbox.vue'
import UtilPartyPopper from '../util-party-popper.vue'

const enable = ref(false)

type Confetti = ExtractArrayType<
  InstanceType<typeof UtilPartyPopper>['confetti']
>
const confettiList: Confetti[] = [
  {
    shape: 'text',
    width: 30,
    height: 30,
    char: '🐁',
  },
  {
    shape: 'text',
    width: 40,
    height: 40,
    char: '🐀',
  },
]

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>()
const {
  elementX,
  elementY,
} = useMouseInElement(popperRef, {
  eventFilter: throttleFilter(10),
  scroll: false,
})
const { pressed } = useMousePressed()

whenever(pressed, () => {
  if (!enable.value)
    return

  popperRef.value?.emit(() => ({
    x: elementX.value,
    y: elementY.value,
    velocity: {
      x: Scalar.RandomRange(-10, 10),
      y: Scalar.RandomRange(-10, 10),
    },
  }))
})

watch(() => [elementX, elementY], () => {
  if (!enable.value)
    return

  popperRef.value?.emit(() => ({
    x: elementX.value,
    y: elementY.value,
    velocity: {
      x: Scalar.RandomRange(-2, 2),
      y: Scalar.RandomRange(-2, 2),
    },
  }))
}, { deep: true })
</script>
