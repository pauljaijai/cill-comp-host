<template>
  <div class="flex flex-col gap-4 w-full">
    <div class=" w-full h-full flex justify-center items-center gap-10 p-10">
      <div
        class=" bg-white text-2xl rounded px-4 py-2 select-none cursor-pointer"
        @click="emit('left')"
      >
        👈
      </div>

      <div class="flex flex-col gap-10">
        <div
          class="bg-white text-2xl rounded px-4 py-2 select-none cursor-pointer"
          @click="emit('top')"
        >
          👆
        </div>

        <div
          class="bg-white text-2xl rounded px-4 py-2 select-none cursor-pointer"
          @click="emit('bottom')"
        >
          👇
        </div>

        <div
          class="bg-white text-2xl rounded px-4 py-2 select-none cursor-pointer"
          @click="emit('bottom-center')"
        >
          🎆
        </div>
      </div>

      <div
        class="bg-white text-2xl rounded px-4 py-2 select-none cursor-pointer"
        @click="emit('right')"
      >
        👉
      </div>
    </div>

    <util-party-popper
      ref="popperRef"
      class=" !fixed left-0 top-0 w-full h-full z-50 pointer-events-none"
      :quantity-of-per-emit="100"
      :max-concurrency="50"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Scalar } from '@babylonjs/core';
import { conditional, constant, isDeepEqual } from 'remeda';

import UtilPartyPopper from '../util-party-popper.vue';

import { useElementBounding } from '@vueuse/core';

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>();
const popperBounding = useElementBounding(popperRef);

function emit(position: 'top' | 'bottom' | 'left' | 'right' | 'bottom-center') {
  const offset = 50;

  const param = conditional(position,
    [
      isDeepEqual('top'),
      constant(() => ({
        x: Scalar.RandomRange(0, popperBounding.width.value),
        y: -offset,
        velocity: {
          x: Scalar.RandomRange(1, -1),
          y: Scalar.RandomRange(0, -10)
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
          y: Scalar.RandomRange(10, 15)
        },
      }))
    ],
    [
      isDeepEqual('bottom-center'),
      () => ({
        x: Scalar.RandomRange(0, popperBounding.width.value),
        y: popperBounding.height.value + offset,
        velocity: {
          x: 0,
          y: Scalar.RandomRange(10, 15),
        },
      })
    ],
    [
      isDeepEqual('left'),
      constant(() => ({
        x: -offset,
        y: Scalar.RandomRange(0, popperBounding.height.value),
        velocity: {
          x: Scalar.RandomRange(-5, -10),
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
          x: Scalar.RandomRange(5, 10),
          y: Scalar.RandomRange(-1, 1)
        },
      }))
    ],
  );

  popperRef.value?.emit(param);
}
</script>
