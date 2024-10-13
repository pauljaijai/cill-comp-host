---
description: 停用時切換狀態會和你唱反調。( ´థ౪థ)
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/toggle-proactive/examples/basic-usage.vue'
import CustomProp from '../../../src/components/toggle-proactive/examples/custom-prop.vue'
</script>

# 主動的開關

停用時切換狀態會和你唱反調。( ´థ౪థ)

## 使用範例

### 基本用法

開關停用時，切換開關會被貓貓手切回來。(◜௰◝)y

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/toggle-proactive/examples/basic-usage.vue
:::

### 元件參數

樣式可隨意調整

<custom-prop/>

::: details 查看範例原始碼
<<< ../../../src/components/toggle-proactive/examples/custom-prop.vue
:::

## 原理

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則貓手會被切到
:::

## 原始碼

<source-link-list name="toggle-proactive"/>

## API

### Props

<<< ../../../src/components/toggle-proactive/toggle-proactive.vue/#Props

### Emits

<<< ../../../src/components/toggle-proactive/toggle-proactive.vue/#Emits
