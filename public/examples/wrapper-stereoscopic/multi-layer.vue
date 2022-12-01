<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="content flex items-start gap-4">
      <wrapper-stereoscopic v-slot="wrapper">
        <div
          class=" w-[20rem] h-[20rem] bg-teal-400 rounded-3xl flex flex-center"
          :style="wrapper.style"
        >
          <wrapper-stereoscopic-layer v-slot="layer01">
            <div
              class=" w-[10rem] h-[10rem] bg-teal-100 rounded-3xl flex flex-center"
              :style="layer01.style"
            >
              <wrapper-stereoscopic-layer v-slot="layer02">
                <div
                  class="text-xl font-bold text-gray-600"
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

import WrapperStereoscopic from '@/components/wrapper-stereoscopic/wrapper-stereoscopic.vue';
import WrapperStereoscopicLayer from '@/components/wrapper-stereoscopic/wrapper-stereoscopic-layer.vue';

</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
</style>
