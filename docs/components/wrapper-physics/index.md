---
description: 產生物理世界，讓內部元素具有物理效果
---

<script setup>
import BasicUsage from '../../../src/components/wrapper-physics/examples/basic-usage.vue'
</script>

# 物理包裝器

產生物理世界，讓內部元素具有物理效果

## 原理

物理包裝器是一個用來包裝物理效果的組件，透過物理包裝器可以讓組件具有物理效果，例如：拖曳、碰撞、彈跳等效果。

## API

### Props

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Props

### Emits

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Emits

### Methods

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Methods

### Slots

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Slots

## 使用範例

### 基本用法

當按鈕狀態為 disable 並觸發 hover、click、key enter 事件時，按鈕會開始亂跑

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/basic-usage.vue
:::
