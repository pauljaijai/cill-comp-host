<template>
  <div
    ref="cardRef"
    class="card-futuristic relative opacity-0"
  >
    <suspense v-if="bgComponent">
      <component
        :is="bgComponent"
        v-bind="prop.bg"
        class="pointer-events-none absolute z-[-1]"
      />
    </suspense>

    <suspense v-if="borderComponent">
      <component
        :is="borderComponent"
        v-bind="prop.border"
        class="pointer-events-none absolute z-[-1]"
      />
    </suspense>

    <suspense v-if="cornerComponent">
      <component
        :is="cornerComponent"
        v-bind="prop.corner"
        class="pointer-events-none absolute z-[-1]"
      />
    </suspense>

    <suspense v-if="contentComponent">
      <component
        :is="contentComponent"
        ref="contentRef"
        v-bind="prop.content"
      >
        <slot />
      </component>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import type { BgParam, BorderParam, ContentParam, CornerParam } from './param'
import type { AnimeMap, Part, ProvideContent, State } from './type'
import { promiseTimeout, useElementHover, useElementSize, useRefHistory } from '@vueuse/core'
import { debounce, defaultsDeep } from 'lodash-es'
import { clone, entries, find, map, pipe } from 'remeda'
import { computed, defineAsyncComponent, provide, reactive, ref, watch } from 'vue'
import { PROVIDE_KEY } from './type'

type AnimeSequence = Record<
  State,
  Partial<Record<Part, {
    duration?: number;
    delay?: number;
  }>>
>

// #region Props
interface Props {
  animeSequence?: Partial<AnimeSequence>;

  visible?: boolean;
  selected?: boolean;
  /** 為空則自動處理，有提供則以參數數值為主 */
  hover?: boolean;

  border?: BorderParam | null;
  bg?: BgParam | null;
  corner?: CornerParam | null;
  content?: ContentParam | null;
  ornament?: undefined | null;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  animeSequence: undefined,

  visible: true,
  selected: false,
  hover: undefined,

  border: () => ({ type: 'typical' }),
  bg: () => ({ type: 'typical' }),
  corner: () => ({ type: 'typical' }),
  content: () => ({
    type: 'typical',
    class: 'p-4',
  }),
  ornament: null,
})

// #region Slots
defineSlots<{
  default?: () => unknown;
}>()
// #endregion Slots

const partList: `${Part}`[] = ['content', 'bg', 'border', 'corner', 'ornament']
// 引入所有 part 元件
const partModules = import.meta.glob(['./parts/*.vue'])
const partComponentTypeMap = pipe(
  partModules,
  entries(),
  map(([path, component]) => {
    const text = path.match(/\.\/parts\/(.+)\.vue/)?.[1]
    if (!text) {
      throw new Error(`Invalid path: ${path}`)
    }
    const [part, ...type] = text.split('-')
    if (!part || type.length === 0 || !partList.includes(part as Part)) {
      throw new Error(`元件命名錯誤: ${path}`)
    }

    return {
      part,
      type: type.join('-'),
      component: defineAsyncComponent(component as Parameters<typeof defineAsyncComponent>[0]),
    }
  }),
)
function findPartComponent(part: `${Part}`, type?: string) {
  if (!type)
    return

  return pipe(
    partComponentTypeMap,
    find(({ part: p, type: t }) => p === part && t === type),
    (target) => {
      if (!target) {
        throw new Error(`找不到對應的 ${part} 元件: ${type}`)
      }

      return target.component
    },
  )
}

const cardRef = ref<HTMLDivElement>()

const contentRef = ref<HTMLDivElement>()
const contentSize = reactive(useElementSize(contentRef, undefined, {
  box: 'border-box',
}))
const contentComponent = computed(() => findPartComponent('content', prop.content?.type))

const borderComponent = computed(() => findPartComponent('border', prop.border?.type))
const bgComponent = computed(() => findPartComponent('bg', prop.bg?.type))
const cornerComponent = computed(() => findPartComponent('corner', prop.corner?.type))

