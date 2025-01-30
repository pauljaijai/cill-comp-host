<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="content flex items-start gap-4">
      <wrapper-stereoscopic
        v-slot="wrapper"
        v-bind="params"
      >
        <div
          class="flex-center border rounded-full"
          :style="wrapper.style"
        >
          <wrapper-stereoscopic-layer
            v-slot="layer01"
            class="flex-center"
          >
            <div
              class="flex-center px-6 py-2 text-xl"
              :style="layer01.style"
            >
              按鈕
            </div>
          </wrapper-stereoscopic-layer>
        </div>
      </wrapper-stereoscopic>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import WrapperStereoscopicLayer from '../wrapper-stereoscopic-layer.vue'
import WrapperStereoscopic from '../wrapper-stereoscopic.vue'

type Props = ExtractComponentProps<typeof WrapperStereoscopic>

const params: Props = {
  strategy(params) {
    return {
      x: 0,
      y: 0,
      zOffset: 0,
    }
  },
}
</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
</style>
