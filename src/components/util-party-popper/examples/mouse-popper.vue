<template>
  <div class="flex flex-col gap-4 w-full">
    <base-checkbox
      v-model="enable"
      class="border p-4"
      label="啟用"
    />

    <util-party-popper
      ref="popperRef"
      class=" !fixed left-0 top-0 w-full h-full z-50 pointer-events-none"
      :quantity-of-per-emit="5"
      :max-concurrency="500"
      :color="initColor"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Scalar } from '@babylonjs/core';

import BaseCheckbox from '../../base-checkbox.vue';
import UtilPartyPopper from '../util-party-popper.vue';

import { throttleFilter, useMouseInElement } from '@vueuse/core';

const enable = ref(true);

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>();
const {
  elementX, elementY,
} = useMouseInElement(popperRef, {
  eventFilter: throttleFilter(15),
  scroll: false,
});

function initColor() {
  return {
    r: Scalar.RandomRange(0.8, 1),
    g: Scalar.RandomRange(0.8, 1),
    b: 1
  }
}

watch(() => [elementX, elementY], () => {
  if (!enable.value) return;

  popperRef.value?.emit({
    x: elementX.value, y: elementY.value,
  });
}, { deep: true });

</script>
