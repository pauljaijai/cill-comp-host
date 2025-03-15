---
description: 輸入文字時會有酷酷的編碼效果。(⌐■_■)✧
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/input-encoded/examples/basic-usage.vue'
import CustomCharset from '../../../src/components/input-encoded/examples/custom-charset.vue'
</script>

# 編碼輸入框 <Badge type="info" text="input" />

輸入文字時會有酷酷的編碼效果。(⌐■_■)✧

## 使用範例

### 基本用法

不管是輸入還是貼上，都會有編碼效果。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/input-encoded/examples/basic-usage.vue
:::

### 自定義編碼表

自定義編碼表，玩出更多變化。

<custom-charset/>

::: details 查看範例原始碼
<<< ../../../src/components/input-encoded/examples/custom-charset.vue
:::

## 原理

## 原始碼

<source-link-list name="input-encoded"/>

## API

### Props

<<< ../../../src/components/input-encoded/input-encoded.vue/#Props

### Emits

<<< ../../../src/components/input-encoded/input-encoded.vue/#Emits

### Slots

<<< ../../../src/components/input-encoded/input-encoded.vue/#Slots
