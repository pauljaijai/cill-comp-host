<template>
  <div class="w-full flex-center gap-4 border border-gray-300 p-6">
    <div
      ref="faceRef"
      class="cursor-pointer"
    >
      <util-cat-face
        class="h-[20vmin]"
        :facial-expression
        :stroke-color
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FacialExpression } from '../type'
import { useCycleList, useIntervalFn, useMouseInElement, useMousePressed } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed, reactive, ref } from 'vue'
import UtilCatFace from '../util-cat-face.vue'

const { isDark } = useData()
const strokeColor = computed(() => isDark.value ? '#ddd' : '#222')

const faceRef = ref<HTMLDivElement>()
const mouseInElement = reactive(useMouseInElement(faceRef))
const { pressed: isPressed } = useMousePressed()

const { state, next } = useCycleList([
  'neutral',
  'confidence',
  'pleasant',
  'derpy',
] satisfies `${FacialExpression}`[])

useIntervalFn(next, 3000)

const facialExpression = computed<`${FacialExpression}`>(() => {
  if (isPressed.value && !mouseInElement.isOutside) {
    return 'excited'
  }

  if (!mouseInElement.isOutside) {
    return 'happy'
  }

  return state.value
})
</script>
