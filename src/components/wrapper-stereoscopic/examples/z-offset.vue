<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex gap-4 border rounded p-4">
      <base-input
        v-model.number="zOffset"
        type="range"
        :label="`懸浮距離: ${zOffset} px`"
        class="w-full"
        :min="0"
        :max="200"
      />
    </div>

    <div class="content flex items-start gap-4">
      <wrapper-stereoscopic
        v-slot="wrapper"
        :z-offset="zOffset"
      >
        <div
          class="h-80 w-80 flex-center rounded bg-gray-300"
          :style="wrapper.style"
        >
          <wrapper-stereoscopic-layer v-slot="layer01">
            <div
              class="h-40 w-40 flex-center rounded bg-gray-200"
              :style="layer01.style"
            >
              <wrapper-stereoscopic-layer v-slot="layer02">
                <div
                  class="rounded bg-gray-100 p-4 text-xl font-bold"
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
import { ref } from 'vue'

import BaseInput from '../../base-input.vue'
import WrapperStereoscopicLayer from '../wrapper-stereoscopic-layer.vue'
import WrapperStereoscopic from '../wrapper-stereoscopic.vue'

const zOffset = ref(100)
</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>
