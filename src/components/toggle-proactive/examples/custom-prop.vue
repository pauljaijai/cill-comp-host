<template>
  <div class="flex flex-col items-center w-full border border-gray-300 p-8 gap-10">
    <toggle-proactive
      :model-value="false"
      disabled
      fur-color="#DFC57B"
      pad-color="#FFF"
      size="3rem"
    />

    <toggle-proactive
      :model-value="true"
      track-inactive-class="bg-red-400"
      track-active-class="bg-[#DFDFDF]"
      disabled
      fur-color="#5472FB"
      pad-color="#000"
      size="8rem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToggleProactive from '../toggle-proactive.vue';

const value = ref(false);
</script>
