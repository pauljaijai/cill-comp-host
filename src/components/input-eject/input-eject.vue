<template>
  <input
    ref="input"
    v-model="modelValue"
    v-bind="$attrs"
    type="text"
  >

  <text-canvas
    :list="textList"
    :origin-position
    :text-style
  />
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import anime from 'animejs'
import { diffChars } from 'diff'
import { computed, reactive, ref, useTemplateRef, watch } from 'vue'
import TextCanvas from './text-canvas.vue'

interface TextItem {
  id: string;
  index: number;
  text: string;
}

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

function startEjectAnimation() {
  anime.remove(inputRef.value)

  anime({
    targets: inputRef.value,
    scale: [
      {
        value: 1.05,
        easing: 'easeOutQuad',
        duration: 30,
      },
      {
        value: 1,
        easing: 'easeInOutQuad',
        duration: 50,
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

/** 被彈飛的文字 */
const textMap = ref(new Map<string, TextItem>())
const textList = computed(() => Array.from(textMap.value.values()))

function removeText(id: string) {
  textMap.value.delete(id)
}

watch(modelValue, (value = '', oldValue = '') => {
  let currentIndex = 0

  const list = diffChars(oldValue, value).reduce((acc, item) => {
    if (item.removed) {
      acc.push({
        id: crypto.randomUUID(),
        index: currentIndex,
        text: item.value,
      })
    }

    currentIndex += item.count ?? 0

    return acc
  }, [] as TextItem[])

  if (list.length === 0)
    return

  startEjectAnimation()
  list.forEach((item) => {
    textMap.value.set(item.id, item)
  })
})

// #region Methods
interface Expose { }
// #endregion Methods

defineExpose<Expose>({})
</script>

<style scoped lang="sass">
</style>
