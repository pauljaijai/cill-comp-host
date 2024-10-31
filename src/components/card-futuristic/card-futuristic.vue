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
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { entries, map, pipe } from 'remeda'
import { computed, provide, reactive, ref, watch } from 'vue'
import CardBg from './card-bg.vue'
import CardBorder from './card-border.vue'
import CardCorner from './card-corner.vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  visible?: boolean;
  contentClass?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  visible: true,
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

const partMap = new Map<Part, AnimeMap>()

const bindPart: ProvideContent['bindPart'] = ({ name, animeMap }) => {
  partMap.set(name, animeMap)
}

provide(PROVIDE_KEY, {
  visible: computed(() => prop.visible),
  bodySize: computed(() => ({
    width: contentSize.width,
    height: contentSize.height,
  })),
  bindPart,
})

const animeSequence: Record<
  State,
  Partial<Record<Part, {
    duration?: number;
    delay?: number;
  }>>
> = {
  visible: {
    corner: {},
    bg: {},
    border: { delay: 200 },
    content: { delay: 600 },
  },
  hidden: {
    content: {},
    bg: {},
    border: {},
    corner: { delay: 200 },
  },
}

/** slot 容器動畫 */
const contentAnimeMap: AnimeMap = {
  async visible() {
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
        duration: 300,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
  async hidden() {
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
        duration: 300,
        easing: 'linear',
      }).finished,
    ]

    await Promise.all(tasks)
  },
}

bindPart({
  name: 'content',
  animeMap: contentAnimeMap,
})

watch(() => prop.visible, (value) => {
  if (value) {
    pipe(
      animeSequence.visible,
      entries(),
      map(([key, animeParam]) => {
        const target = partMap.get(key)
        return target?.visible(animeParam)
      }),
    )
  }
  else {
    pipe(
      animeSequence.hidden,
      entries(),
      map(([key, animeParam]) => {
        const target = partMap.get(key)
        return target?.hidden(animeParam)
      }),
    )
  }
})
</script>

<style scoped lang="sass">
</style>
