<template>
  <g ref="gRef">
    <eye
      v-for="style, i in styles"
      :key="i"
      :size="props.size"
      :style="style"
    />
  </g>
</template>

<script setup lang="ts">
import type { SVGAttributes } from 'vue'
import type { AnimeComponent, Size, StyleMap } from './type'
import anime from 'animejs'
import {
  map,
  pipe,
} from 'remeda'
import { computed, ref } from 'vue'

import eye from './kirby-eye.vue'

interface Props {
  size: Size;
  thickness: number;
}
const props = withDefaults(defineProps<Props>(), {})

const eyeSize = computed(() => {
  const base = Math.min(props.size.width, props.size.height)

  return {
    rx: Math.min(base / 16, 6),
    ry: Math.min(base / 7, 15),
  }
})
const distanceFromMouth = computed(
  () => props.size.height / 14,
)

/** [左, 右] */
const styles = computed<SVGAttributes[]>(() => {
  const kirbySize = props.size

  const [cxL, cxR] = [
    kirbySize.width / 2 - eyeSize.value.rx * 2 + props.thickness,
    kirbySize.width / 2 + eyeSize.value.rx * 2 + props.thickness,
  ]
  const cy = kirbySize.height / 2 - eyeSize.value.ry * 2 - distanceFromMouth.value + props.thickness

  return pipe(
    [cxL, cxR],
    map((cx) => ({
      ...eyeSize.value,
      cx,
      cy,
    })),
  )
})

const gRef = ref<SVGGElement>()
const gStyleMap = computed<StyleMap>(() => {
  const kirbySize = props.size

  return {
    enter: {
      style: 'transform: translateY(0px)',
    },
    leave: {
      style: `transform: translateY(-${kirbySize.height / 2}px)`,
    },
  }
})

// #region Methods
defineExpose<AnimeComponent>({
  enter(param) {
    const gEl = gRef.value
    if (!gEl)
      return

    anime.remove([gEl])

    anime({
      targets: gEl,
      ...gStyleMap.value.enter,
      ...param,
    })
  },
  leave(param) {
    const gEl = gRef.value
    if (!gEl)
      return

    anime.remove([gEl])

    anime({
      targets: gEl,
      ...gStyleMap.value.leave,
      ...param,
    })
  },
})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
