<template>
  <text-layer
    v-for="item, index in texts"
    :key="index"
    :text="item.value"
    :class="item.class"
    :rotate
    :index
    class="pointer-events-none"
    :src="prop.src"
    :animation-duration="prop.animationDuration"
    :animation-delay="prop.animationDelay"
  />
</template>

<script setup lang="ts">
import { randomInteger, sample } from 'remeda'
import { computed, ref, watch } from 'vue'
import TextLayer from './text-layer.vue'

// #region Props
interface Props {
  src: string;
  text: string | string[] | Array<{
    value: string;
    class?: string;
  }>;
  animationDuration: number;
  animationDelay: number;
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
          class: 'text-[20vmin] font-extrabold',
        }
      }

      return item
    })
  }

  return Array.from({ length: 3 }, () => ({
    value: text,
    class: 'text-[20vmin] font-extrabold',
  }))
})

/** 旋轉角度 */
const rotate = ref(getRotate())
watch(() => prop.src, () => {
  rotate.value = getRotate()
})

/** 取得 30~10、-30~-10 度 */
function getRotate() {
  return randomInteger(10, 30) * (sample([-1, 1], 1)[0] ?? 1)
}
</script>

<style scoped lang="sass">
</style>
