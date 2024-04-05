<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border p-4 rounded">
      <base-checkbox
        v-model="disable"
        label="停用按鈕"
      />
    </div>

    <div class="flex">
      <wrapper-physics class="flex gap-1 border border-dashed w-80 h-40">
        <div>
          ( ´ ▽ ` )ﾉ
        </div>

        <div>
          安安
        </div>
      </wrapper-physics>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import WrapperPhysics from '../wrapper-physics.vue';

const disable = ref(true);
</script>
