<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="content flex items-start gap-4">
      <wrapper-stereoscopic v-slot="wrapper">
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
import WrapperStereoscopicLayer from '../wrapper-stereoscopic-layer.vue'
import WrapperStereoscopic from '../wrapper-stereoscopic.vue'
</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>
