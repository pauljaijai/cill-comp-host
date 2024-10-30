<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-corner"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path v-bind="cornerStyleMap.lt" />
      <path v-bind="cornerStyleMap.rt" />
      <path v-bind="cornerStyleMap.br" />
      <path v-bind="cornerStyleMap.bl" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { addProp, mapValues, pipe } from 'remeda'
import { computed, inject, reactive, ref, watch } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  cornerSize?: number;
  cornerColor?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  cornerSize: 14,
  cornerColor: '#444',
})

const svgRef = ref<SVGAElement>()
const svgSize = reactive(useElementSize(svgRef, undefined, {
  box: 'border-box',
}))

const card = inject(PROVIDE_KEY)
const cardSize = computed(() => ({
  width: card?.bodySize.value.width ?? 0,
  height: card?.bodySize.value.height ?? 0,
}))

const offset = computed(() => prop.cornerSize / 4)
const style = computed(() => ({
  left: `-${offset.value}px`,
  top: `-${offset.value}px`,
  width: `${cardSize.value.width + offset.value * 2}px`,
  height: `${cardSize.value.height + offset.value * 2}px`,
}))

const viewBox = computed(
  () => `0 0 ${svgSize.width} ${svgSize.height}`,
)

const cornerStyleMap = computed(() => pipe(
  {
    lt: {
      d: `M0 0H${prop.cornerSize}L0 ${prop.cornerSize}V0Z`,
    },
    rt: {
      d: [
        `M${svgSize.width} 0L${svgSize.width}`,
        `${prop.cornerSize}L${svgSize.width - prop.cornerSize} 0 0Z`,
      ].join(' '),
    },
    br: {
      d: [
        `M${svgSize.width} ${svgSize.height}`,
        `L${svgSize.width - prop.cornerSize} ${svgSize.height}`,
        `L${svgSize.width} ${svgSize.height - prop.cornerSize}`,
        `L${svgSize.width} ${svgSize.height}Z`,
      ].join(' '),
    },
    bl: {
      d: [
        `M0 ${svgSize.height}`,
        `L0 ${svgSize.height - prop.cornerSize}`,
        `L${prop.cornerSize} ${svgSize.height}`,
        `L0 ${svgSize.height}Z`,
      ].join(' '),
    },
  },
  mapValues(addProp('fill', prop.cornerColor)),
))

watch(() => card, (data) => {
  const { visible } = data ?? {}

  if (visible?.value) {
    anime({
      targets: svgRef.value,
      opacity: [
        0,
        0.1,
        0.8,
        0.3,
        1,
      ],
      duration: 200,
      easing: 'linear',
    })
  }
  else {
    anime({
      targets: svgRef.value,
      opacity: [
        1,
        0.6,
        0.1,
        0.8,
        0.3,
        0,
      ],
      duration: 200,
      delay: 600,
      easing: 'linear',
    })
  }
}, {
  deep: true,
})
</script>

<style scoped lang="sass">
</style>
