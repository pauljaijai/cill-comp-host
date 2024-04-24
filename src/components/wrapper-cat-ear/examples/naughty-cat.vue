<template>
  <div class="w-full py-10 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <div class="flex flex-col gap-4 border p-4 rounded">
      <base-checkbox
        v-model="disabled"
        label="停用"
      />
    </div>

    <btn-naughty
      ref="btnRef"
      :disabled="disabled"
    >
      <wrapper-cat-ear
        :action="action"
        main-color="#DDD"
      >
        <div
          class=" w-[6rem] h-[3rem] border rounded bg-white text-xl font-bold text-nowrap flex-center"
          v-text="face"
        />
      </wrapper-cat-ear>
    </btn-naughty>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import WrapperCatEar, { ActionName } from '../wrapper-cat-ear.vue';
import BtnNaughty from '../../btn-naughty/btn-naughty.vue';

import { whenever, refAutoReset } from '@vueuse/core';

const btnRef = ref<InstanceType<typeof BtnNaughty>>();

const disabled = ref(true);
const action = refAutoReset<`${ActionName}`>('relaxed', 700);
const face = refAutoReset('◔ ω ◔', 700);

whenever(() => btnRef.value?.isRunning, () => {
  face.value = '˘･ ω ･˘'
  action.value = 'displeased';
})
</script>

<style lang="sass">
.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>