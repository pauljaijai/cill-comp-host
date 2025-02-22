<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <util-cat-face
      class="h-[20vmin]"
      :facial-expression
    />

    <div class="border-2 border-[#999] rounded">
      <select
        v-model="facialExpression"
        class="w-full p-2"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FacialExpression } from '../type'
import UtilCatFace from '../util-cat-face.vue'

const facialExpression = ref<`${FacialExpression}`>('neutral')
const options = Object.values(FacialExpression)
</script>
