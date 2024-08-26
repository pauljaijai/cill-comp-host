---
description: 讓每個文字都有進入進出動畫。( •̀ ω •́ )✧
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/text-characters-transition/examples/basic-usage.vue'
import CustomSplitter from '../../../src/components/text-characters-transition/examples/custom-splitter.vue'
import TransitionType from '../../../src/components/text-characters-transition/examples/transition-type.vue'
import CustomTransition from '../../../src/components/text-characters-transition/examples/custom-transition.vue'
</script>

# 逐字轉場

讓每個文字都有進入進出動畫。( •̀ ω •́ )✧

## 使用範例

### 基本用法

預設就是經典的淡入淡出。( •̀ ω •́ )✧

<basic-usage />

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/basic-usage.vue
:::

### 切分文字

可以自行設定文字分割邏輯或是提供分好的文字。

<custom-splitter />

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/custom-splitter.vue
:::

### 轉場類型

元件內建了一些簡單的效果，來試試吧。◝( •ω• )◟

（點擊以下任一方塊，開始切換）

<transition-type />

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/transition-type.vue
:::

### 自定義轉場

參數皆可自定義，寫法詳見 [anime.js 文檔](https://animejs.com/documentation/#cssProperties)

來打造各種獨特的轉場效果！(≖‿ゝ≖)✧

（點擊以下任一方塊，開始切換）

<custom-transition  class="min-h-[50vh]"/>

鱈魚：「那個沒有也太晚出現了吧！Σ(ˊДˋ;)」

::: details 查看範例原始碼
<<< ../../../src/components/text-characters-transition/examples/custom-transition.vue
:::

## 原理

切分文字後，將每個區塊建立唯一 id，利用 anime.js 實現動畫效果

## 原始碼

<source-link-list name="text-characters-transition"/>

## API

### Props

<<< ../../../src/components/text-characters-transition/text-characters-transition.vue/#Props

### Emits

<<< ../../../src/components/text-characters-transition/text-characters-transition.vue/#Emits
