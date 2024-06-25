<template>
  <div class="flex flex-col gap-4 w-full py-2">
    <bg-sakura-fubuki
      v-slot="{ fps }"
      class="bg w-full h-full"
    >
      <div class="text-white absolute top-0 left-0 p-4">
        {{ fps }}
      </div>
    </bg-sakura-fubuki>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import BgSakuraFubuki from '../bg-sakura-fubuki.vue';

const text = ref('');
const disable = ref(true);
</script>

<style scoped lang="sass">
.bg 
  background: linear-gradient(20deg, #91d3ff, #c2ebff, #fff7f7)
</style>
