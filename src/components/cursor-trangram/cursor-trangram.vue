<template>
  <base-cursor
    v-bind="props"
    :cursor
    :style
    class="pointer-events-none fixed"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { throttleFilter, useElementByPoint, useMouse } from '@vueuse/core'
import { find, pipe } from 'remeda'
import { computed } from 'vue'
import BaseCursor from './base-cursor.vue'

// #region Props
interface Props {
  size?: string;
  offsetX?: number;
  offsetY?: number;
}
// #endregion Props

const props = withDefaults(defineProps<Props>(), {
  size: '6rem',
  offsetX: -30,
  offsetY: -30,
})

const mouse = useMouse({
  eventFilter: throttleFilter(15),
  type: 'client',
})
const { element } = useElementByPoint(mouse)

const style = computed<CSSProperties>(() => ({
  top: `${mouse.y.value + props.offsetX}px`,
  left: `${mouse.x.value + props.offsetY}px`,
}))

const cursorTagNameMap = {
  text: [
    'TEXTAREA',
    'INPUT',
    'P',
    'SPAN',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
  ],
  pointer: [
    'A',
    'BUTTON',
  ],
}

const cursor = computed<NonNullable<
  CSSProperties['cursor']
>>(() => {
  if (!element.value) {
    return 'default'
  }

  const { tagName } = element.value
  const value = getComputedStyle(element.value).cursor
  if (value === 'auto') {
    return pipe(
      Object.entries(cursorTagNameMap),
      find(([, tagNames]) => tagNames.includes(tagName)),
      (item) => item?.[0] ?? 'default',
    )
  }

  return value
})
</script>

<style scoped lang="sass">
</style>
