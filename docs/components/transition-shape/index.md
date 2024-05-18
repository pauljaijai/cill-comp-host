---
description: Motion Graphic 風格的 Transition 元件
---

<script setup>
import BasicUsage from '../../../src/components/transition-shape/examples/basic-usage.vue'
import TransitionType from '../../../src/components/transition-shape/examples/transition-type.vue'
</script>

# 多邊形轉場

Motion Graphic 風格的 Transition 元件

## 使用範例

### 基本用法

基於 Vue 內建的 Transition 元件。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/basic-usage.vue
:::

### 轉場類型

支援多種轉場類型。

<transition-type />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/transition-type.vue
:::

## 原理

基於 Vue 內建的 Transition 元件，使用 babylon.js 產生，透過 Transition Event 來控制動畫的開始與結束。

## API

### Props

<<< ../../../src/components/transition-shape/transition-shape.vue/#Props

### Emits

<<< ../../../src/components/transition-shape/transition-shape.vue/#Emits

### Slots

<<< ../../../src/components/transition-shape/transition-shape.vue/#Slots
