<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <div class=" w-full h-full flex justify-center items-center gap-10 p-10">
      <div
        class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
        @click="emit('left')"
      >
        👈
      </div>

      <div class="flex flex-col gap-10">
        <div
          class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
          @click="emit('top')"
        >
          👆
        </div>

        <div
          class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
          @click="emit('bottom')"
        >
          👇
        </div>
      </div>

      <div
        class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
        @click="emit('right')"
      >
        👉
      </div>
    </div>

    <util-party-popper
      ref="popperRef"
      class=" !fixed left-0 top-0 w-full h-full z-50 pointer-events-none"
      :color="initColor"
      :quantity-of-per-emit="300"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Scalar } from '@babylonjs/core';
import { conditional, constant, isDeepEqual, pipe, sample } from 'remeda';

import UtilPartyPopper from '../util-party-popper.vue';

import { useElementBounding } from '@vueuse/core';

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>();
const popperBounding = useElementBounding(popperRef);

function initColor() {
  return pipe(
    [
      { r: 1, g: 0.4, b: 0, },
      { r: 1, g: 0.9, b: 0, },
      { r: 0.5, g: 1, b: 0, },
      { r: 0, g: 0.9, b: 1, },
    ],
    sample(1),
    ([value]) => value,
  )
}

function emit(position: 'top' | 'bottom' | 'left' | 'right') {
  const offset = 50;

  const param = conditional(position,
    [
      isDeepEqual('top'),
      constant(() => ({
        x: Scalar.RandomRange(0, popperBounding.width.value),
        y: -offset,
        velocity: {
          x: Scalar.RandomRange(1, -1),
          y: Scalar.RandomRange(0, -5)
        },
      }))
    ],
    [
      isDeepEqual('bottom'),
      constant(() => ({
        x: Scalar.RandomRange(0, popperBounding.width.value),
        y: popperBounding.height.value + offset,
        velocity: {
          x: Scalar.RandomRange(1, -1),
          y: Scalar.RandomRange(1, 5)
        },
      }))
    ],
    [
      isDeepEqual('left'),
      constant(() => ({
        x: -offset,
        y: Scalar.RandomRange(0, popperBounding.height.value),
        velocity: {
          x: Scalar.RandomRange(-1, -5),
          y: Scalar.RandomRange(-1, 1)
        },
      }))
    ],
    [
      isDeepEqual('right'),
      constant(() => ({
        x: popperBounding.width.value + offset,
        y: Scalar.RandomRange(0, popperBounding.height.value),
        velocity: {
          x: Scalar.RandomRange(1, 5),
          y: Scalar.RandomRange(-1, 1)
        },
      }))
    ],
  );

  popperRef.value?.emit(param);
}
</script>
