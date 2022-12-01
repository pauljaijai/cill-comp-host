<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="content flex items-start gap-4">
      <wrapper-3d-like>
        <div class=" w-[20rem] h-[20rem] bg-teal-400 rounded-3xl flex flex-center">
          <div class=" w-[10rem] h-[10rem] bg-teal-100 rounded-3xl flex flex-center">
            <div class="text-xl font-bold text-gray-600">
              安安
            </div>
          </div>
        </div>
      </wrapper-3d-like>

      <div class="flex flex-col justify-start items-start gap-4">
        <wrapper-3d-like>
          <div class="text-xl font-bold text-gray-600 border p-4 rounded-full">
            漂起來惹
          </div>
        </wrapper-3d-like>

        <wrapper-3d-like>
          <div class="text-xl font-bold text-gray-600 border p-4 rounded-full">
            酷酷的漂浮
          </div>
        </wrapper-3d-like>

        <wrapper-3d-like>
          <div class="text-xl font-bold text-gray-600 border p-4 rounded-full">
            安安
          </div>
        </wrapper-3d-like>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Wrapper3dLike from '@/components/wrapper-3d-like/wrapper-3d-like.vue';

</script>

<style lang="sass" scoped>
.content
  perspective: 2000px
</style>
