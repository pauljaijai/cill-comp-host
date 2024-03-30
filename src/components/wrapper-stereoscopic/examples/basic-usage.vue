<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex gap-4 border p-4 rounded">
      <base-checkbox
        v-model="enable"
        label="懸浮開關"
        class=" w-full "
      />
    </div>

    <div class="content flex items-start gap-4">
      <wrapper-stereoscopic :enable="enable">
        <div class=" w-80 h-80 bg-gray-300 rounded flex-center">
          <div class=" w-40 h-40 bg-gray-100 rounded flex-center">
            <div class="text-xl font-bold text-gray-600">
              安安
            </div>
          </div>
        </div>
      </wrapper-stereoscopic>

      <div class="flex flex-col justify-start items-start gap-4">
        <wrapper-stereoscopic :enable="enable">
          <div class="text-xl font-bold text-gray-600 border p-4 rounded-full">
            漂起來惹
          </div>
        </wrapper-stereoscopic>

        <wrapper-stereoscopic :enable="enable">
          <div class="text-xl font-bold text-gray-600 border p-4 rounded-full">
            酷酷的漂浮
          </div>
        </wrapper-stereoscopic>

        <wrapper-stereoscopic :enable="enable">
          <div class="text-xl font-bold text-gray-600 border p-4 rounded-full">
            安安
          </div>
        </wrapper-stereoscopic>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperStereoscopic from '../wrapper-stereoscopic.vue';
import BaseCheckbox from '../../base-checkbox.vue';

const enable = ref(true);
</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>
