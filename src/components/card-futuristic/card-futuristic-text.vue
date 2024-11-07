<template>
  <component
    :is="prop.tag"
    ref="contentRef"
    :aria-label="prop.text"
    :class="id"
  >
    <span
      v-for="char, i in chars"
      :key="i"
      aria-hidden
      class="char inline-block whitespace-pre"
    >
      {{ char }}
    </span>
  </component>
</template>

<script setup lang="ts">
import anime from 'animejs'
import { computed, inject, ref, useId } from 'vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  text: string;
  tag?: string;
  duration?: number;
  delay?: number | ((index: number) => number);
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  tag: 'p',
  duration: 100,
  delay: () => (index: number) => index * 80,
})

const card = inject(PROVIDE_KEY)

const id = useId()
/** text 在 vDOM 中的順序 */
const index = Number(id.split('-').at(-1))

const contentRef = ref<HTMLDivElement>()

const chars = computed(() => prop.text.split(/.*?/u))

interface AnimeParam {
  duration?: number;
}

const targets = `.${id} .char`

function enter(param?: AnimeParam) {
  const {
    duration = prop.duration,
  } = param ?? {}
  const delay = prop.duration / chars.value.length

  anime.remove(targets)

  return anime({
    targets,
    opacity: [0.9, 0.4, 1],
    duration,
    delay: anime.stagger(delay),
  }).finished
}
function leave(param?: AnimeParam) {
  const {
    duration = prop.duration,
  } = param ?? {}
  const delay = prop.duration / chars.value.length

  anime.remove(targets)

  return anime({
    targets,
    opacity: [0.4, 0.9, 0],
    duration,
    delay: anime.stagger(delay),
  }).finished
}

if (!card) {
  console.warn('此元件必須包在 CardFuturistic 元件中')
}
else {
  card.bindText({
    id,
    index,
    delay: prop.delay,
    animeMap: {
      enter,
      leave,
    },
  })
}
</script>

<style scoped lang="sass">
</style>
