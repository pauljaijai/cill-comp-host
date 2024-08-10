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

當狀態為 disabled 時，拉動握把會讓握把拉長，還會越拉越緊。ᕕ( ﾟ ∀。)ᕗ 

<basic-usage class="h-[30vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/slider-stubborn/examples/basic-usage.vue
:::

## 原理

滑鼠碰觸按鈕時，計算滑鼠位置到按鈕中心的單位向量，並以此向量為基準，移動一個按鈕尺寸的距離。

如果按鈕移動到畫面外，則會自動返回原點，使用 IntersectionObserver 實作。

📚 [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

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
