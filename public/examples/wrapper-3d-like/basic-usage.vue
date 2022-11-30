<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex content">
      <wrapper-3d-like>
        <div class=" w-[20rem] h-[20rem] bg-teal-400 rounded-3xl flex flex-center">
          <div class=" w-[10rem] h-[10rem] bg-teal-100 rounded-3xl flex flex-center">
            <div class="text-xl font-bold text-gray-600">
              安安
            </div>
          </div>
        </div>
      </wrapper-3d-like>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Wrapper3dLike from '@/components/wrapper-3d-like.vue';

</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
</style>
