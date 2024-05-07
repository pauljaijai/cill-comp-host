<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <util-party-popper class="flex h-[40vh]" />
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
