<template>
  <div class="w-full flex flex-col gap-4">
    <div class="h-full w-full flex items-center justify-center gap-10 p-10">
      <div
        class="cursor-pointer select-none rounded bg-white px-4 py-2 text-2xl"
        @click="emit()"
      >
        🎉
      </div>
    </div>

    <util-party-popper
      ref="popperRef"
      :confetti="confettiList"
      class="pointer-events-none left-0 top-0 z-50 h-full w-full !fixed"
      :quantity-of-per-emit="20"
      :max-concurrency="50"
      :max-angular-velocity="Math.PI / 100"
      :color="{ r: 1, g: 1, b: 1 }"
    />
  </div>
</template>

<script setup lang="ts">
import type { ExtractArrayType } from '../../../types/main.type'
import { Scalar } from '@babylonjs/core'
import { useElementBounding } from '@vueuse/core'
import { ref } from 'vue'
import UtilPartyPopper from '../util-party-popper.vue'

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>()
const popperBounding = useElementBounding(popperRef)

type Confetti = ExtractArrayType<
  InstanceType<typeof UtilPartyPopper>['confetti']
>
const confettiList: Confetti[] = [
  {
    shape: 'text',
    width: 40,
    height: 40,
    char: '🐟',
  },
  {
    shape: 'text',
    width: 40,
    height: 20,
    char: '肥魚',
  },
  {
    shape: 'text',
    width: 80,
    height: 40,
    char: '2 KG！',
  },
  {
    shape: 'text',
    width: 30,
    height: 30,
    char: '✨',
  },
]

function emit() {
  popperRef.value?.emit(() => ({
    x: 0,
    y: Scalar.RandomRange(0, popperBounding.height.value),
    velocity: {
      x: -Scalar.RandomRange(5, 10),
      y: Scalar.RandomRange(-5, 5),
    },
  }))

  popperRef.value?.emit(() => ({
    x: popperBounding.width.value,
    y: Scalar.RandomRange(0, popperBounding.height.value),
    velocity: {
      x: Scalar.RandomRange(5, 10),
      y: Scalar.RandomRange(-5, 5),
    },
  }))
}
</script>
