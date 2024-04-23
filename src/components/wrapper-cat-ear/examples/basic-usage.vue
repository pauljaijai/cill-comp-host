<template>
  <div class="w-full py-16 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <wrapper-cat-ear>
      <div
        class=" rounded p-2 bg-[#e4e4e4]"
        v-text="`・ω・`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear>
      <div
        class=" rounded px-6 py-10 bg-[#e4e4e4]"
        v-text="`ʘ ᴥ ʘ`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear>
      <div
        class=" rounded px-10 py-2 bg-[#e4e4e4]"
        v-text="`◕ ω ◕`"
      />
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import WrapperCatEar, { EmotionName } from '../wrapper-cat-ear.vue';
</script>
