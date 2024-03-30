<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex gap-4 border p-4 rounded">
      <base-input
        v-model="x"
        type="range"
        :label="`X 最大角度: ${x} 度`"
        class=" w-full "
        :min="0"
        :max="90"
      />

      <base-input
        v-model="y"
        type="range"
        :label="`Y 軸最大角度: ${y} 度`"
        class=" w-full "
        :min="0"
        :max="90"
      />
    </div>

    <div class="content flex items-start gap-4">
      <wrapper-stereoscopic
        :x-max-angle="x"
        :y-max-angle="y"
      >
        <div class="text-xl font-bold text-gray-600 border p-4 rounded-full">
          ( •̀ ω •́ )✧
        </div>
      </wrapper-stereoscopic>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WrapperStereoscopic from '../wrapper-stereoscopic.vue';
import BaseInput from '../../base-input.vue';

const x = ref(15);
const y = ref(15);
</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>
