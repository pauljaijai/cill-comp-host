---
description: 各種表情變化，讓網站提供更多情緒價值。ヾ(◍'౪`◍)ﾉﾞ
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/util-cat-face/examples/basic-usage.vue'
import InteractiveCase from '../../../src/components/util-cat-face/examples/interactive-case.vue'
import FormCase from '../../../src/components/util-cat-face/examples/form-case.vue'
</script>

# 貓臉 <Badge type="info" text="util" />

各種表情變化，讓網站提供更多情緒價值。ヾ(◍'౪`◍)ﾉﾞ

## 使用範例

### 基本用法

可以切換各種生動的表情。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/util-cat-face/examples/basic-usage.vue
:::

### 簡單互動

配合使用者動作互動

<interactive-case/>

::: details 查看範例原始碼
<<< ../../../src/components/util-cat-face/examples/interactive-case.vue
:::

### 表單

滿滿的情緒價值，讓使用者更有共鳴。

~~玩到表單永遠填不完~~。ᕕ( ﾟ ∀。)ᕗ

<form-case/>

::: details 查看範例原始碼
<<< ../../../src/components/util-cat-face/examples/form-case.vue
:::

## 原理

嘗試複雜一點的 svg 動畫，表情變化皆有流暢的轉換過程。

實務上推薦使用 [Lottie](https://lottiefiles.com/) 或 [Rive](https://rive.app/)，功能更強更容易開發。

Lottie 比較早出來，社群較大，有素材網站販售；Rive 功能更強，有狀態機等功能，可以做出複雜互動，但是素材比較少。

## 原始碼

<source-link-list name="util-cat-face"/>

## API

### Props

<<< ../../../src/components/util-cat-face/util-cat-face.vue/#Props

### Emits

<<< ../../../src/components/util-cat-face/util-cat-face.vue/#Emits

### Methods

<<< ../../../src/components/util-cat-face/util-cat-face.vue/#Methods
