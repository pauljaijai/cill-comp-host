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

靈感來自 [Useless machine](https://en.wikipedia.org/wiki/Useless_machine)，這個小廢物可是 Maker 的浪漫。(´,,•ω•,,)

至於為甚麼要用貓手，因為貓手是我想的到最欠揍的小手手。ヾ(◍'౪`◍)ﾉﾞ

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

利用 anime.js 製作 svg 動畫。

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則貓貓手會被狠心切割
:::

## 原始碼

<source-link-list name="toggle-proactive"/>

## API

### Props

<<< ../../../src/components/toggle-proactive/toggle-proactive.vue/#Props

### Emits

<<< ../../../src/components/toggle-proactive/toggle-proactive.vue/#Emits
