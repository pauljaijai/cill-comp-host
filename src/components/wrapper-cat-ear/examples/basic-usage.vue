<template>
  <div class="w-full py-16 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <wrapper-cat-ear>
      <div
        class="border rounded p-2 bg-white"
        v-text="`・ω・`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear>
      <div
        class="border rounded px-6 py-10 bg-white"
        v-text="`ʘ ᴥ ʘ`"
      />
    </wrapper-cat-ear>

    <wrapper-cat-ear>
      <div
        class="border rounded px-10 py-2 bg-white"
        v-text="`◕ ω ◕`"
      />
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import WrapperCatEar, { ActionName } from '../wrapper-cat-ear.vue';
</script>
