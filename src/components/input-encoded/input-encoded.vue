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
import { useActiveElement } from '@vueuse/core'
import { pipe, prop } from 'remeda'
import { computed, shallowRef, triggerRef, watch } from 'vue'
import { useChar } from './use-char'

// #region Props
interface Props {
  modelValue?: string;

  /** 編碼效果的字元集
   *
   * 可以根據 char 來決定字元集，依矩陣順序判斷
   *
   * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   */
  charset?: string | Array<(char: string) => string | undefined>;

  /** 字符變化間隔毫秒數
   *
   * @default 20
   */
  encodeInterval?: number;

  /** 編碼次數
   *
   * @default 10
   */
  encodeTimes?: number;
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
  encodeInterval: 20,
  encodeTimes: 10,
})

const emit = defineEmits<Emits>()

defineSlots<Slots>()

const activeEl = useActiveElement()

const charList = shallowRef<ReturnType<typeof useChar>[]>(
  props.modelValue.split(/.*?/u).map((char) => {
    const charset = pipe(undefined, () => {
      if (typeof props.charset === 'string') {
        return props.charset
      }

      for (const getCharset of props.charset) {
        const result = getCharset(char)
        if (result) {
          return result
        }
      }

      return ''
    })

    return useChar(char, charset, {
      interval: props.encodeInterval,
      count: props.encodeTimes,
    })
  }),
)

let isComposing = false
/** 紀錄 caret 位置 */
let caretPosition = 0

function getCharDataList(data: string) {
  return data
    .split(/.*?/u)
    .map((char, i) => {
      const charset = pipe(undefined, () => {
        if (typeof props.charset === 'string') {
          return props.charset
        }

        for (const getCharset of props.charset) {
          const result = getCharset(char)
          if (result) {
            return result
          }
        }

        return ''
      })

      const result = useChar(char, charset, {
        interval: props.encodeInterval,
        count: props.encodeTimes,
      })
      result.start(i * 20)

      return result
    })
}

/** 在 onInput 中取得之 selectionStart、selectionEnd 永遠相同
 *
 * 刪除、反白後編輯，這類可能與 selectionRange 相關的事件必須在 onBeforeInput 中處理
 *
 * 反白後編輯則預先刪除反白部分
 */
async function handleBeforeInput(event: Event) {
  // console.log(`🚀 ~ [handleBeforeInput] event:`, event)
  if (!(event instanceof InputEvent)) {
    return
  }

  const targetEl = event.target
  if (!(targetEl instanceof HTMLInputElement)) {
    return
  }

  const selectionStart = targetEl.selectionStart ?? targetEl.value.length
  const selectionEnd = targetEl.selectionEnd ?? targetEl.value.length
  const selectedTextLength = selectionEnd - selectionStart

  // console.log(`🚀 ~ [handleBeforeInput] selectionStart:`, selectionStart)
  // console.log(`🚀 ~ [handleBeforeInput] selectionEnd:`, selectionEnd)

  if (event.inputType.includes('delete')) {
    const offset = event.inputType === 'deleteContentBackward' ? 0 : 1

    if (selectedTextLength > 0) {
      charList.value.splice(selectionStart, selectedTextLength)
    }
    else {
      charList.value.splice(selectionStart - 1 + offset, 1)
    }
  }

  /** 反白後編輯，僅刪除內容，插入文字同 insertText，所以統一交給 onInput 處理 */
  if (selectedTextLength > 0 && event.inputType === 'insertText') {
    charList.value.splice(selectionStart, selectedTextLength)
  }

  // insertFromPaste 需要在 onBeforeInput 處理，onInput 的 selectionStart 位置錯誤
  if (event.inputType === 'insertFromPaste') {
    charList.value.splice(selectionStart, selectedTextLength)

    const charDataList = getCharDataList(event.data ?? '')

    // 根據 selectionStart 位置插入 event.data
    charList.value.splice(selectionStart, 0, ...charDataList)
  }
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
  // console.log(`🚀 ~ [handleInput] selectionStart:`, selectionStart)

  caretPosition = selectionStart

  if (
    ('inputType' in event && event.inputType === 'insertText')
    || event.type === 'compositionend'
  ) {
    const charDataList = getCharDataList(event.data ?? '')

    // 根據 selectionStart 位置插入 event.data
    charList.value.splice(selectionStart - 1, 0, ...charDataList)
  }

  /** 必須等到 onInput 完成後才能觸發 charList 變更響應
   *
   * 如果在 onBeforeInput 觸發，會導致刪除字元（deleteContentBackward）時， input value 多刪除一個字元
   *
   * 原因如下：
   *
   * 1. 假設字串為 123
   *
   * 2. 刪除 3，onBeforeInput 先觸發，讓 charList 變為 12
   *
   * 3. 這個時候 input value 還沒實際刪除 3，但是 charList 已經變為 12，所以 input value 變為 12
   *
   * 4. 接著 input value 觸發刪除，但是 3 已經沒了，導致 2 被刪掉，最終只剩下 1
   *
   * 5. 結果就是從 123 變成 1，而不是預期的 12
   */
  triggerRef(charList)
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
</script>

<style scoped lang="sass">
</style>
