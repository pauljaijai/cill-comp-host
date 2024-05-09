<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <util-party-popper
      ref="popperRef"
      class=" flex h-[40vh]"
    >
      <div class=" w-full h-full flex justify-center items-center">
        <div
          ref="btnRef"
          class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
          @click="emit()"
        >
          按鈕
        </div>
      </div>
    </util-party-popper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import UtilPartyPopper from '../util-party-popper.vue';
import { useElementBounding } from '@vueuse/core';

const text = ref('');
const disable = ref(true);

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>();
const popperBounding = useElementBounding(popperRef);

const btnRef = ref<HTMLDivElement>();
const btnBounding = useElementBounding(btnRef);


function emit() {
  const param = {
    x: btnBounding.left.value + btnBounding.width.value / 2 - popperBounding.left.value,
    y: btnBounding.top.value + btnBounding.height.value / 2 - popperBounding.top.value,
  }
  popperRef.value?.emit(param);
}
</script>
