<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <util-party-popper
      ref="popperRef"
      class=" flex h-[40vh]"
      v-slot="{ fps }"
    >
      <div class=" w-full h-full flex justify-center items-center gap-10">
        <div class="flex flex-col gap-10">
          <div
            ref="btn01Ref"
            class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
            @click="emit(btn01Bounding)"
          >
            🎉
          </div>

          <div
            ref="btn02Ref"
            class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
            @click="emit(btn02Bounding)"
          >
            🎉
          </div>
        </div>

        <div
          ref="btn03Ref"
          class="border bg-white rounded px-4 py-2 select-none cursor-pointer"
          @click="emit(btn03Bounding)"
        >
          🎉
        </div>
      </div>

      <div class=" absolute left-0 top-0 p-4">
        {{ fps }}
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

const btn01Ref = ref<HTMLDivElement>();
const btn01Bounding = useElementBounding(btn01Ref);

const btn02Ref = ref<HTMLDivElement>();
const btn02Bounding = useElementBounding(btn02Ref);

const btn03Ref = ref<HTMLDivElement>();
const btn03Bounding = useElementBounding(btn03Ref);


function emit(bounding: ReturnType<typeof useElementBounding>) {
  const param = {
    x: bounding.left.value + bounding.width.value / 2 - popperBounding.left.value,
    y: bounding.top.value + bounding.height.value / 2 - popperBounding.top.value,
  }
  popperRef.value?.emit(param);
}
</script>
