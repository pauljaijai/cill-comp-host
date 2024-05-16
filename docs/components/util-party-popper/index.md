---
description: 隨時隨地都可以慶祝！✧｡٩(ˊᗜˋ*)و✧*｡
---

<script setup>
import BasicUsage from '../../../src/components/util-party-popper/examples/basic-usage.vue'
import EmitPosition from '../../../src/components/util-party-popper/examples/emit-position.vue'
import MousePopper from '../../../src/components/util-party-popper/examples/mouse-popper.vue'
import ConfettiShape from '../../../src/components/util-party-popper/examples/confetti-shape.vue'
import CustomText from '../../../src/components/util-party-popper/examples/custom-text.vue'
</script>

# 拉炮

隨時隨地都可以慶祝！✧｡٩(ˊᗜˋ*)و✧*｡

## 使用範例

### 基本用法

呼叫 emit 即可發射粒子。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/basic-usage.vue
:::

### 發射範圍

不只可自訂發射位置，粒子發射範圍也可以調整。

鱈魚：「讓你想怎麼射就怎麼射！ᕕ( ﾟ ∀。)ᕗ 」

路人：「這句話聽起來怎麼怪怪的...(˘･_･˘)」

<emit-position/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/emit-position.vue
:::

### 各種形狀

不只是方形，還有各種形狀可以選擇。

<confetti-shape/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/confetti-shape.vue
:::

### 使用文字

不只形狀，還可以使用文字，有更多理由可以慶祝了。

例如鱈魚發現自己胖了 2 公斤！(/≧▽≦)/

<custom-text/>

鱈魚：「不要慶祝這種事情好嘛！╭(°A ,°`)╮」

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/custom-text.vue
:::

### 勞贖嘉年華

勞贖！滿滿的勞贖！Σ(ˊДˋ;)

<mouse-popper/>

::: details 查看範例原始碼
<<< ../../../src/components/util-party-popper/examples/mouse-popper.vue
:::

## 原理

利用 babylon.js 製作粒子效果。

📚 [babylon.js](https://doc.babylonjs.com/)

預設使用 WebGPU，效能好棒棒！*｡✧*｡٩(ˊᗜˋ*)و✧*｡

## API

### Props

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Props

### Methods

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Methods

### Slots

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Slots
