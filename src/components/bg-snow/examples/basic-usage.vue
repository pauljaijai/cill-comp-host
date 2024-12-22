<template>
  <div class="w-full flex items-center justify-center">
    <div class="flex gap-10">
      <base-checkbox
        v-model="enable"
        v-bg-static
        label="下雪了！੭ ˙ᗜ˙ )੭"
        class="border border-gray-300 rounded p-4"
      />

      <base-btn
        v-bg-static
        label="除雪"
        class="border-gray-300"
        @click="sweep()"
      />
    </div>

    <bg-snow
      ref="bgRef"
      class="fixed left-0 top-0 z-[100] h-full w-full duration-500"
      :class="{ 'opacity-0': !enable }"
    />
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { onUnmounted, ref, watch } from 'vue'
import BaseBtn from '../../base-btn.vue'
import BaseCheckbox from '../../base-checkbox.vue'
import BgSnow from '../bg-snow.vue'
import { vBgStatic } from '../v-bg-static'

const enable = ref(false)

const bgRef = ref<InstanceType<typeof BgSnow>>()
function sweep() {
  bgRef.value?.sweep()
}

const { isDark } = useData()

const oriValue = isDark.value

watch(enable, (value) => {
  isDark.value = value
})

onUnmounted(() => {
  isDark.value = oriValue
})
</script>
