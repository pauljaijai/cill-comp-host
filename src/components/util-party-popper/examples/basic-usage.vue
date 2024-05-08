<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <util-party-popper class=" flex h-[40vh]">
      <div class=" w-full h-full flex justify-center items-center">
        <div class="w-5 h-5 bg-white/70" />
      </div>
    </util-party-popper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import UtilPartyPopper from '../util-party-popper.vue';

const text = ref('');
const disable = ref(true);
</script>
