<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex">
      <wrapper-3d-like>
        <div class=" w-[20rem] h-[20rem] bg-teal-400 rounded-2xl" />
      </wrapper-3d-like>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Wrapper3dLike from '@/components/wrapper-3d-like.vue';

</script>
