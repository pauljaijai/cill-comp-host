<template>
  <div class="w-full py-10 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <wrapper-cat-ear :action="action">
      <div class=" border border-gray-300 rounded">
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

    <wrapper-cat-ear :action="action">
      <div
        class="border rounded px-6 py-4 bg-white"
        v-text="`◔ ω ◔`"
      />
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperCatEar, { ActionName } from '../wrapper-cat-ear.vue';

const action = ref<`${ActionName}`>('relaxed');

const options = Object.values(ActionName);
</script>
