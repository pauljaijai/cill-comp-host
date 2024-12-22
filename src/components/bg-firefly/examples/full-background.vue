<template>
  <div class="w-full flex flex-col gap-4 py-2">
    <base-checkbox
      v-model="enable"
      label="關燈"
      class="border rounded p-4"
    />

    <bg-firefly
      v-if="enable"
      class="left-0 top-0 z-50 h-full w-full !fixed"
      color="#3cff00"
    />
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { onUnmounted, ref, watch } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import BgFirefly from '../bg-firefly.vue'

const enable = ref(false)

const { isDark } = useData()

const oriValue = isDark.value

watch(enable, (value) => {
  isDark.value = value
})

onUnmounted(() => {
  isDark.value = oriValue
})
</script>

<style scoped lang="sass">
</style>