/** 儲存 part 資料 */
const partMap = new Map<`${Part}`, AnimeMap>()

/** debounce 後初始化 parts */
const initPart = debounce(async () => {
  const { visible } = prop

  // console.log(`🚀 ~ parts init Anime:`)
  await playPartsAnime(
    visible ? 'visible' : 'hidden',
    { duration: 0, delay: 0 },
  )

  /** FIX: 初始化前使用 opacity-0 強制隱藏 card，避免初始化時的閃爍
   *
   * 使用 JS 控制，依樣有閃爍問題，暫時使用 Class 控制
   */
  await promiseTimeout(100)
  cardRef.value?.classList.remove('opacity-0')
}, 5)

/** 提供子元件綁定動畫 */
const bindPart: ProvideContent['bindPart'] = ({ name, animeMap }) => {
  // console.log(`🚀 ~ [bindPart] name:`, name)
  partMap.set(name, animeMap)
  initPart()
}

provide(PROVIDE_KEY, {
  visible: computed(() => prop.visible),
  contentSize: computed(() => ({
    width: contentSize.width,
    height: contentSize.height,
  })),
  bindPart,
})

const defaultAnimeSequence: AnimeSequence = {
  normal: {
    border: { delay: 400 },
  },
  visible: {
    border: { delay: 200 },
    content: { delay: 400 },
  },
  hidden: {
    border: { delay: 100 },
    corner: { delay: 200 },
  },
  selected: {},
  hover: {
    border: { delay: 100 },
  },
}
const animeSequence = computed<AnimeSequence>(() => defaultsDeep(
  clone(prop.animeSequence),
  clone(defaultAnimeSequence),
))
async function playPartsAnime(
  state: `${State}`,
  param?: {
    duration?: number;
    delay?: number;
  },
) {
  const tasks = pipe(
    partList,
    map((key) => {
      const animeParam = param ?? animeSequence.value[state][key]

      const part = partMap.get(key)
      // console.log(`🚀 ~ key:`, key)
      // console.log(`🚀 ~ part:`, part)
      return part?.[state](animeParam)
    }),
  )

  await Promise.all(tasks)
}

const isHovered = useElementHover(cardRef)
const hover = computed(() => {
  if (prop.hover !== undefined) {
    return prop.hover
  }

  return isHovered.value
})

interface StateObject {
  visible: boolean;
  selected: boolean;
  hover: boolean;
}
/** 彙整所有狀態 */
const stateObject = computed<StateObject>(() => ({
  visible: prop.visible,
  selected: prop.selected,
  hover: hover.value,
}))
/** 方便比對狀態變化 */
const { history: stateHistory } = useRefHistory(stateObject, {
  capacity: 2,
})

/** 狀態策略，越前面越優先 */
const stateStrategies: Array<{
  execute: (state: StateObject, pState: StateObject) => Promise<void> | void;
}>
  = [
    {
      execute({ visible }, { visible: pVisible }) {
        if (visible === pVisible)
          return

        return playPartsAnime(visible ? 'visible' : 'hidden')
      },
    },
    {
      execute({ visible, selected }, { selected: pSelected }) {
        if (!visible || selected === pSelected)
          return

        return playPartsAnime(selected ? 'selected' : 'normal')
      },
    },
    {
      execute({ visible, hover, selected }, { hover: pHover }) {
        if (!visible || selected || hover === pHover)
          return

        return playPartsAnime(hover ? 'hover' : 'normal')
      },
    },
  ]

// FIX: 連續多次切換時，最後一個狀態動畫不會播放
watch(stateObject, async () => {
  const [current, prev] = stateHistory.value
  if (!current || !prev)
    return

  const state = current.snapshot
  const pState = prev.snapshot

  for (const strategy of stateStrategies) {
    const task = strategy.execute(state, pState)
    if (task !== undefined) {
      await task

      break
    }
  }
})
</script>

<style scoped lang="sass">
</style>
