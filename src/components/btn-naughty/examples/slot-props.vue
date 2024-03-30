<template>
  <div class="flex border border-gray-300 p-6">
    <btn-naughty
      disable
      z-index="30"
    >
      <template #rubbing="{ isRunning }">
        <div class="rubbing ">
          {{ isRunning ? '😜' : '😗' }}
        </div>
      </template>


      <template #default="{ isRunning }">
        <div class="btn">
          {{ isRunning ? '點不到咧' : '點此中獎' }}
        </div>
      </template>
    </btn-naughty>
  </div>
</template>

<script setup lang="ts">
import BtnNaughty from '../btn-naughty.vue';
</script>

<style scoped lang="sass">
.btn
  padding: 0.5rem 1.5rem
  background: #26A69A
  border-radius: 999rem
  font-weight: bold
  color: white
  font-size: 1.25rem
  cursor: pointer

.rubbing
  padding: 0.5rem 1.5rem
  background: #FEFEFE
  border-radius: 999rem
  border: 1px dashed #777
  text-align: center
  font-size: 1.25rem
</style>
