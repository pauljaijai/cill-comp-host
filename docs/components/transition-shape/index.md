---
description: Motion Graphic 風格的 Transition 元件
---

<script setup>
import BasicUsage from '../../../src/components/transition-shape/examples/basic-usage.vue'
import TransitionParam from '../../../src/components/transition-shape/examples/transition-param.vue'
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

### 轉場參數

可以微調各類轉場參數。

<transition-param />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/transition-param.vue
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
