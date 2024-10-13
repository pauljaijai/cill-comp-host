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
      fur-color="#8D6F64"
      pad-color="#000"
      size="6rem"
    />

    <toggle-proactive
      :model-value="false"
      track-active-class="bg-[#7DDAEA]"
      disabled
      fur-color="#F3F2F2"
      size="4rem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToggleProactive from '../toggle-proactive.vue';

const value = ref(false);
</script>
