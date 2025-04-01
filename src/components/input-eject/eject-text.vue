<template>
  <span
    ref="text"
    class="fixed leading-none"
    :style
  >
    {{ props.text }}
  </span>
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import { computed, reactive, useTemplateRef } from 'vue'

interface Props {
  id: string;
  index: number;
  text: string;
  /** 起點座標 */
  startPosition: {
    x: number;
    y: number;
  };
}

interface Emits {
  remove: [id: string];
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const textRef = useTemplateRef('text')
const textBounding = reactive(useElementBounding(textRef))

setTimeout(() => {
  emit('remove', props.id)
}, 5000)

const style = computed(() => {
  const { x, y } = props.startPosition

  return {
    left: `${x - textBounding.width / 2}px`,
    top: `${y - textBounding.height / 2}px`,
  }
})
</script>

<style scoped lang="sass">
</style>
