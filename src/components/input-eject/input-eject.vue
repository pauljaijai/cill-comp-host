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
  sanitization?: (text: string) => string;
}
// #endregion Props

// #region Emits
interface Emits {
  'update:modelValue': [value: Props['modelValue']];
}
// #endregion Emits

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits<Emits>()

const modelValue = defineModel<string>()
watch(modelValue, (value) => {
  if (props.sanitization && value) {
    modelValue.value = props.sanitization(value)
  }
})

const inputRef = useTemplateRef('input')
const inputBounding = reactive(useElementBounding(inputRef))

const canvasRef = useTemplateRef('canvas')

function startEjectAnimation() {
  anime.remove(inputRef.value)

  anime({
    targets: inputRef.value,
    scale: [
      {
        value: 1.1,
        easing: 'easeOutQuad',
        duration: 50,
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
interface Expose {
  /** 手動彈射字元 */
  ejectText: (text: string) => void;
}
// #endregion Methods

defineExpose<Expose>({
  ejectText(text: string) {
    canvasRef.value?.addText(text, 0)
    startEjectAnimation()
  },
})
</script>

<style scoped lang="sass">
</style>
