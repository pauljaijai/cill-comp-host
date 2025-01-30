<template>
  <div class="w-full flex-center border border-gray-300 p-6">
    <div class="content flex items-start">
      <wrapper-stereoscopic
        v-slot="wrapper"
        v-bind="params"
      >
        <div
          class="cursor-pointer select-none border rounded-full"
          :style="wrapper.style"
        >
          <wrapper-stereoscopic-layer v-slot="layer01">
            <div
              class="flex-center px-14 py-6 text-2xl tracking-widest"
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
import { mapNumber } from '../../../common/utils'
import WrapperStereoscopicLayer from '../wrapper-stereoscopic-layer.vue'
import WrapperStereoscopic from '../wrapper-stereoscopic.vue'

type Props = ExtractComponentProps<typeof WrapperStereoscopic>

const params: Props = {
  strategy(params) {
    if (
      params.isOutside
      || !params.enable
      || !params.isVisible
      || params.isPressed) {
      return {
        x: 0,
        y: 0,
        zOffset: 0,
      }
    }

    const {
      mousePosition: { x, y },
      size: { width, height },
    } = params

    return {
      x: mapNumber(y, -width, width, -20, 20),
      y: mapNumber(x, -height, height, -20, 20),
      zOffset: 200,
    }
  },
}
</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
</style>
