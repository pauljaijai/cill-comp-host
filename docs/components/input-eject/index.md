---
description: 一言不合就把字元彈射！─=≡Σ((( つ•̀ω•́)つ
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/input-eject/examples/basic-usage.vue'
import TextSanitization from '../../../src/components/input-eject/examples/text-sanitization.vue'
</script>

# 彈射輸入框 <Badge type="info" text="input" />

一言不合就把字元彈射！─=≡Σ((( つ•̀ω•́)つ

## 使用範例

### 基本用法

被刪除的文字會被彈射 (´,,•ω•,,)

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/input-eject/examples/basic-usage.vue
:::

### 文字退散

彈射不喜歡的文字 ( ´థ౪థ)

<text-sanitization/>

::: details 查看範例原始碼
<<< ../../../src/components/input-eject/examples/text-sanitization.vue
:::

## 原理

文字文字文字文字文字文字文字文字文字文字文字文字

📚 [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則按鈕一移動就會啪沒了，消失的無影無蹤。
:::

## 原始碼

<source-link-list name="input-eject"/>

## API

### Props

<<< ../../../src/components/input-eject/input-eject.vue/#Props

### Emits

<<< ../../../src/components/input-eject/input-eject.vue/#Emits

### Methods

<<< ../../../src/components/input-eject/input-eject.vue/#Methods

### Slots

<<< ../../../src/components/input-eject/input-eject.vue/#Slots
