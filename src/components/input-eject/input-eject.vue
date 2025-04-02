<template>
  <input
    ref="input"
    v-model="modelValue"
    v-bind="$attrs"
    type="text"
  >

  <text-canvas
    ref="canvas"
    :origin-position
    :text-style
    :input-size="inputBounding"
  />
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import anime from 'animejs'
import { diffChars } from 'diff'
import { computed, reactive, useTemplateRef, watch } from 'vue'
import TextCanvas from './text-canvas.vue'

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props

// #region Emits
interface Emits {
  'update:modelValue': [value: Props['modelValue']];
}
// #endregion Emits

// #region Slots
interface Slots {
  default?: () => unknown;
}
// #endregion Slots

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits<Emits>()

defineSlots<Slots>()

const modelValue = defineModel<string>()
const inputRef = useTemplateRef('input')
const inputBounding = reactive(useElementBounding(inputRef))

const canvasRef = useTemplateRef('canvas')

function startEjectAnimation() {
  anime.remove(inputRef.value)

  anime({
    targets: inputRef.value,
    scale: [
      {
        value: 1.05,
        easing: 'easeOutQuad',
        duration: 20,
      },
      {
        value: 1,
        duration: 600,
      },
    ],
  })
}

/** 輸入框中心上方座標 */
const originPosition = computed(() => {
  const { left, top, width, height } = inputBounding

  return {
    x: left + width / 2,
    y: top,
  }
})

/** text 樣式必須與 input 相同 */
const textStyle = computed(() => {
  const style = inputRef.value?.computedStyleMap()
  if (!style)
    return undefined

  const fontSize = style.get('font-size')?.toString() ?? ''
  const fontFamily = style.get('font-family')?.toString() ?? ''
  const fontWeight = style.get('font-weight')?.toString() ?? ''
  const fontStyle = style.get('font-style')?.toString() ?? ''
  const color = style.get('color')?.toString() ?? ''

  return {
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    color,
  }
})

watch(modelValue, (value = '', oldValue = '') => {
  let currentIndex = 0
  let hasText = false

  diffChars(oldValue, value).forEach((item) => {
    if (item.removed) {
      canvasRef.value?.addText(item.value, currentIndex)
      hasText = true
    }

    currentIndex += item.count ?? 0
  })

  if (hasText) {
    startEjectAnimation()
  }
})

// #region Methods
interface Expose { }
// #endregion Methods

defineExpose<Expose>({})
</script>

<style scoped lang="sass">
</style>
