<template>
  <div class="w-full py-10 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <wrapper-cat-ear
      :action="action"
      main-color="#999"
    >
      <div class=" border-2 border-[#999] rounded">
        <select
          v-model="action"
          class="  p-2"
        >
          <option
            v-for="option in options"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperCatEar, { ActionName } from '../wrapper-cat-ear.vue';

const action = ref<`${ActionName}`>('relaxed');
const options = Object.values(ActionName);
</script>
