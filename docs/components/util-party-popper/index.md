---
description: 
---

<script setup>
import BasicUsage from '../../../src/components/util-party-popper/examples/basic-usage.vue'
import EmitPosition from '../../../src/components/util-party-popper/examples/emit-position.vue'
</script>

# 標題

說明說明

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

## 原理

利用 babylon.js 製作粒子效果。

📚 [babylon.js](https://doc.babylonjs.com/)

預設使用 WebGPU，所以效能好棒棒！*｡✧*｡٩(ˊᗜˋ*)و✧*｡

## API

### Props

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Props

### Methods

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Methods

### Slots

<<< ../../../src/components/util-party-popper/util-party-popper.vue/#Slots
