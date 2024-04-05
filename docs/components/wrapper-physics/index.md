---
description: 產生物理世界，讓內部元素具有物理效果
---

<script setup>
import BasicUsage from '../../../src/components/wrapper-physics/examples/basic-usage.vue'
</script>

# 物理包裝器

產生物理世界，讓內部元素具有物理效果

## 原理

利用 Matter.js 模擬物理效果，並將對應元素之狀態同步至 DOM 元素上，達到物理效果的呈現。

## API

### Props

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Props

### Methods

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Methods

## 使用範例

### 基本用法

開始運行後，內部元素會產生物理效果

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/basic-usage.vue
:::
