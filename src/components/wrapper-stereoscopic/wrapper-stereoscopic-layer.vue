<template>
  <slot :style="style" />
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { ProvideContent } from '.'
import { computed, inject, onBeforeUnmount, onMounted, useId } from 'vue'
import { PROVIDE_KEY } from '.'

interface Props {
  index?: number;
}
const props = withDefaults(defineProps<Props>(), {
  index: 1,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const id = useId()
const wrapper = inject<ProvideContent>(PROVIDE_KEY)

const style = computed<StyleValue>(() => {
  return {
    transform: `translateZ(${wrapper?.zOffset.value}px)`,
    transformStyle: 'preserve-3d',
  }
})

onMounted(() => {
  wrapper?.bindLayer?.({ id })
})
onBeforeUnmount(() => {
  wrapper?.unbindLayer?.(id)
})
</script>
