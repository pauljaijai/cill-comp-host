<template>
  <text-layer
    v-for="item, index in texts"
    :key="index"
    :text="item.value"
    :class="item.class"
    :rotate
    :index
    class="layer pointer-events-none"
    :src="prop.src"
  />
</template>

<script setup lang="ts">
import { randomInteger, sample } from 'remeda'
import { computed, ref } from 'vue'
import TextLayer from './text-layer.vue'

// #region Props
interface Props {
  src: string;
  text: string | string[] | Array<{
    value: string;
    class?: string;
  }>;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {})

const texts = computed(() => {
  const text = prop.text
  if (Array.isArray(text)) {
    return text.map((item) => {
      if (typeof item === 'string') {
        return {
          value: item,
          class: 'text-[20vmin]',
        }
      }

      return item
    })
  }

  return Array.from({ length: 3 }, () => ({
    value: text,
    class: 'text-[20vmin]',
  }))
})

/** 旋轉角度 */
const rotate = ref(getRotate())

/** 取得 30~10、-30~-10 度 */
function getRotate() {
  return randomInteger(10, 30) * (sample([-1, 1], 1)[0] ?? 1)
}
</script>

<style scoped lang="sass">
.layer
  backface-visibility: hidden
</style>
