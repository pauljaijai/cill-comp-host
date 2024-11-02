<template>
  <svg
    ref="svgRef"
    :view-box
    :style
    fill="none"
    class="card-border"
    xmlns="http://www.w3.org/2000/svg"
  >

    <path
      id="Rectangle 4"
      d="M0 20L20 0H140L160 20V160L140 180H20L0 160V20Z"
      fill="#D9D9D9"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCardPart } from '../use-card-part'

// #region Props
export interface Props {
  color?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  color: '#FAFAFA',
})

const svgRef = ref<SVGAElement>()

function removeAnime() {
  // anime.remove(Object.values(lineStyleMap.value))
}

const { cardSize } = useCardPart('bg', {
  async normal(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}
  },
  async visible(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}
  },
  async hidden(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}
  },
  async selected(param) {
    this.hover(param)
  },
  async hover(param) {
    removeAnime()

    const {
      duration = 400,
      delay = 0,
    } = param ?? {}
  },
})

const style = computed(() => ({
  width: `${cardSize.width}px`,
  height: `${cardSize.height}px`,
}))

const viewBox = computed(
  () => `0 0 ${cardSize.width} ${cardSize.height}`,
)
</script>

<style scoped lang="sass">
</style>
