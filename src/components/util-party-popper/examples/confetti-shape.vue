<template>
  <div class="flex flex-col gap-4 w-full">
    <div class=" w-full h-full flex justify-center items-center gap-10 p-10">
      <div
        class=" bg-white text-2xl rounded px-4 py-2 select-none cursor-pointer"
        @click="emit()"
      >
        🎉
      </div>
    </div>

    <util-party-popper
      ref="popperRef"
      :confetti="confettiList"
      class=" !fixed left-0 top-0 w-full h-full z-50 pointer-events-none"
      :quantity-of-per-emit="50"
      :max-concurrency="50"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Scalar } from '@babylonjs/core';

import UtilPartyPopper from '../util-party-popper.vue';

import { useElementBounding } from '@vueuse/core';
import { ExtractArrayType } from '../../../types/main.type';

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>();
const popperBounding = useElementBounding(popperRef);

type Confetti = ExtractArrayType<
  InstanceType<typeof UtilPartyPopper>['confetti']
>;
const confettiList: Confetti[] = [
  {
    shape: 'box',
    width: 10,
    height: 10,
    depth: 1,
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
  }));

  popperRef.value?.emit(() => ({
    x: popperBounding.width.value,
    y: popperBounding.height.value,
    velocity: {
      x: Scalar.RandomRange(5, 10),
      y: Scalar.RandomRange(10, 20),
    },
  }));
}
</script>
