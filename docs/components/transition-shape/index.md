---
description: Motion Graphic 風格的 Transition 元件
---

<script setup>
import BasicUsage from '../../../src/components/transition-shape/examples/basic-usage.vue'
import TransitionParam from '../../../src/components/transition-shape/examples/transition-param.vue'
import RoundTransition from '../../../src/components/transition-shape/examples/round-transition.vue'
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

### Round 轉場

<round-transition />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/round-transition.vue
:::

## 原理

基於 Vue 內建的 Transition 元件，使用 babylon.js 產生形狀遮罩，接著透過 Transition Event 控制動畫的開始與結束。

可以處理以下情境：

- v-if 條件渲染
- 變更元素 key

暫時不考慮 v-show 的情境。

## API

### Props

<<< ../../../src/components/transition-shape/transition-shape.vue/#Props

### Emits

<<< ../../../src/components/transition-shape/transition-shape.vue/#Emits

### Slots

<<< ../../../src/components/transition-shape/transition-shape.vue/#Slots
