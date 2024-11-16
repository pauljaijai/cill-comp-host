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

文字文字文字文字文字文字文字文字文字文字文字文字

📚 [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則按鈕一移動就會啪沒了，消失的無影無蹤。
:::

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
