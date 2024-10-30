<template>
  <div
    :style
    class="bg"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

// #region Props
interface Props {
  /** @default 45deg */
  angle?: string;
  patternSize?: string;
  patternColor?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  angle: '-45deg',
  patternSize: '3px',
  patternColor: '#FAFAFA',
})

// const card = inject(PROVIDE_KEY)

const style = computed<CSSProperties>(() => ({
  inset: `10px`,
  backgroundImage: [
    'repeating-linear-gradient(',
    `${prop.angle}, transparent,`,
    `transparent ${prop.patternSize},`,
    `${prop.patternColor} ${prop.patternSize},`,
    `${prop.patternColor} calc(${prop.patternSize} * 2))`,
  ].join(''),
}))
</script>

<style scoped lang="sass">
</style>
