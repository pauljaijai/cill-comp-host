<template>
  <div class="flex">
    <btn-naughty
      disable
      z-index="10"
    >
      <div class="custom-button">
        自定義按鈕
      </div>
    </btn-naughty>
  </div>
</template>

<script setup lang="ts">
import BtnNaughty from '../btn-naughty.vue';
</script>

<style scoped lang="sass">
.custom-button
  background: #ff8345
  color: white
  padding: 0.5rem 1.5rem
  border-radius: 999rem
</style>
