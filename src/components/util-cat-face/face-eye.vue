<template>
  <svg
    ref="svgRef"
    class="h-full w-full"
    :viewBox
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <g id="face-eye">
      <path
        id="eye-r"
        d="M166 508C166 445.94 215.945 418 256 418C296.055 418 346 448.165 346 508C346 567.835 316.082 598 256 598C195.918 598 166 563.879 166 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
      <path
        id="eye-l"
        d="M1346 508C1346 445.94 1296.05 418 1256 418C1215.95 418 1166 448.165 1166 508C1166 567.835 1195.92 598 1256 598C1316.08 598 1346 563.879 1346 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
    </g>

  </svg>

  <div class="hidden">
    <g class="neutral">
      <path
        id="eye-r"
        d="M166 508C166 445.94 215.945 418 256 418C296.055 418 346 448.165 346 508C346 567.835 316.082 598 256 598C195.918 598 166 563.879 166 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
      <path
        id="eye-l"
        d="M1346 508C1346 445.94 1296.05 418 1256 418C1215.95 418 1166 448.165 1166 508C1166 567.835 1195.92 598 1256 598C1316.08 598 1346 563.879 1346 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
    </g>

    <g class="neutral">
      <path
        id="eye-r"
        d="M166 508C166 506.621 215.945 506 256 506C296.055 506 346 506.67 346 508C346 509.33 316.082 510 256 510C195.918 510 166 509.242 166 508.115"
        stroke="black"
        stroke-width="100"
        stroke-linecap="round"
      />
      <path
        id="eye-l"
        d="M1346 508C1346 506.621 1296.05 506 1256 506C1215.95 506 1166 506.67 1166 508C1166 509.33 1195.92 510 1256 510C1316.08 510 1346 509.242 1346 508.115"
        stroke="black"
        stroke-width="100"
        stroke-linecap="round"
      />
    </g>
  </div>
</template>

<script setup lang="ts">
import type { FacialExpression } from './type'
import { throttleFilter, useMouseInElement } from '@vueuse/core'
import anime from 'animejs'
import { isNumber, map, pipe } from 'remeda'
import { computed, onMounted, reactive, ref } from 'vue'
import { mapNumber } from '../../common/utils'
import { getKeyframeList } from './utils'

// #region Props
interface Props {
  facialExpression: FacialExpression;
  /** 眼睛偏移半徑 */
  eyeOffsetRadius: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

const partIdList = ['eye-r', 'eye-l'] as const

const svgRef = ref()
const mouseInfo = reactive(useMouseInElement(svgRef, {
  eventFilter: throttleFilter(15),
}))

const viewBox = computed(() => {
  const offset = props.eyeOffsetRadius

  const [x, y] = pipe(
    /** 以 svg 為中心為原點之滑鼠座標 */
    {
      x: mouseInfo.elementWidth / 2 - mouseInfo.elementX,
      y: mouseInfo.elementHeight / 2 - mouseInfo.elementY,
    },
    /** 計算角度並從 eyeOffsetRadius 計算 xy 分量 */
    (position) => {
      const xRadius = Math.abs(
        mapNumber(
          position.x,
          -mouseInfo.elementWidth / 2,
          mouseInfo.elementWidth / 2,
          -offset,
          offset,
        ),
      )

      const yRadius = Math.abs(
        mapNumber(
          position.y,
          -mouseInfo.elementHeight / 2,
          mouseInfo.elementHeight / 2,
          -offset,
          offset,
        ),
      )

      const angle = Math.atan2(position.y, position.x)
      return [
        Math.cos(angle) * xRadius,
        Math.sin(angle) * yRadius,
      ]
    },
    map((value) => isNumber(value) ? value : 0),
  )

  return `${x} ${y} 1500 1000`
})

const facialExpressionProviderMap: Record<
  FacialExpression,
  () => Promise<void>
> = {
  neutral: async () => {
    const keyframeList = getKeyframeList(partIdList, 'neutral')

    anime.remove(
      partIdList.map((id) => `#face-eye #${id}`),
    )

    await Promise.all(
      partIdList.map((id) =>
        anime({
          targets: `#face-eye #${id}`,
          ...keyframeList[0]?.[id],
          duration: 500,
        }),
      ),
    )

    await Promise.all(
      partIdList.map((id) =>
        anime({
          targets: `#face-eye #${id}`,
          keyframes: keyframeList.map((keyframe) => keyframe[id]),
          duration: 50,
          delay: 3000,
          loop: true,
          direction: 'alternate',
        }),
      ),
    )
  },
  happy: () => Promise.resolve(),
  sad: () => Promise.resolve(),
  angry: () => Promise.resolve(),
  surprised: () => Promise.resolve(),
}

async function init() {
  facialExpressionProviderMap[props.facialExpression]?.()
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="sass">
</style>
