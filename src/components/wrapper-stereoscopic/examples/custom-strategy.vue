<template>
  <div class="w-full flex flex-col items-center justify-center gap-8 border border-gray-300 p-6">
    <div class="content flex items-start">
      <wrapper-stereoscopic
        v-slot="wrapper"
        v-bind="params"
      >
        <div
          class="cursor-zoom-in select-none border rounded-full"
          :style="wrapper.style"
        >
          <wrapper-stereoscopic-layer v-slot="layer01">
            <div
              class="flex-center px-14 py-8 text-2xl tracking-widest"
              :style="layer01.style"
            >
              (´● ω ●`)
            </div>
          </wrapper-stereoscopic-layer>
        </div>
      </wrapper-stereoscopic>
    </div>

    <div
      ref="blockRef"
      class="w-full cursor-zoom-in border rounded border-dashed p-2 text-center text-xs tracking-widest"
    >
      看這裡
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { useElementHover } from '@vueuse/core'
import { ref } from 'vue'
import { mapNumber } from '../../../common/utils'
import WrapperStereoscopicLayer from '../wrapper-stereoscopic-layer.vue'
import WrapperStereoscopic from '../wrapper-stereoscopic.vue'

type Props = ExtractComponentProps<typeof WrapperStereoscopic>

const blockRef = ref()
const isHovered = useElementHover(blockRef)

const params: Props = {
  strategy(params) {
    const {
      mousePosition: { x, y },
      size: { width, height },
    } = params

    if (isHovered.value) {
      return {
        x: mapNumber(y, -height, height, -50, 50),
        y: mapNumber(x, -width, width, -60, 60),
        zOffset: -100,
      }
    }

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

    return {
      x: mapNumber(y, -height, height, -30, 30),
      y: mapNumber(x, -width, width, -40, 40),
      zOffset: 100,
    }
  },
}
</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
</style>
