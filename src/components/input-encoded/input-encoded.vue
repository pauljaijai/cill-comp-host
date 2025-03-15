<template>
  <input
    :value="currentString"
    type="text"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
    @input="handleInput"
    @beforeinput="handleBeforeInput"
  >
</template>

<script setup lang="ts">
import { until } from '@vueuse/core'
import { pipe, prop } from 'remeda'
import { computed, nextTick, ref, shallowRef, triggerRef, watch } from 'vue'
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
const isAfterInput = ref(false)

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

  if (
    ('inputType' in event && event.inputType.includes('insert'))
    || event.type === 'compositionend'
  ) {
    // 根據 selectionStart 位置插入 event.data
    const charset = props.charset ?? ''
    const charDataList = (event.data ?? '')
      .split('')
      .map((char) => useChar(char, charset))

    /** 必須在動畫完成後在調整 cursor 位置，否則會因為 value 變化讓 cursor 跳至最後 */
    Promise.all(
      charDataList.map((charData, i) => charData.start(i * 50)),
    )
      .then(async () => {
        await nextTick()
        targetEl.setSelectionRange(selectionStart + charDataList.length, selectionStart + charDataList.length)
      })

    charList.value.splice(selectionStart - 1, 0, ...charDataList)
    triggerRef(charList)
  }

  isAfterInput.value = true
}
/** 在 onInput 中取得的 selectionStart selectionEnd 會永遠相同
 *
 * 刪除、反白後貼上，可能與 selectionRange 相關的事件必須在 onBeforeInput 中處理
 */
async function handleBeforeInput(event: Event) {
  // console.log(`🚀 ~ [handleBeforeInput] event:`, event)
  isAfterInput.value = false

  if (!(event instanceof InputEvent)) {
    return
  }

  const targetEl = event.target
  if (!(targetEl instanceof HTMLInputElement)) {
    return
  }

  const selectionStart = targetEl.selectionStart ?? targetEl.value.length
  const selectionEnd = targetEl.selectionEnd ?? targetEl.value.length

  if (
    event.inputType.includes('delete')
    || event.inputType === 'insertFromPaste'
  ) {
    const deleteCount = selectionEnd - selectionStart

    if (deleteCount > 0) {
      charList.value.splice(selectionStart, deleteCount)
    }
    else {
      charList.value.splice(selectionStart - 1, 1)
    }
  }

  /** 必須等到 onInput 完成後才能觸發 charList 變更
   *
   * 如果沒有等到 onInput 完成，會導致 input value 多刪除一個字元
   *
   * 原因如下：假設字串為 123
   *
   * 1. 刪除 3，onBeforeInput 觸發，讓 charList 變為 12
   *
   * 2. 這個時候 input value 還沒觸發刪除，但是 charList 已經變為 12，所以 input value 變為 12
   *
   * 3. 接著 input value 觸發刪除，導致 2 被刪掉，最終變成 1
   */
  await until(isAfterInput).toBe(true)
  triggerRef(charList)
}
/** 處理拼字問題
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
