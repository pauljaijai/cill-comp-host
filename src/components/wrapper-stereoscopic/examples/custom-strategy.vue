<template>
  <div class="w-full flex flex-col items-center justify-center gap-8 border border-gray-300 p-6">
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
              class="flex-center px-14 py-8 text-2xl tracking-widest"
              :style="layer01.style"
            >
              (´● ω ●`)
            </div>
          </wrapper-stereoscopic-layer>
        </div>
      </wrapper-stereoscopic>
    </div>

    <div class="w-full flex justify-between">
      <base-btn
        ref="btnRef1"
        label="看這"
      />
      <base-btn
        ref="btnRef2"
        label="看這"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types'
import { useMousePressed } from '@vueuse/core'
import { computed, ref } from 'vue'
import { mapNumber } from '../../../common/utils'
import BaseBtn from '../../base-btn.vue'
import WrapperStereoscopicLayer from '../wrapper-stereoscopic-layer.vue'
import WrapperStereoscopic from '../wrapper-stereoscopic.vue'

type Props = ExtractComponentProps<typeof WrapperStereoscopic>

const btnRef1 = ref()
const { pressed: btn1Pressed } = useMousePressed({ target: btnRef1 })

const btnRef2 = ref()
const { pressed: btn2Pressed } = useMousePressed({ target: btnRef2 })
const isPressed = computed(() => btn1Pressed.value || btn2Pressed.value)

const params: Props = {
  strategy(params) {
    if (
      (params.isOutside && !isPressed.value)
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
