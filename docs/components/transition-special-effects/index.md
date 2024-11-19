---
description: 效果酷炫、風格強烈的 Transition 元件！◝( •ω• )◟
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/transition-special-effects/examples/basic-usage.vue'
import EnterLeave from '../../../src/components/transition-special-effects/examples/enter-leave.vue'
</script>

# 特效轉場 <Badge type="info" text="transition" />

效果酷炫、風格強烈的 Transition 元件！◝( •ω• )◟

::: warning 注意！
此元件會占用 `style` 之 `filter` 屬性，請確保沒有使用 `filter`，否則會導致原本的 `filter` 效果消失。ლ(╹◡╹ლ)
:::

## 使用範例

### 基本用法

用法與 Vue 內建的 Transition 元件相同。

（點擊後開始轉場）

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/transition-special-effects/examples/basic-usage.vue
:::

### 進入與離開

可以分別指定 enter 與 leave 特效。

<enter-leave/>

::: details 查看範例原始碼
<<< ../../../src/components/transition-special-effects/examples/enter-leave.vue
:::

## 原理

這類特殊效果已經完全超出 CSS 範疇。

一開始往 HTML to Canvas 方向研究，但是 HTML 轉換成 Canvas 會有很多誤差，成果實在不忍直視。(́⊙◞౪◟⊙‵)

最後發現 SVG Filter 最適合，因為 SVG Filter 可以直接對 HTML 元素套用濾鏡效果。

剛好趁這個機會好好研究 SVG Filter，相當複雜，但是真的很有趣。(*´∀`)~♥

實作概念為：

1. 將 SVG Filter 內容獨立為 Vue 元件，使用 `v-bind` 綁定參數，配合 `animejs` 產生動畫。
1. 產生唯一 ID，綁定至目標元素 `style`，產生濾鏡效果。

## 原始碼

<source-link-list name="transition-special-effects"/>

## API

### Props

<<< ../../../src/components/transition-special-effects/transition-special-effects.vue/#Props

### Emits

<<< ../../../src/components/transition-special-effects/transition-special-effects.vue/#Emits

### Slots

<<< ../../../src/components/transition-special-effects/transition-special-effects.vue/#Slots
