---
description: 輸入文字時會有酷酷的解碼效果。(⌐■_■)✧
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/input-decoding/examples/basic-usage.vue'
import CustomCharset from '../../../src/components/input-decoding/examples/custom-charset.vue'
</script>

# 解碼輸入框 <Badge type="info" text="input" />

輸入文字時會有酷酷的解碼效果。(⌐■_■)✧

## 使用範例

### 基本用法

不管是輸入還是貼上，都會有解碼效果。

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

## 原理

透過 `input` 輸入事件偵測輸入文字，處理每個字元並轉換為動態的解碼效果。

這裡長了新知識，就是 `compositionstart` 和 `compositionend` 事件，可以確保對中文正常輸入，拼字的時候不會被誤判成多次輸入。

每個字元會被轉換為 `useChar` 產生的動態解碼對象，根據設定的 `charset`（解碼字元集）、`encodeInterval`（解碼間隔時間）和 `encodeTimes`（解碼次數）產生隨機變化的效果，使字元看起來像是被「解碼」一樣逐漸顯示。

組件還處理了複雜的輸入情境，包括：

- 文字選取與取代
- 粘貼文字
- 刪除操作
- 光標位置控制

所有這些輸入處理完成後，組件會透過 `update:modelValue` 事件將原始值同步回父組件。

## 原始碼

<source-link-list name="input-decoding"/>

## API

### Props

<<< ../../../src/components/input-decoding/input-decoding.vue/#Props

### Emits

<<< ../../../src/components/input-decoding/input-decoding.vue/#Emits

### Slots

<<< ../../../src/components/input-decoding/input-decoding.vue/#Slots
