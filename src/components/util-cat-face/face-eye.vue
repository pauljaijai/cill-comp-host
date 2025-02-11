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

    <defs class="hidden">
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

      <!-- happy -->
      <g class="happy">
        <path
          id="eye-r"
          d="M152 499.74C162.347 474.172 199.536 423.244 210.325 415.5C221.114 407.756 276.302 356.431 311.709 362.407C347.116 368.384 383.16 442.239 390.362 453.089C397.565 463.94 419.667 516.232 420.66 545.09"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
        <path
          id="eye-l"
          d="M1357.83 497.74C1347.48 472.172 1310.29 421.244 1299.5 413.5C1288.71 405.756 1233.52 354.431 1198.12 360.407C1162.71 366.384 1126.67 440.239 1119.46 451.089C1112.26 461.94 1090.16 514.232 1089.17 543.09"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
      </g>
      <g class="happy">
        <path
          id="eye-r"
          d="M155.381 482.808C164.301 456.708 198.624 403.806 208.969 395.478C219.315 387.151 271.587 332.859 307.27 336.873C342.953 340.887 383.016 412.641 390.806 423.077C398.596 433.514 423.55 484.507 426.134 513.266"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
        <path
          id="eye-l"
          d="M1349.4 490.989C1342.37 464.317 1311.93 409.092 1302.2 400.044C1292.48 390.997 1244.23 333.099 1208.36 334.546C1172.48 335.993 1127.37 404.692 1118.86 414.544C1110.34 424.395 1081.8 473.469 1077.16 501.969"
          stroke="black"
          stroke-width="100"
          stroke-linecap="round"
        />
      </g>
    </defs>
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
  happy: async () => {
    const keyframeList = getKeyframeList(id, partIdList, 'happy')

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
