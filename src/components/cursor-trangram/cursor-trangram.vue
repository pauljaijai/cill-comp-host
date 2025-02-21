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
import { find, isFunction, pipe } from 'remeda'
import { computed } from 'vue'
import BaseCursor from './base-cursor.vue'

// #region Props
type Cursor = NonNullable<CSSProperties['cursor']>

interface Props {
  size?: string;
  offsetX?: number | ((cursor: Cursor) => number);
  offsetY?: number | ((cursor: Cursor) => number);
}
// #endregion Props

const props = withDefaults(defineProps<Props>(), {
  size: '8rem',
  offsetX: -40,
  offsetY: -40,
})

const mouse = useMouse({
  eventFilter: throttleFilter(15),
  type: 'client',
})
const { element } = useElementByPoint(mouse)

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

const cursor = computed<Cursor>(() => {
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

const style = computed<CSSProperties>(() => ({
  top: `${pipe(
    isFunction(props.offsetY) ? props.offsetY(cursor.value) : props.offsetY,
    (value) => value + mouse.y.value,
  )}px`,
  left: `${pipe(
    isFunction(props.offsetX) ? props.offsetX(cursor.value) : props.offsetX,
    (value) => value + mouse.x.value,
  )}px`,
}))
</script>

<style scoped lang="sass">
</style>
