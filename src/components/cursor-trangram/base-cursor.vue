<template>
  <svg
    :id="id"
    ref="svgRef"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 3000 3000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="cursor">
      <path
        id="part-1"
        d="M1831.34 1957.11L1124.23 1250L1123.55 1957.79L1831.34 1957.11Z"
        :fill="props.colors[0]"
      />
      <path
        id="part-2"
        d="M1050 1145L1050 2144.93L1551 1644.96L1050 1145Z"
        :fill="props.colors[1]"
      />
      <path
        id="part-3"
        d="M1801.46 2101.01L1551.47 2352L1301.5 2100.99L1551.49 1851L1801.46 2101.01Z"
        :fill="props.colors[2]"
      />
      <path
        id="part-4"
        d="M2287.32 2175.55L1933.76 1822L1933.78 2175.54L2287.32 2175.55Z"
        :fill="props.colors[3]"
      />
      <path
        id="part-5"
        d="M1050 2190L1050 2689.96L1301 2439.98L1050 2190Z"
        :fill="props.colors[4]"
      />
      <path
        id="part-6"
        d="M1404 1292L1404.07 1792L1904.04 1791L1404 1292Z"
        :fill="props.colors[5]"
      />
      <path
        id="part-7"
        d="M1049.78 938.001L1049.76 1291.54L1403.29 1645.07L1402.6 1292.24L1049.78 938.001Z"
        :fill="props.colors[6]"
      />
    </g>

    <base-cursor-defs />
  </svg>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import anime from 'animejs'
import { map, pipe, range, sample, shuffle } from 'remeda'
import { ref, useId, watch } from 'vue'
import BaseCursorDefs from './base-cursor-defs.vue'
import { getCursorAttrs, getSpreadAttrs } from './utils'

interface Props {
  cursor: NonNullable<CSSProperties['cursor']>;
  colors: [string, string, string, string, string, string, string];
  size: string;
}
const props = withDefaults(defineProps<Props>(), {})

const svgRef = ref<SVGElement>()
const id = useId()

function getTargetId(partId: string) {
  return `#${id} #cursor #${partId}`
}

const PART_ID_LIST = [
  'part-1',
  'part-2',
  'part-3',
  'part-4',
  'part-5',
  'part-6',
  'part-7',
] as const

const DELAY_MS_LIST = pipe(
  range(0, PART_ID_LIST.length),
  map((i) => i * 40),
)

async function startSpreadAnimate() {
  anime.remove(PART_ID_LIST.map(getTargetId))

  const list = getSpreadAttrs(id, PART_ID_LIST)
  const [target] = sample(list, 1)
  if (!target) {
    return
  }

  const delayList = shuffle(DELAY_MS_LIST)

  await Promise.all(
    PART_ID_LIST.map((partId, i) =>
      anime({
        targets: getTargetId(partId),
        ...target[partId],
        duration: 200,
        delay: delayList[i],
        easing: 'cubicBezier(0.000, 1.000, 0.205, 1.255)',
      }).finished,
    ),
  )
}
async function startCursorAnimate(
  cursor: CSSProperties['cursor'],
) {
  anime.remove(PART_ID_LIST.map(getTargetId))

  const list = getCursorAttrs(id, PART_ID_LIST, cursor)
  const delayList = shuffle(DELAY_MS_LIST)

  await Promise.all(
    PART_ID_LIST.map((partId, i) =>
      anime({
        targets: getTargetId(partId),
        ...list[partId],
        duration: 300,
        delay: delayList[i],
        easing: 'cubicBezier(1.000, 0.005, 0.000, 1.175)',
      }).finished,
    ),
  )
}

async function startAnimate(value: string) {
  await startSpreadAnimate()
  await startCursorAnimate(value)
}

const ROTATE_LIST = [60, 90, -90, -120] as const
function startSvgAnimate() {
  return anime({
    targets: svgRef.value,
    keyframes: [
      {
        rotate: 0,
        duration: 0,
      },
      {
        rotate: sample(ROTATE_LIST, 1)[0],
        duration: 300,
      },
    ],
    direction: 'alternate',
    easing: 'easeInOutCirc',
  }).finished
}

watch(() => props.cursor, async (value) => {
  Promise.all([
    // startSvgAnimate(),
    startAnimate(value),
  ])
}, {
  immediate: true,
})
</script>

<style scoped lang="sass">
</style>
