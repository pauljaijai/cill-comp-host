---
description: 可以針對每個文字設定進入和離開動畫
---

<script setup>
import BasicUsage from '../../../src/components/text-characters-transition/examples/basic-usage.vue'
</script>

# 逐字轉場

可以針對每個文字設定進入和離開動畫

## 使用範例

### 基本用法

當按鈕狀態為 disabled 並觸發 hover、click、key enter 事件時，按鈕會開始亂跑

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/basic-usage.vue
:::

## 原理

滑鼠碰觸按鈕時，計算滑鼠位置到按鈕中心的單位向量，並以此向量為基準，移動一個按鈕尺寸的距離。

如果按鈕移動到畫面外，則會自動返回原點，使用 IntersectionObserver 實作。

📚 [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則按鈕會啪沒了，消失的無影無蹤。
:::

## API

### Props

<<< ../../../src/components/text-characters-transition/text-characters-transition.vue/#Props

### Emits

<<< ../../../src/components/text-characters-transition/text-characters-transition.vue/#Emits

### Methods

<<< ../../../src/components/text-characters-transition/text-characters-transition.vue/#Methods
