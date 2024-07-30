---
description: 讓文字有進入進出動畫吧！(๑•̀ㅂ•́)و✧
---

<script setup>
import BasicUsage from '../../../src/components/text-characters-transition/examples/basic-usage.vue'
import CustomSplitter from '../../../src/components/text-characters-transition/examples/custom-splitter.vue'
import TransitionType from '../../../src/components/text-characters-transition/examples/transition-type.vue'
</script>

# 逐字轉場

讓文字有進入進出動畫吧！(๑•̀ㅂ•́)و✧

## 使用範例

### 基本用法

預設就是經典的淡入淡出。( •̀ ω •́ )✧

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/basic-usage.vue
:::

### 切分文字

可以自行設定文字分割邏輯或是直接分好的文字。

<custom-splitter/>

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/custom-splitter.vue
:::

### 轉場類型

使用各種不同的轉場效果吧。◝( •ω• )◟

<transition-type/>

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/transition-type.vue
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
