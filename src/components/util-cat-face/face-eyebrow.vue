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

    <defs class="hidden">
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

      <g class="happy">
        <path
          id="eyebrow-r"
          d="M109 181.939C128.302 178.106 132.839 175.78 152.21 174.447"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1372.23 179.875C1353.41 174.104 1349.14 171.33 1330 168.037"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>
      <g class="happy">
        <path
          id="eyebrow-r"
          d="M110.142 186.069C128.329 178.556 132.328 175.392 151.069 170.316"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1368.21 187.683C1353.17 174.994 1350.32 170.764 1334.01 160.23"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <g class="sad">
        <path
          id="eyebrow-r"
          d="M453 244.885C505.515 236.385 505.515 222.885 505.515 202.14"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1045.7 242.288C1002.2 242.288 988.196 227.788 988.196 204.304"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <g class="angry">
        <path
          id="eyebrow-r"
          d="M495.754 208.569C509.348 222.797 513.746 225.377 525.269 241.005"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M990.811 210.117C975.869 222.923 971.236 225.053 958.216 239.457"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <g class="surprised">
        <path
          id="eyebrow-r"
          d="M295.464 185.306C315.047 133.237 382.886 114.42 397.709 203.805"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1195.81 193.431C1188.17 165.918 1108.65 82.6492 1094.27 221.603"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <g class="derpy">
        <path
          id="eyebrow-r"
          d="M368 167.389C386.175 159.844 390.168 156.673 408.901 151.566"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1169.64 352.826C1150.62 347.762 1146.24 345.149 1127 342.574"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <g class="speechless">
        <path
          id="eyebrow-r"
          d="M435.179 131C447.792 146.105 452.008 148.973 462.46 165.336"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1076.62 165C1063.84 179.967 1059.6 182.789 1048.97 199.037"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

      <g class="pleasant">
        <path
          id="eyebrow-r"
          d="M221 199.27C236.261 186.846 239.182 182.667 255.674 172.419"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
        <path
          id="eyebrow-l"
          d="M1299.14 182.222C1285.97 167.603 1283.72 163.024 1269 150.367"
          stroke="black"
          stroke-width="50"
          stroke-linecap="round"
        />
      </g>

    </defs>
  </svg>
</template>

<script setup lang="ts">
import type { FacialExpression } from './type'
import { useMounted } from '@vueuse/core'
import anime from 'animejs'
import { pipe } from 'remeda'
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

function getTargetId(partId: string) {
  return `#${id} #${nameId} #${partId}`
}

const facialExpressionProviderMap: Record<
  FacialExpression,
  () => Promise<void>
> = {
  neutral: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'neutral')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
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
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
  happy: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'happy')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          keyframes: pipe(
            keyframeList.map((keyframe) => keyframe[partId]),
            /** 頭尾相接
             *
             * 因為使用 direction: 'alternate' 效果不自然
             */
            (list) => {
              const newList = [...list].reverse().slice(1)
              return [...list, ...newList]
            },
          ),
          duration: 1800,
          loop: true,
        }).finished,
      ),
    )
  },
  sad: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'sad')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
  angry: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'angry')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
  surprised: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'surprised')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
  derpy: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'derpy')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
  speechless: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'speechless')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
  pleasant: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'pleasant')

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: getTargetId(partId),
          ...keyframeList[0]?.[partId],
          duration: 500,
        }).finished,
      ),
    )
  },
}
function startAnimation() {
  anime.remove(partIdList.map((id) => getTargetId(id)))
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
