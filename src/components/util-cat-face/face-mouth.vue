<template>
  <svg
    :id
    class="h-full w-full"
    viewBox="0 0 1500 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="face-mouth">
      <path
        id="palate"
        d="M630.439 663C587.274 706.267 623.48 751 666.346 751C720.972 751 745.419 669.6 748.475 669.6C751.531 669.6 774.069 751 831.75 751C882.417 751 907.767 707.733 869.568 663"
        stroke="black"
        stroke-width="50"
        stroke-linecap="round"
      />
      <path
        id="jaw"
        d="M630.439 663C587.274 706.267 623.48 751 666.346 751C720.972 751 745.419 669.6 748.475 669.6C751.531 669.6 774.069 751 831.75 751C882.417 751 907.767 707.733 869.568 663"
        stroke="black"
        stroke-width="50"
        stroke-linecap="round"
      />
    </g>

    <div class="hidden">
      <!-- neutral -->
      <g class="neutral">
        <path
          id="palate"
          d="M630.439 663C587.274 706.267 623.48 751 666.346 751C720.972 751 745.419 669.6 748.475 669.6C751.531 669.6 774.069 751 831.75 751C882.417 751 907.767 707.733 869.568 663"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="jaw"
          d="M630.439 663C587.274 706.267 623.48 751 666.346 751C720.972 751 745.419 669.6 748.475 669.6C751.531 669.6 774.069 751 831.75 751C882.417 751 907.767 707.733 869.568 663"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <!-- excited -->
      <g class="excited">
        <path
          id="palate"
          d="M630.439 663C587.274 706.267 623.48 751 666.346 751C720.972 751 745.419 669.6 748.475 669.6C751.531 669.6 774.069 751 831.75 751C882.417 751 907.767 707.733 869.568 663"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="jaw"
          d="M633 753.5C576.999 820.5 597 896.5 635.5 932.5C659.563 955 694.5 977 747.5 977C800.499 977 830.5 961 859 932.5C892.034 899.466 913.5 799.5 866.5 753.5"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>
      <g class="excited">
        <path
          id="palate"
          d="M630.439 663C587.274 706.267 623.48 751 666.346 751C720.972 751 745.419 669.6 748.475 669.6C751.531 669.6 774.069 751 831.75 751C882.417 751 907.767 707.733 869.568 663"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="jaw"
          d="M632.999 753.5C613 774 614.999 827 627.499 862C638.58 893.024 691.5 930 744.5 930C797.5 930 824 906.5 852.5 878C885.534 844.966 878.999 768.5 866.499 753.5"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>
    </div>
  </svg>
</template>

<script setup lang="ts">
import type { FacialExpression } from './type'
import { useMounted } from '@vueuse/core'
import anime from 'animejs'
import { onMounted, useId, watch } from 'vue'
import { getKeyframeList } from './utils'

// #region Props
interface Props {
  facialExpression: `${FacialExpression}`;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

const id = useId()
const nameId = 'face-mouth'
const partIdList = ['palate', 'jaw'] as const

const facialExpressionProviderMap: Record<
  FacialExpression,
  () => Promise<void>
> = {
  neutral: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'neutral')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: `#${nameId} #${partId}`,
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
  excited: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'excited')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: `#${nameId} #${partId}`,
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )

    await Promise.all(
      partIdList.map((id) =>
        anime({
          targets: `#${nameId} #${id}`,
          keyframes: keyframeList.map((keyframe) => keyframe[id]),
          duration: 600,
          delay: 400,
          loop: true,
          easing: 'easeInOutCirc',
          direction: 'alternate',
        }).finished,
      ),
    )
  },
  happy: () => Promise.resolve(),
  sad: () => Promise.resolve(),
  angry: () => Promise.resolve(),
  surprised: () => Promise.resolve(),
}
function startAnimation() {
  anime.remove(partIdList.map((id) => `#${nameId} #${id}`))
  facialExpressionProviderMap[props.facialExpression]?.()
}

onMounted(() => {
  startAnimation()
})

const isMounted = useMounted()
watch(() => props.facialExpression, () => {
  if (!isMounted.value)
    return

  startAnimation()
})
</script>

<style scoped lang="sass">
</style>
