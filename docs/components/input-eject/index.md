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

<basic-usage  class="h-[40vh] flex-center" />

::: details 查看範例原始碼
<<< ../../../src/components/input-eject/examples/basic-usage.vue
:::

### 鱈魚退散

也可以彈射不喜歡的文字 ( ´థ౪థ)

（嘗試輸入 codfish、鱈魚看看）

<text-sanitization class="h-[40vh] flex-center" />

::: details 查看範例原始碼
<<< ../../../src/components/input-eject/examples/text-sanitization.vue
:::

## 原理

使用 canvas 繪製彈射文字，性能超棒棒

## 原始碼

<source-link-list name="input-eject"/>

## API

### Props

<<< ../../../src/components/input-eject/input-eject.vue/#Props

### Emits

<<< ../../../src/components/input-eject/input-eject.vue/#Emits

### Methods

<<< ../../../src/components/input-eject/input-eject.vue/#Methods
