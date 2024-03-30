<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="content flex items-start gap-4">
      <wrapper-stereoscopic v-slot="wrapper">
        <div
          class=" w-80 h-80 bg-gray-300 rounded flex-center"
          :style="wrapper.style"
        >
          <wrapper-stereoscopic-layer v-slot="layer01">
            <div
              class=" w-40 h-40 bg-gray-200 rounded flex-center"
              :style="layer01.style"
            >
              <wrapper-stereoscopic-layer v-slot="layer02">
                <div
                  class="text-xl font-bold bg-gray-100 rounded p-4"
                  :style="layer02.style"
                >
                  安安
                </div>
              </wrapper-stereoscopic-layer>
            </div>
          </wrapper-stereoscopic-layer>
        </div>
      </wrapper-stereoscopic>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperStereoscopic from '../wrapper-stereoscopic.vue';
import WrapperStereoscopicLayer from '../wrapper-stereoscopic-layer.vue';

</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>
