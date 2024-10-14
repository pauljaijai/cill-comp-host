<template>
  <div class="w-full flex flex-col gap-4">
    <div class="h-full w-full flex items-center justify-center gap-10 p-10">
      <div
        class="cursor-pointer select-none rounded bg-white px-4 py-2 text-2xl"
        @click="emit('left')"
      >
        👈
      </div>

      <div class="flex flex-col gap-10">
        <div
          class="cursor-pointer select-none rounded bg-white px-4 py-2 text-2xl"
          @click="emit('top')"
        >
          👆
        </div>

        <div
          class="cursor-pointer select-none rounded bg-white px-4 py-2 text-2xl"
          @click="emit('bottom')"
        >
          👇
        </div>

        <div
          class="cursor-pointer select-none rounded bg-white px-4 py-2 text-2xl"
          @click="emit('bottom-center')"
        >
          🎆
        </div>
      </div>

      <div
        class="cursor-pointer select-none rounded bg-white px-4 py-2 text-2xl"
        @click="emit('right')"
      >
        👉
      </div>
    </div>

    <util-party-popper
      ref="popperRef"
      class="pointer-events-none left-0 top-0 z-50 h-full w-full !fixed"
      :quantity-of-per-emit="100"
      :max-concurrency="50"
    />
  </div>
</template>

<script setup lang="ts">
import { Scalar } from '@babylonjs/core'
import { useElementBounding } from '@vueuse/core'
import { conditional, constant, isDeepEqual } from 'remeda'

import { ref } from 'vue'

import UtilPartyPopper from '../util-party-popper.vue'

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>()
const popperBounding = useElementBounding(popperRef)

function emit(position: 'top' | 'bottom' | 'left' | 'right' | 'bottom-center') {
  const offset = 50

  const param = conditional(position, [
    isDeepEqual('top'),
    constant(() => ({
      x: Scalar.RandomRange(0, popperBounding.width.value),
      y: -offset,
      velocity: {
        x: Scalar.RandomRange(1, -1),
        y: Scalar.RandomRange(0, -10),
      },
    })),
  ], [
    isDeepEqual('bottom'),
    constant(() => ({
      x: Scalar.RandomRange(0, popperBounding.width.value),
      y: popperBounding.height.value + offset,
      velocity: {
        x: Scalar.RandomRange(1, -1),
        y: Scalar.RandomRange(10, 15),
      },
    })),
  ], [
    isDeepEqual('bottom-center'),
    () => ({
      x: Scalar.RandomRange(0, popperBounding.width.value),
      y: popperBounding.height.value + offset,
      velocity: {
        x: 0,
        y: Scalar.RandomRange(8, 20),
      },
    }),
  ], [
    isDeepEqual('left'),
    constant(() => ({
      x: -offset,
      y: Scalar.RandomRange(0, popperBounding.height.value),
      velocity: {
        x: Scalar.RandomRange(-5, -10),
        y: Scalar.RandomRange(-1, 1),
      },
    })),
  ], [
    isDeepEqual('right'),
    constant(() => ({
      x: popperBounding.width.value + offset,
      y: Scalar.RandomRange(0, popperBounding.height.value),
      velocity: {
        x: Scalar.RandomRange(5, 10),
        y: Scalar.RandomRange(-1, 1),
      },
    })),
  ])

  popperRef.value?.emit(param)
}
</script>
