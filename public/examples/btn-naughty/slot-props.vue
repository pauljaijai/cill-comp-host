<template>
  <btn-naughty
    disable
    z-index="9999"
  >
    <template #rubbing="{ isRunning }">
      <div class="text-xl bg-lime-100 text-lime-500 text-center font-black p-4 rounded-full">
        {{ isRunning ? '😜' : '😗' }}
      </div>
    </template>


    <template #default="{ isRunning }">
      <div class="text-xl bg-lime-600 text-white p-4 rounded-full">
        {{ isRunning ? '不給你點' : '我是按紐' }}
      </div>
    </template>
  </btn-naughty>
</template>

<script setup lang="ts">
import BtnNaughty from '@/components/btn-naughty.vue';
</script>
