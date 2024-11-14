<template>
  <svg class="hidden">
    <filter
      :id="prop.filterId"
      color-interpolation-filters="linearRGB"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      width="200%"
      height="200%"
    >
      <feTurbulence
        type="turbulence"
        :baseFrequency="computedWave.baseFrequency"
        numOctaves="2"
        seed="1"
        stitchTiles="noStitch"
        result="turbulence"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="turbulence"
        :scale="computedWave.scale"
        xChannelSelector="G"
        yChannelSelector="A"
        result="displacementMap"
      />
      <feComponentTransfer
        in="displacementMap"
        result="alphaAdjust"
      >
        <feFuncA
          type="linear"
          :slope="computedWave.opacity"
          intercept="0"
        />
      </feComponentTransfer>
    </filter>
  </svg>
</template>

<script setup lang="ts">
import anime from 'animejs'
import { computed, onMounted, ref } from 'vue'

// #region Props
interface Props {
  filterId: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})
// #endregion Slots

const attrWave = ref({
  baseFrequency: {
    x: 0.01,
    y: 0.05,
  },
  scale: 0,
  opacity: 1,
})

const computedWave = computed(() => {
  const {
    baseFrequency,
    scale,
    opacity,
  } = attrWave.value

  return {
    baseFrequency: `${baseFrequency.x} ${baseFrequency.y}`,
    scale,
    opacity,
  }
})

onMounted(() => {
  setTimeout(() => {
    anime({
      targets: attrWave.value,
      scale: 500,
      opacity: 0,
      duration: 2000,
      easing: 'easeInOutExpo',
    })

    // anime({
    //   targets: attrWave.value.baseFrequency,
    //   x: 0.001,
    //   y: 0.005,
    //   duration: 3000,
    //   easing: 'easeInExpo',
    // })
  }, 2000)
})
</script>

<style scoped lang="sass">
</style>
