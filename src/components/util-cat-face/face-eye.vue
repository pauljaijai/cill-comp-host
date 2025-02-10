<template>
  <svg
    :id
    ref="svgRef"
    class="h-full w-full"
    :viewBox
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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

    <div class="hidden">
      <!-- neutral -->
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

      <!-- excited -->
      <g class="excited">
        <path
          id="eye-r"
          d="M210 386C249 404.916 301.5 435.082 306 438.765C310.5 442.449 372 484.562 372 497.173C372 509.783 325 545.237 315.5 552.593C306 559.949 249 592.084 210 611"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
        <path
          id="eye-l"
          d="M1290 382C1251 400.916 1198.5 431.082 1194 434.765C1189.5 438.449 1128 480.562 1128 493.173C1128 505.783 1175 541.237 1184.5 548.593C1194 555.949 1251 588.084 1290 607"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
      </g>
      <g class="excited">
        <path
          id="eye-r"
          d="M210 401C249 417.31 301.5 443.319 306 446.496C310.5 449.672 372 485.982 372 496.855C372 507.729 325 538.297 315.5 544.64C306 550.983 249 578.69 210 595"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
        <path
          id="eye-l"
          d="M1290 398C1251 414.31 1198.5 440.319 1194 443.496C1189.5 446.672 1128 482.982 1128 493.855C1128 504.729 1175 535.297 1184.5 541.64C1194 547.983 1251 575.69 1290 592"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
      </g>
    </div>
  </svg>
</template>

<script setup lang="ts">
import type { FacialExpression } from './type'
import { throttleFilter, useMounted, useMouseInElement } from '@vueuse/core'
import anime from 'animejs'
import { isNumber, map, pipe } from 'remeda'
import { computed, onMounted, reactive, ref, useId, watch } from 'vue'
import { mapNumber } from '../../common/utils'
import { getKeyframeList } from './utils'

// #region Props
interface Props {
  facialExpression: `${FacialExpression}`;
  /** 眼睛偏移半徑 */
  eyeOffsetRadius: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

const id = useId()
const nameId = 'face-eye'
const partIdList = ['eye-r', 'eye-l'] as const

const svgRef = ref()
const mouseInfo = reactive(useMouseInElement(svgRef, {
  eventFilter: throttleFilter(15),
}))

const viewBox = computed(() => {
  if (props.facialExpression !== 'neutral') {
    return '0 0 1500 1000'
  }

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
    const keyframeList = getKeyframeList(id, partIdList, 'neutral')

    await Promise.all(
      partIdList.map((id) =>
        anime({
          targets: `#${nameId} #${id}`,
          ...keyframeList[0]?.[id],
          duration: 500,
        }).finished,
      ),
    )

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: `#${nameId} #${partId}`,
          keyframes: keyframeList.map((keyframe) => keyframe[partId]),
          duration: 50,
          delay: 3000,
          loop: true,
          direction: 'alternate',
        }).finished,
      ),
    )
  },
  excited: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'excited')

    await Promise.all(
      partIdList.map((id) =>
        anime({
          targets: `#${nameId} #${id}`,
          ...keyframeList[0]?.[id],
          duration: 500,
        }).finished,
      ),
    )

    await Promise.all(
      partIdList.map((partId) =>
        anime({
          targets: `#${nameId} #${partId}`,
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
          duration: 1600,
          loop: true,
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
