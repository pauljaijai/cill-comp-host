<template>
  <div class="w-full h-[50vh] border border-gray-300 flex justify-center items-center">
    <wrapper-cat-ear>
      <div class="border rounded p-2">
        ・ω・
      </div>
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import WrapperCatEar from '../wrapper-cat-ear.vue';

const text = ref('');
const disable = ref(true);
</script>
