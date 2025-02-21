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
        fill="#A5FF60"
      />
      <path
        id="part-2"
        d="M1050 1145L1050 2144.93L1551 1644.96L1050 1145Z"
        fill="#60DCFF"
      />
      <path
        id="part-3"
        d="M1801.46 2101.01L1551.47 2352L1301.5 2100.99L1551.49 1851L1801.46 2101.01Z"
        fill="#E5A5FF"
      />
      <path
        id="part-4"
        d="M2287.32 2175.55L1933.76 1822L1933.78 2175.54L2287.32 2175.55Z"
        fill="#608DFF"
      />
      <path
        id="part-5"
        d="M1050 2190L1050 2689.96L1301 2439.98L1050 2190Z"
        fill="#FFDC4F"
      />
      <path
        id="part-6"
        d="M1404 1292L1404.07 1792L1904.04 1791L1404 1292Z"
        fill="#FF8C45"
      />
      <path
        id="part-7"
        d="M1049.78 938.001L1049.76 1291.54L1403.29 1645.07L1402.6 1292.24L1049.78 938.001Z"
        fill="#FF6767"
      />
    </g>

    <defs class="hidden">
      <g id="default">
        <path
          id="part-1"
          d="M1832.87 1953.83L1118.16 1254.4L1125.13 1962.16L1832.87 1953.83Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M1042.8 1150.21L1053.6 2150.08L1549.17 1644.73L1042.8 1150.21Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M1804.55 2098.04L1557.29 2351.72L1304.62 2103.43L1551.89 1850.75L1804.55 2098.04Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M2291.18 2167.33L1933.83 1817.62L1937.66 2171.14L2291.18 2167.33Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M1054.09 2195.15L1059.49 2695.09L1307.78 2442.41L1054.09 2195.15Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M1398.37 1293.38L1403.84 1793.35L1903.77 1786.94L1398.37 1293.38Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M1040.34 943.227L1044.15 1296.75L1401.47 1646.43L1396.97 1293.63L1040.34 943.227Z"
          fill="#FF6767"
        />
      </g>

      <g id="pointer">
        <path
          id="part-1"
          d="M815.999 2040.53L1815.96 2048.83L1320.14 1543.74L815.999 2040.53Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M822.308 2041.35L1535.21 1340.19L827.45 1333.58L822.308 2041.35Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M1464.54 2041.03L1465.25 2395.27L1111 2394.54L1111 2041L1464.54 2041.03Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M1464.91 1692.7L1815.51 2049.18L1818.44 1695.65L1464.91 1692.7Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M471 1335.48L824.528 1689.01L825.248 1334.76L471 1335.48Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M1879.03 1695.93L1528.37 1339.51L1172.62 1690.8L1879.03 1695.93Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M1076.02 833.684L823.958 1081.58L819.808 1581.53L1070.87 1333.62L1076.02 833.684Z"
          fill="#FF6767"
        />
      </g>

      <g id="text">
        <path id="part-1" d="M2014.88 806.542L1014.91 798.695L1510.96 1303.57L2014.88 806.542Z" fill="#A5FF60" />
        <path id="part-2" d="M1003.12 2300.65L2003.02 2308.5L1507 1803.59L1003.12 2300.65Z" fill="#60DCFF" />
        <path id="part-3" d="M1509.97 1804.08L1258.98 1554.09L1509.99 1304.12L1759.98 1554.11L1509.97 1804.08Z" fill="#E5A5FF" />
        <path id="part-4" d="M1644.97 1552.95L1648.9 1052.96L1396.96 1300.99L1644.97 1552.95Z" fill="#608DFF" />
        <path id="part-5" d="M1393.92 1557L1390 2056.95L1642.95 1808.94L1393.92 1557Z" fill="#FFDC4F" />
        <path id="part-6" d="M1664.32 1557L1308.05 1907.82L1659.51 2263.41L1664.32 1557Z" fill="#FF8C45" />
        <path id="part-7" d="M1656.88 798.962L1404.92 1046.97L1401 1546.92L1651.95 1298.9L1656.88 798.962Z" fill="#FF6767" />
      </g>
    </defs>

    <!-- spread -->
    <defs class="hidden">
      <g class="spread">
        <path
          id="part-1"
          d="M1750 682.217L963.204 65L1047.4 767.763L1750 682.217Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M1971.6 2833.41L2952.77 2640.6L2365.58 2245.4L1971.6 2833.41Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M517.673 912.855L413.309 1251.38L75.2096 1145.64L180.039 808.001L517.673 912.855Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M1092 1714L1338.01 2149.29L1432.64 1808.65L1092 1714Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M2850.06 1235.17L2467.74 913L2497.16 1266.02L2850.06 1235.17Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M813.43 2882.72L796.686 2383L297.033 2400.67L813.43 2882.72Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M2952.74 444.276L2602.52 395.95L2204 697.85L2553.62 745.379L2952.74 444.276Z"
          fill="#FF6767"
        />
      </g>
      <g class="spread">
        <path
          id="part-1"
          d="M656.579 2863.38L772.626 1870.13L217.023 2308.62L656.579 2863.38Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M459.221 774.865L1233.56 1407.52L1163.37 703.216L459.221 774.865Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M2435.67 349.855L2331.31 688.381L1993.21 582.642L2098.04 245.001L2435.67 349.855Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M2204 2206L2450.01 2641.29L2544.63 2300.65L2204 2206Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M1976.68 1633.54L1477.28 1609.85L1715.09 1872.41L1976.68 1633.54Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M813.43 2882.72L796.686 2383L297.033 2400.67L813.43 2882.72Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M2561.87 1949.31L2535.15 1596.78L2155.9 1271L2183.27 1622.77L2561.87 1949.31Z"
          fill="#FF6767"
        />
      </g>
      <g class="spread">
        <path
          id="part-1"
          d="M977.579 1185.38L1093.63 192.135L538.023 630.621L977.579 1185.38Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M2392.37 423.656L1718.11 1162.06L2425.2 1130.68L2392.37 423.656Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M2681.32 2135.35L2333.3 2069.21L2400.85 1721.47L2748.05 1788.17L2681.32 2135.35Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M867.499 2087.14L419.343 2308.85L754.269 2422.06L867.499 2087.14Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M1451.59 1891.62L1502.68 1394.28L1227.45 1617.3L1451.59 1891.62Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M1454.43 1368.72L1437.69 869.002L938.033 886.672L1454.43 1368.72Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M1104.12 2458.57L1457.59 2451.27L1803.73 2090.51L1450.98 2098.5L1104.12 2458.57Z"
          fill="#FF6767"
        />
      </g>
      <g class="spread">
        <path
          id="part-1"
          d="M1208.27 2152L320 2611.33L994.24 2826.65L1208.27 2152Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M742.48 920.688L1393.45 1679.7L1448.26 974.034L742.48 920.688Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M1329.23 851.356L1173.31 533.265L1492.04 378.642L1647.01 696.408L1329.23 851.356Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M1648.41 994.927L2082.86 1242.43L1989.38 901.47L1648.41 994.927Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M2405.41 2084.81L2379.24 2584.09L2642.98 2347.59L2405.41 2084.81Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M724.601 910.195L319.717 1203.57L613.822 1607.88L724.601 910.195Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M2724.11 1501.2L2371.45 1526.16L2043.77 1903.77L2395.68 1878.16L2724.11 1501.2Z"
          fill="#FF6767"
        />
      </g>
      <g class="spread">
        <path
          id="part-1"
          d="M2163.58 1071.85L1327 524L1470.83 1217.02L2163.58 1071.85Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M939.689 1307L390 2142.28L1083.35 2000.06L939.689 1307Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M2834.4 2593.44L2601.04 2859.97L2335.47 2625.53L2568.89 2360L2834.4 2593.44Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M1467.49 2626.21L1528.31 2129.92L1249.77 2347.66L1467.49 2626.21Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M588.29 2177.54L429.372 1703.51L270.848 2020.31L588.29 2177.54Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M2688.74 1480L2335.05 1833.42L2689.1 2186.43L2688.74 1480Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M2204.19 1262.03L2495.09 1061.1L2585.03 569.289L2295.12 770.399L2204.19 1262.03Z"
          fill="#FF6767"
        />
      </g>
      <g class="spread">
        <path
          id="part-1"
          d="M2314 1795.46L2330.89 2795.32L2823.34 2286.93L2314 1795.46Z"
          fill="#A5FF60"
        />
        <path
          id="part-2"
          d="M2391.16 271.999L1915.49 1151.54L2594 950.099L2391.16 271.999Z"
          fill="#60DCFF"
        />
        <path
          id="part-3"
          d="M576.937 2896.79L458.387 2562.97L792.689 2445.78L910.337 2779.17L576.937 2896.79Z"
          fill="#E5A5FF"
        />
        <path
          id="part-4"
          d="M1216.13 1688.1L1619.45 1983.62L1565.54 1634.21L1216.13 1688.1Z"
          fill="#608DFF"
        />
        <path
          id="part-5"
          d="M2116.08 1169.58L1916.91 711L1786.27 1040.28L2116.08 1169.58Z"
          fill="#FFDC4F"
        />
        <path
          id="part-6"
          d="M1164.84 2276.29L1029.25 1795.02L548.271 1931.49L1164.84 2276.29Z"
          fill="#FF8C45"
        />
        <path
          id="part-7"
          d="M2123.03 962.905L1793.36 835.182L1336 1037.13L1665.26 1163.94L2123.03 962.905Z"
          fill="#FF6767"
        />
      </g>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import anime from 'animejs'
import { map, pipe, range, sample, shuffle } from 'remeda'
import { ref, useId, watch } from 'vue'
import { getCursorAttrs, getSpreadAttrs } from './utils'

interface Props {
  cursor: NonNullable<CSSProperties['cursor']>;
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
        duration: 150,
        delay: delayList[i],
        easing: 'easeOutCirc',
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
        duration: 150,
        delay: delayList[i],
        easing: 'easeInOutQuint',
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
})
</script>

<style scoped lang="sass">
</style>
