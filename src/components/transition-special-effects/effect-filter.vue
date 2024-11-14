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
      <!-- 產生雜訊 -->
      <feTurbulence
        type="turbulence"
        baseFrequency="0.05"
        numOctaves="2"
        seed="1"
        stitchTiles="noStitch"
        result="turbulence"
      />
      <!-- 依照雜訊內容偏移 -->
      <feDisplacementMap
        in="SourceGraphic"
        in2="turbulence"
        :scale="computedWave.scale"
        xChannelSelector="G"
        yChannelSelector="A"
        result="displacementMap"
      />
      <!-- 透明度 -->
      <feComponentTransfer
        in="displacementMap"
        result="alphaAdjust"
      >
        <feFuncA
          type="linear"
          :slope="computedWave.opacity"
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
  scale: 0,
  opacity: 1,
})

const computedWave = computed(() => {
  const {
    scale,
    opacity,
  } = attrWave.value

  return {
    scale,
    opacity,
  }
})

onMounted(() => {
  anime({
    targets: attrWave.value,
    scale: 100,
    opacity: 0,
    duration: 2000,
    easing: 'easeInOutExpo',
  })
})
</script>

<style scoped lang="sass">
</style>
