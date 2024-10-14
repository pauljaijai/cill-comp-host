<template>
  <div
    ref="wrapperRef"
    class="relative"
  >
    <ear-left
      class="absolute right-0 top-0 -z-10"
      :style="leftEarStyle"
      v-bind="props"
    />
    <ear-right
      class="right-ear absolute left-0 top-0 -z-10"
      :style="rightEarStyle"
      v-bind="props"
    />
    <slot />
  </div>
</template>

<script lang="ts">
// #region ActionName
// #endregion ActionName
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ActionName } from '.'
import { throttleFilter, useMouseInElement } from '@vueuse/core'
import { computed, ref } from 'vue'
import EarLeft from './cat-ear-left.vue'
import EarRight from './cat-ear-right.vue'

// #region Props
interface Props {
  /** 目前動作 */
  action?: `${ActionName}`;
  /** 主要毛色 */
  mainColor?: string;
  /** 耳朵內部的顏色 */
  innerColor?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  action: 'relaxed',
  mainColor: '#E7E7E7',
  innerColor: '#fcfcfc',
})

// #region Emits
const emit = defineEmits<{
  'update:action': [value: Props['action']];
}>()
// #endregion Emits

const wrapperRef = ref<HTMLDivElement>()
const {
  elementWidth: width,
} = useMouseInElement(wrapperRef, {
  eventFilter: throttleFilter(35),
})

const earWidth = computed(() => width.value / 4)

const leftEarStyle = computed<CSSProperties>(() => ({
  width: `${earWidth.value}px`,
  translate: `0% calc(-100% + ${earWidth.value / 2}px)`,
}))
const rightEarStyle = computed<CSSProperties>(() => ({
  width: `${earWidth.value}px`,
  translate: `0% calc(-100% + ${earWidth.value / 2}px)`,
}))

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
