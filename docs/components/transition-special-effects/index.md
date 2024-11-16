---
description: 特殊效果的 Transition 元件
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/transition-special-effects/examples/basic-usage.vue'
</script>

# 特效轉場 <Badge type="info" text="transition" />

各種特殊效果的轉場元件！◝( •ω• )◟

## 使用範例

### 基本用法

用法與 Vue 內建的 Transition 元件相同，可以分別指定 enter 與 leave 特效。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/transition-special-effects/examples/basic-usage.vue
:::

## 原理

這類特殊效果已經完全超出 CSS 範疇。

一開始從 HTML to Canvas 的方向研究，但是 HTML 轉換成 Canvas 會有很多誤差，成果實在不忍直視。(́⊙◞౪◟⊙‵)

最後發現 SVG Filter 最適合，因為 SVG Filter 可以直接對 HTML 元素套用濾鏡效果。

剛好趁這個機會好好研究 SVG Filter，相當複雜，但是真的很有趣。(*´∀`)~♥

## 原始碼

<source-link-list name="transition-special-effects"/>

## API

### Props

<<< ../../../src/components/transition-special-effects/transition-special-effects.vue/#Props

### Emits

<<< ../../../src/components/transition-special-effects/transition-special-effects.vue/#Emits

### Methods

<<< ../../../src/components/transition-special-effects/transition-special-effects.vue/#Methods

### Slots

<<< ../../../src/components/transition-special-effects/transition-special-effects.vue/#Slots
