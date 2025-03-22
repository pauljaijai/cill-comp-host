---
description: 一條又一條樸實無華的波浪線，在線條與留白之間，為網站添上一抹詩意的簡約
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/bg-wavy-lines/examples/basic-usage.vue'
</script>

# 波浪線 <Badge type="info" text="bg" />

一條條樸實無華的實線，在動靜之間，為網站添上一抹簡約的詩意。

[靈感來源](https://codepen.io/wodniack/pen/abeMZXQ?editors=1010)

## 使用範例

### 基本用法

除使自身效果，還可以與滑鼠產生互動。

<basic-usage class="h-[60vh]" />

::: details 查看範例原始碼
<<< ../../../src/components/bg-wavy-lines/examples/basic-usage.vue
:::

## 原理

嘗試直接使用 canvas API 繪製生成式藝術。

原本想嘗試 GLSL，但是除了他本身很天書以外，要實現互動的限制也很多。

最後還是回到 canvas API。(´･ω･`)

## 原始碼

<source-link-list name="bg-wavy-lines"/>

## API

### Props

<<< ../../../src/components/bg-wavy-lines/bg-wavy-lines.vue/#Props
