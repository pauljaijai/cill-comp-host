---
description: 輸入文字時會有酷酷的解碼效果。(⌐■_■)✧
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/input-decoding/examples/basic-usage.vue'
import CustomCharset from '../../../src/components/input-decoding/examples/custom-charset.vue'
import FuturisticInput from '../../../src/components/input-decoding/examples/futuristic-input.vue'
</script>

# 解碼輸入框 <Badge type="info" text="input" />

輸入文字時會有酷酷的解碼效果。(⌐■_■)✧

## 使用範例

### 基本用法

不管是輸入還是貼上，都會有解碼效果，而且完全不會干擾輸入過程。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/input-decoding/examples/basic-usage.vue
:::

### 自定義解碼表

自定義解碼表，玩出更多變化。

<custom-charset/>

::: details 查看範例原始碼
<<< ../../../src/components/input-decoding/examples/custom-charset.vue
:::

### 科幻輸入框

配合[科幻卡片](/components/card-futuristic/){target='_bank'}元件，打造未來感十足的輸入框。

<futuristic-input/>

::: details 查看範例原始碼
<<< ../../../src/components/input-decoding/examples/futuristic-input.vue
:::

## 原理

透過 `input` 輸入事件偵測每個輸入文字，轉換每個字元為動態解碼效果。

:::tip 中文拼字怎麼處理？
開發這個元件讓我長了新知識，就是 `input` 的 `compositionstart` 和 `compositionend` 事件，可以確保中文正常輸入，拼字的時候不會被誤判成多次輸入。
:::

輸入時，每個字元會被轉換為 [`useChar`](https://gitlab.com/side_project/chill-component/-/blob/main/src/components/input-decoding/use-char.ts?ref_type=heads) 產生的動態解碼對象，根據設定產生隨機變化的效果，使字元看起來像是被「解碼」一樣逐漸顯示。

說起來簡單，實際上還要考慮各種輸入情境，包括：

1. **輸入、貼上、拖動文字**

    都是插入文字，但是有些微差別，需要分別在 `onInput` 或 `onBeforeInput` 處理。

1. **選取**

    第 1 點的操作加上選取，需特別注意 caret 位置或隱含的刪除行為。

1. **刪除**

    有分 `Forward` 與 `Backward` 兩個方向。

1. **維持插入點（caret）**

    `input` 內容變化時，插入點位置會被重置到最尾端，所以解碼動畫播放時，也要不斷維持插入點位置。

1. **拼字與插入點（caret）**

    中文拼字時，`onInput` 與 `onBeforeInput` 中的 `input.selectionStart` 與 `input.selectionEnd` 與英文輸入不同，需要特別處理。

1. **emoji**

    1 個 emoji 為 2 字元，需要謹慎處理。

### 已知 Bug

若文字內有 emoji，反白後編輯與段落中插入文字，都會有錯位問題。

主因是因為 emoji 會讓 `selectionStart` 與 `selectionEnd` 與實際文字長度不同，

目前還想不到甚麼好辦法。( ´•̥̥̥ ω •̥̥̥` )

## 原始碼

<source-link-list name="input-decoding"/>

## API

### Props

<<< ../../../src/components/input-decoding/input-decoding.vue/#Props

### Emits

<<< ../../../src/components/input-decoding/input-decoding.vue/#Emits

### Slots

<<< ../../../src/components/input-decoding/input-decoding.vue/#Slots
