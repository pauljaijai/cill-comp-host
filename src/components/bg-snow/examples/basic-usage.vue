<template>
  <div class="w-full flex justify-center">
    <base-checkbox
      v-model="enable"
      v-bg-static
      label="下雪了！੭ ˙ᗜ˙ )੭"
      class="border border-gray-300 rounded p-4"
    />

    <bg-snow
      class="fixed left-0 top-0 z-[100] h-full w-full duration-500"
      :class="{ 'opacity-0': !enable }"
    />
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { onUnmounted, ref, watchEffect } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import BgSnow from '../bg-snow.vue'
import { vBgStatic } from '../v-bg-static'

const enable = ref(false)

const { isDark } = useData()

const oriValue = isDark.value

watchEffect(() => {
  isDark.value = enable.value
})

onUnmounted(() => {
  isDark.value = oriValue
})
</script>
