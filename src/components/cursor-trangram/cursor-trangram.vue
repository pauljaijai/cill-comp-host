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
import { reactiveComputed, throttleFilter, useElementByPoint, useMouse } from '@vueuse/core'
import { find, isFunction, pipe } from 'remeda'
import { computed, reactive, toRefs } from 'vue'
import BaseCursor from './base-cursor.vue'

// #region Props
type Cursor = NonNullable<CSSProperties['cursor']>

interface Props {
  /** 7 個積木顏色 */
  colors?: [string, string, string, string, string, string, string];
  size?: string;
  offsetX?: number | ((cursor: Cursor) => number);
  offsetY?: number | ((cursor: Cursor) => number);

  /** 可自定義位置。預設跟隨滑鼠 */
  positionProvider?: () => { x: number; y: number };
}
// #endregion Props

const props = withDefaults(defineProps<Props>(), {
  colors: () => [
    '#A5FF60',
    '#60DCFF',
    '#E5A5FF',
    '#608DFF',
    '#FFDC4F',
    '#FF8C45',
    '#FF6767',
  ],
  size: '8rem',
  offsetX: -40,
  offsetY: -40,
  positionProvider: undefined,
})

const mouse = reactive(useMouse({
  initialValue: { x: -500, y: -500 },
  eventFilter: throttleFilter(15),
  type: 'client',
}))
const position = reactiveComputed(() => ({
  x: props.positionProvider?.().x ?? mouse.x,
  y: props.positionProvider?.().y ?? mouse.y,
}))

const { element } = useElementByPoint(toRefs(position))

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
    (value) => value + position.y,
  )}px`,
  left: `${pipe(
    isFunction(props.offsetX) ? props.offsetX(cursor.value) : props.offsetX,
    (value) => value + position.x,
  )}px`,
}))
</script>

<style scoped lang="sass">
</style>
