<template>
  <div class="h-full flex flex-col items-center gap-6 p-10 cursor-none">
    <q-input
      v-model="imgUrl"
      outlined
      label="image URL"
      class="w-[20rem]"
    />

    <cursor-sandevistan :img="imgUrl" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CursorSandevistan from '../components/cursor-sandevistan.vue';

const imgUrl = ref<string>();

</script>

<style scoped lang="sass">
</style>
