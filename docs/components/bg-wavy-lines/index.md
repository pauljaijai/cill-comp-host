---
description: 一條條樸實無華的實線，在極簡的脈動中，為網站添上簡約的詩意
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/bg-wavy-lines/examples/basic-usage.vue'
</script>

# 波浪線 <Badge type="info" text="bg" />

一條條樸實無華的實線，在極簡的脈動中，為網站添上簡約的詩意。

[靈感來源](https://codepen.io/wodniack/pen/abeMZXQ?editors=1010)

## 使用範例

### 基本用法

除了自身整體效果，還可以與滑鼠產生互動。

<basic-usage class="h-[70vh]" />

::: details 查看範例原始碼
<<< ../../../src/components/bg-wavy-lines/examples/basic-usage.vue
:::

## 原理

嘗試直接使用 canvas API 繪製生成式藝術。

原本想嘗試 GLSL，但是除了他本身很天書以外，要實現互動的限制也很多。

最後還是回到 canvas API。(´･ω･`)

### 噪聲演算法

線條自身自然變動的效果基於 [Simplex Noise 演算法](https://en.wikipedia.org/wiki/Simplex_noise)。

噪聲演算法主要用於產生隨機數值，且數值間有一定的連續性，不會像一般的隨機數值（例：`Math.random`）那樣離散。

這樣的特性使得其數值可以用來模擬自然界中的一些效果，比如地形、雲層、水波等。

不過由於自然現象的複雜性，噪聲演算法也有許多變種，比如 Worley Noise、Fractal Noise、Turbulence Noise 等等，相當有趣。◝( •ω• )◟

## 原始碼

<source-link-list name="bg-wavy-lines"/>

## API

### Props

<<< ../../../src/components/bg-wavy-lines/bg-wavy-lines.vue/#Props
