---
description: 停用時寧死不屈的滑動條。( ・ิω・ิ)
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/slider-stubborn/examples/basic-usage.vue'
</script>

# 固執的滑動條

停用時寧死不屈的滑動條。( ・ิω・ิ)

## 使用範例

### 基本用法

當狀態為 disabled 時，拉動握把會拉長握把，還會越拉越緊。ᕕ( ﾟ ∀。)ᕗ

<basic-usage class="h-[30vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/slider-stubborn/examples/basic-usage.vue
:::

## 原理

使用 svg path 實現拉長與彎曲彈性效果。

由於需要額外空間繪製拉長效果，所以拉動握把時可能造成頁面跑出水平滾動條，需要自行處理 overflow。(´・ω・`)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則握把拉長時會被裁切
:::

## 原始碼

<source-link-list name="slider-stubborn"/>

## API

### Props

<<< ../../../src/components/slider-stubborn/slider-stubborn.vue/#Props

### Emits

<<< ../../../src/components/slider-stubborn/slider-stubborn.vue/#Emits
