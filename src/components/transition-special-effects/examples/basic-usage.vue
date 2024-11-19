<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col items-center justify-center gap-3">
      <div
        v-for="item in list"
        :key="item.name"
        class="item h-[5rem] w-full flex items-center justify-center"
        :class="{ clickable: !item.visible }"
        @click="item.visible = !item.visible"
      >
        <transition-special-effects
          :enter="item.name"
          :leave="item.name"
        >
          <div
            v-if="item.visible"
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
import TransitionSpecialEffects from '../transition-special-effects.vue'

const list = ref<Array<{
  visible: boolean;
  name: `${TransitionName}`;
  class: string;
}>>([{
  visible: true,
  name: 'wave',
  class: 'bg-blue-200 text-blue-900 text-2xl font-bold  rounded-full',
}, {
  visible: true,
  name: 'color-fringing',
  class: 'bg-gray-200 text-gray-900 text-2xl font-bold',
}, {
  visible: true,
  name: 'melt',
  class: 'text-gray-400 border-2 border-gray-200 text-3xl rounded-xl font-bold',
}, {
  visible: true,
  name: 'glitch',
  class: 'text-red-800 border-dashed border border-red-800 text-2xl font-bold',
}, {
  visible: true,
  name: 'decimation',
  class: 'text-gray-400 border-2 border-gray-200 text-3xl rounded-xl font-bold',
}])
</script>

<style scoped lang="sass">
.item
  cursor: pointer
  transition-duration: 0.5s
  border: 1px dashed transparent
  &.clickable
    border: 1px dashed rgba(#000, 0.1)
</style>
