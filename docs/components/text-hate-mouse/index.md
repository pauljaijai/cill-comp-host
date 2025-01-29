---
description: 滑鼠靠近時會躲得遠遠的文字。(。-`ω´-)
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/text-hate-mouse/examples/basic-usage.vue'
</script>

# 怕鼠的文字 <Badge type="info" text="text" />

滑鼠靠近時會躲得遠遠的文字。

::: tip
此元件針對滑鼠設計，建議使用電腦或可以使用滑鼠的裝置瀏覽。
:::

## 使用範例

### 基本用法

文字文字文字文字文字文字文字文字文字文字文字文字

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/text-hate-mouse/examples/basic-usage.vue
:::

## 原理

文字文字文字文字文字文字文字文字文字文字文字文字

📚 [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則按鈕一移動就會啪沒了，消失的無影無蹤。
:::

## 原始碼

<source-link-list name="text-hate-mouse"/>

## API

### Props

<<< ../../../src/components/text-hate-mouse/text-hate-mouse.vue/#Props
