<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <util-cat-face
      class="h-[20vmin]"
      :facial-expression
      :stroke-color
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

    <div class="flex gap-4">
      <base-btn
        label="上一個"
        class="flex-1"
        @click="prev()"
      />
      <base-btn
        label="下一個"
        class="flex-1"
        @click="next()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import BaseBtn from '../../base-btn.vue'
import { FacialExpression } from '../type'
import UtilCatFace from '../util-cat-face.vue'

const facialExpression = ref<`${FacialExpression}`>('neutral')
const options = Object.values(FacialExpression) as `${FacialExpression}`[]

function next() {
  const index = options.indexOf(facialExpression.value)
  facialExpression.value = options[(index + 1) % options.length] ?? FacialExpression.NEUTRAL
}
function prev() {
  const index = options.indexOf(facialExpression.value)
  facialExpression.value = options[(index - 1 + options.length) % options.length] ?? FacialExpression.NEUTRAL
}

const { isDark } = useData()
const strokeColor = computed(() => isDark.value ? '#ddd' : '#222')
</script>
