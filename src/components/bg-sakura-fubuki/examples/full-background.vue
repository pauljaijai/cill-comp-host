<template>
  <div class="w-full flex flex-col gap-4 py-2">
    <base-checkbox
      v-model="enable"
      label="啟用"
      class="border rounded p-4"
    />

    <transition name="opacity">
      <bg-sakura-fubuki
        class="left-0 top-0 z-50 h-full w-full duration-500 !fixed"
        :class="classes"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import BgSakuraFubuki from '../bg-sakura-fubuki.vue'

const enable = ref(false)

const classes = computed(() => ({
  'opacity-0': !enable.value,
  'opacity-100': enable.value,
}))
</script>

<style scoped lang="sass">
</style>
