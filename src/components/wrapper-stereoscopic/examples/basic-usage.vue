<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex gap-4 border rounded p-4">
      <base-checkbox
        v-model="enable"
        label="懸浮開關"
        class="w-full"
      />
    </div>

    <div class="flex flex-col items-start gap-4">
      <wrapper-stereoscopic :enable>
        <div class="h-80 w-80 flex-center rounded bg-gray-300">
          <div class="h-40 w-40 flex-center rounded bg-gray-100">
            <div class="text-xl text-gray-600 font-bold">
              安安
            </div>
          </div>
        </div>
      </wrapper-stereoscopic>

      <div class="flex flex-col items-start justify-start gap-4">
        <wrapper-stereoscopic :enable>
          <div class="border rounded-full p-4 text-xl text-gray-600 font-bold">
            漂起來惹
          </div>
        </wrapper-stereoscopic>

        <wrapper-stereoscopic :enable>
          <div class="border rounded-full p-4 text-xl text-gray-600 font-bold">
            酷酷的漂浮
          </div>
        </wrapper-stereoscopic>

        <wrapper-stereoscopic :enable>
          <div class="border rounded-full p-4 text-xl text-gray-600 font-bold">
            安安
          </div>
        </wrapper-stereoscopic>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseCheckbox from '../../base-checkbox.vue'
import WrapperStereoscopic from '../wrapper-stereoscopic.vue'

const enable = ref(true)
</script>

<style lang="sass" scoped>
.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>
