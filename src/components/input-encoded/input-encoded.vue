<template>
  <input
    :value="currentString"
    type="text"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
    @beforeinput="handleBeforeInput"
    @input="handleInput"
  >
</template>

<script setup lang="ts">
import { until, useActiveElement } from '@vueuse/core'
import { pipe, prop } from 'remeda'
import { computed, ref, shallowRef, triggerRef, watch } from 'vue'
import { useChar } from './use-char'

// #region Props
interface Props {
  modelValue?: string;
  /** 編碼效果的字元集合
   *
   * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   */
  charset?: string;
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
  charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
})

const emit = defineEmits<Emits>()

defineSlots<Slots>()

const activeEl = useActiveElement()

const charList = shallowRef<ReturnType<typeof useChar>[]>(
  props.modelValue.split('').map((char) => {
    if (typeof props.charset === 'string') {
      return useChar(char, props.charset)
    }

    return useChar(char, props.charset)
  }),
)

let isComposing = false
/** input 事件已經觸發 */
const isAfterOnInput = ref(false)
/** 紀錄 caret 位置 */
let caretPosition = 0

/** 在 onInput 中取得之 selectionStart、selectionEnd 永遠相同
 *
 * 刪除、反白後編輯，這類可能與 selectionRange 相關的事件必須在 onBeforeInput 中處理
 *
 * 反白後編輯則預先刪除反白部分
 */
async function handleBeforeInput(event: Event) {
  // console.log(`🚀 ~ [handleBeforeInput] event:`, event)
  isAfterOnInput.value = false

  if (!(event instanceof InputEvent)) {
    return
  }

  const targetEl = event.target
  if (!(targetEl instanceof HTMLInputElement)) {
    return
  }

  const selectionStart = targetEl.selectionStart ?? targetEl.value.length
  const selectionEnd = targetEl.selectionEnd ?? targetEl.value.length
  const deleteCount = selectionEnd - selectionStart

  if (event.inputType.includes('delete')) {
    if (deleteCount > 0) {
      charList.value.splice(selectionStart, deleteCount)
    }
    else {
      charList.value.splice(selectionStart - 1, 1)
    }
  }

  if (event.inputType.includes('insert') && deleteCount > 0) {
    charList.value.splice(selectionStart, deleteCount)
  }

  /** 必須等到 onInput 完成後才能觸發 charList 變更
   *
   * 如果沒有等到 onInput 完成，會導致 input value 多刪除一個字元
   *
   * 原因如下：假設字串為 123
   *
   * 1. 刪除 3，onBeforeInput 先觸發，讓 charList 變為 12
   *
   * 2. 這個時候 input value 還沒實際刪除 3，但是 charList 已經變為 12，所以 input value 變為 12
   *
   * 3. 接著 input value 觸發刪除，但是 3 已經沒了，導致 2 被刪掉，最終只剩下 1
   *
   * 4. 結果就是從 123 變成 1，而不是預期的 12
   */
  await until(isAfterOnInput).toBe(true)
  triggerRef(charList)
}
async function handleInput(event: Event) {
  // console.log(`🚀 ~ [handleInput] event:`, event)

  /** CompositionEvent 用於中文輸入 */
  if (!(event instanceof InputEvent) && !(event instanceof CompositionEvent)) {
    return
  }

  const targetEl = event.target
  if (isComposing || !(targetEl instanceof HTMLInputElement)) {
    return
  }

  const selectionStart = targetEl.selectionStart ?? targetEl.value.length
  caretPosition = selectionStart

  if (
    ('inputType' in event && event.inputType.includes('insert'))
    || event.type === 'compositionend'
  ) {
    // 根據 selectionStart 位置插入 event.data
    const charset = props.charset ?? ''
    const charDataList = (event.data ?? '')
      .split('')
      .map((char) => useChar(char, charset))

    charDataList.forEach(({ start }, i) => start(i * 20))

    charList.value.splice(selectionStart - 1, 0, ...charDataList)
    triggerRef(charList)
  }

  isAfterOnInput.value = true
}

/** 處理中文拼字問題
 *
 * 等到拼字結束後才觸發 input 事件
 */
function handleCompositionStart() {
  isComposing = true
}
function handleCompositionEnd(event: Event) {
  isComposing = false
  handleInput(event)
}

const currentString = computed(() => pipe(
  charList.value,
  (chars) => chars.map(prop('value')).join(''),
))

/** value 變化會讓 caret 跳至最後，所以要不斷復歸位置
 *
 * DOM 更新後觸發 setSelectionRange 才有用，所以 flush 設為 post
 */
watch(currentString, async () => {
  if (!(activeEl.value instanceof HTMLInputElement)) {
    return
  }

  activeEl.value.setSelectionRange(caretPosition, caretPosition)
}, { flush: 'post' })

watch(charList, (list) => {
  const value = list.map(prop('original')).join('')
  emit('update:modelValue', value)
})

// #region Methods
interface Expose { }
// #endregion Methods

defineExpose<Expose>({})
</script>

<style scoped lang="sass">
</style>
