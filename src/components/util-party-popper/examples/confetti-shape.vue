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
      :quantity-of-per-emit="50"
      :max-concurrency="50"
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
    shape: 'plane',
    width: 10,
    height: 10,
  },
  {
    shape: 'cylinder',
    diameter: 10,
    height: 1,
  },
  {
    shape: 'disc',
    radius: 10,
    tessellation: 3,
    arc: 1,
  },
  {
    shape: 'disc',
    radius: 8,
    tessellation: 8,
    arc: 1,
  },
  {
    shape: 'torus',
    diameter: 12,
    thickness: 2,
  },
]

function emit() {
  popperRef.value?.emit(() => ({
    x: 0,
    y: popperBounding.height.value,
    velocity: {
      x: -Scalar.RandomRange(5, 10),
      y: Scalar.RandomRange(10, 20),
    },
  }))

  popperRef.value?.emit(() => ({
    x: popperBounding.width.value,
    y: popperBounding.height.value,
    velocity: {
      x: Scalar.RandomRange(5, 10),
      y: Scalar.RandomRange(10, 20),
    },
  }))
}
</script>
