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
      class="char inline-block opacity-0"
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
  duration: 200,
  delay: (index: number) => index * 100,
})

const card = inject(PROVIDE_KEY)

const id = useId()
/** text 在 vDOM 中的順序 */
const index = Number(id.split('-').at(-1))

const contentRef = ref<HTMLDivElement>()

const chars = computed(() => prop.text.split(/.*?/u))

function enter() {
  const delay = prop.duration / chars.value.length

  return anime({
    targets: `.${id} .char`,
    opacity: [0, 1],
    duration: 200,
    delay: anime.stagger(delay),
  }).finished
}
function leave() {
  const delay = prop.duration / chars.value.length

  return anime({
    targets: `.${id} .char`,
    opacity: [0, 1],
    duration: 200,
    delay: anime.stagger(delay),
    easing: 'steps(1)',
  }).finished
}

if (!card) {
  console.warn('此元件必須包在 CardFuturistic 元件中')
}
else {
  card.bindText({
    id,
    index,
    enter,
    leave,
  })
}
</script>

<style scoped lang="sass">
</style>
