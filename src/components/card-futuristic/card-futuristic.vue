<template>
  <div class="relative">
    <card-bg class="pointer-events-none absolute z-[-1]" />
    <card-border class="pointer-events-none absolute z-[-1]" />
    <card-corner class="pointer-events-none absolute z-[-1]" />

    <div
      ref="contentRef"
      class="z-0"
      :class="prop.contentClass"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnimeMap, Part, ProvideContent, State } from './type'
import { until, useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { defaultsDeep } from 'lodash-es'
import { clone, map, pipe } from 'remeda'
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import CardBg from './card-bg.vue'
import CardBorder from './card-border.vue'
import CardCorner from './card-corner.vue'
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

  contentClass?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  animeSequence: undefined,

  visible: true,
  selected: false,
  hover: undefined,

  contentClass: 'p-4',
})

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [];
}>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>()
// #endregion Slots

const contentRef = ref<HTMLDivElement>()
const contentSize = reactive(useElementSize(contentRef, undefined, {
  box: 'border-box',
}))

const partList: Part[] = ['content', 'bg', 'border', 'corner', 'ornament']
const partMap = new Map<Part, AnimeMap>()

/** 用於子元件綁定動畫 */
const bindPart: ProvideContent['bindPart'] = ({ name, animeMap }) => {
  partMap.set(name, animeMap)
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
    content: {},
    bg: {},
    border: {},
    corner: {},
  },
  visible: {
    corner: {},
    bg: {},
    border: { delay: 200 },
    content: { delay: 400 },
  },
  hidden: {
    content: {},
    bg: {},
    border: { delay: 100 },
    corner: { delay: 200 },
  },
  selected: {
    content: {},
    bg: {},
    border: {},
    corner: {},
  },
}

const animeSequence = computed<AnimeSequence>(() => defaultsDeep(
  clone(prop.animeSequence),
  clone(defaultAnimeSequence),
))

/** slot 容器動畫 */
const contentAnimeMap: AnimeMap = {
  async normal(param) {
    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: 1,
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async visible(param) {
    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: [
          0,
          0.1,
          0.8,
          0.3,
          1,
        ],
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hidden(param) {
    const {
      duration = 300,
      delay = 0,
    } = param ?? {}

    const tasks = [
      anime({
        targets: contentRef.value,
        opacity: [
          1,
          0.6,
          0.1,
          0.3,
          0,
        ],
        duration,
        delay,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async selected() { },
}

bindPart({
  name: 'content',
  animeMap: contentAnimeMap,
})

function playPartsAnime(state: State) {
  pipe(
    partList,
    map((key) => {
      const animeParam = animeSequence.value[state][key]
      const part = partMap.get(key)
      return part?.[state](animeParam)
    }),
  )
}

watch(() => prop.visible, (value) => {
  if (value) {
    playPartsAnime('visible')
  }
  else {
    playPartsAnime('hidden')
  }
})

watch(() => prop.selected, (value) => {
  if (value) {
    playPartsAnime('selected')
  }
  else {
    playPartsAnime('normal')
  }
})

/** 初始化時播放一次 */
onMounted(async () => {
  // 確定 contentSize 有值才進行初始化動畫
  await until(() => contentSize.width).toBeTruthy()
  await until(() => contentSize.height).toBeTruthy()

  const { visible } = prop
  if (visible) {
    playPartsAnime('visible')
  }
  else {
    playPartsAnime('hidden')
  }
})
</script>

<style scoped lang="sass">
</style>
