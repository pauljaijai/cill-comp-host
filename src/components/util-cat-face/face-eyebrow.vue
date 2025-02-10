<template>
  <svg
    :id
    class="h-full w-full"
    viewBox="0 0 1500 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="face-eyebrow">
      <path
        id="eyebrow-r"
        d="M488.637 226.299C508.23 224.465 512.982 222.616 532.387 223.274"
        stroke="black"
        stroke-width="50"
        stroke-linecap="round"
      />
      <path
        id="eyebrow-l"
        d="M996.368 226.553C976.798 224.491 972.067 222.588 952.656 223.021"
        stroke="black"
        stroke-width="50"
        stroke-linecap="round"
      />
    </g>

    <div class="hidden">
      <!-- neutral -->
      <g class="neutral">
        <path
          id="eyebrow-r"
          d="M488.637 226.299C508.23 224.465 512.982 222.616 532.387 223.274"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M996.368 226.553C976.798 224.491 972.067 222.588 952.656 223.021"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <!-- excited -->
      <g class="excited">
        <path
          id="eyebrow-r"
          d="M421 219.219C432.045 202.932 433.641 198.089 446.49 183.533"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1068.29 220.446C1054.13 206.78 1051.57 202.369 1036 190.768"
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
const nameId = 'face-eyebrow'
const partIdList = ['eyebrow-r', 'eyebrow-l'] as const

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
