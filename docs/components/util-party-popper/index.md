---
description: 隨時隨地都可以慶祝！✧｡٩(ˊᗜˋ*)و✧*｡
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/util-party-popper/examples/basic-usage.vue'
import WideAreaEmit from '../../../src/components/util-party-popper/examples/wide-area-emit.vue'
import MousePopper from '../../../src/components/util-party-popper/examples/mouse-popper.vue'
import ConfettiShape from '../../../src/components/util-party-popper/examples/confetti-shape.vue'
import UseText from '../../../src/components/util-party-popper/examples/use-text.vue'
import CustomText from '../../../src/components/util-party-popper/examples/custom-text.vue'
import FormExample from '../../../src/components/util-party-popper/examples/form-example.vue'
</script>

# 拉炮 <Badge type="info" text="util" />

隨時隨地都可以慶祝！✧｡٩(ˊᗜˋ*)و✧*｡

## 使用範例

### 基本用法

呼叫 emit 即可發射粒子。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/basic-usage.vue
:::

### 廣域發射

不只可自訂發射位置，粒子發射範圍也可以調整。

廣域發射更有派對的感覺！✧⁑｡٩(ˊᗜˋ*)و✧⁕｡

<wide-area-emit/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/wide-area-emit.vue
:::

### 各種形狀

不只是方形，還有各種形狀可以選擇。

<confetti-shape/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/confetti-shape.vue
:::

### 使用文字

不只形狀，還可以使用文字，有更多理由可以慶祝了。

例如鱈魚又胖了 2 公斤！(/≧▽≦)/

<use-text/>

鱈魚：「這種事別拿出來慶祝啊！╭(°A ,°`)╮」

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/use-text.vue
:::

### 自定義文字

想撒甚麼就撒甚麼！੭ ˙ᗜ˙ )੭

<custom-text/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/custom-text.vue
:::

### 勞贖嘉年華

勞贖！滿滿的勞贖！Σ(ˊДˋ;)

<mouse-popper/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/mouse-popper.vue
:::

### 表單範例

提升填寫表單的動力。(´,,•ω•,,)

<form-example class="h-[70vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/form-example.vue
:::

## 原理

利用 babylon.js 製作粒子效果。

📚 [babylon.js](https://doc.babylonjs.com/)

預設使用 WebGPU，性能好棒棒！*｡✧*｡٩(ˊᗜˋ*)و✧*｡

## 原始碼

<source-link-list name="util-party-popper"/>

## API

### Props

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Props

### Methods

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Methods

### Slots

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Slots
