<template>
  <btn-naughty
    disable
    z-index="9999"
  >
    <template #rubbing>
      <div class="text-x bg-lime-100 text-lime-500 text-center font-black p-4 rounded-full">
        啪！跑了
      </div>
    </template>


    <template #default>
      <div class="text-x bg-lime-600 text-white p-4 rounded-full">
        自定義按鈕
      </div>
    </template>
  </btn-naughty>
</template>

<script setup lang="ts">
import BtnNaughty from '@/components/btn-naughty/btn-naughty.vue';
</script>
