<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded">
      <base-checkbox
        v-model="visible"
        label="顯示"
        class="p-4"
      />
    </div>

    <div class="flex flex-col items-center justify-center gap-2">
      <div
        v-for="item in list"
        :key="item.name"
        class="min-h-[4rem]"
      >
        <transition-special-effects
          :enter="item.name"
          :leave="item.name"
        >
          <div
            v-if="visible"
            class="px-8 py-2"
            :class="item.class"
          >
            {{ item.name.toUpperCase() }}
          </div>
        </transition-special-effects>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransitionName } from '../type'
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import TransitionSpecialEffects from '../transition-special-effects.vue'

const visible = ref(true)

const list: Array<{
  name: `${TransitionName}`;
  class: string;
}> = [{
  name: 'wave',
  class: 'bg-blue-200 text-blue-900 text-2xl font-bold  rounded-full',
}, {
  name: 'color-fringing',
  class: 'bg-gray-200 text-gray-900 text-2xl font-bold',
}, {
  name: 'melt',
  class: 'text-gray-400 border-2 border-gray-200 text-3xl rounded-xl font-bold',
}, {
  name: 'glitch',
  class: 'text-red-800 border-dashed border border-red-800 text-2xl font-bold',
}, {
  name: 'decimation',
  class: 'text-gray-400 border-2 border-gray-200 text-3xl rounded-xl font-bold',
}]
</script>
