---
description: 讓網頁飄雪的背景效果，還會積雪喔。( ´ ▽ ` )ﾉ
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/bg-snow/examples/basic-usage.vue'
</script>

# 落雪 <Badge type="info" text="bg" />

讓網頁飄雪的背景效果，還會積雪喔。( ´ ▽ ` )ﾉ

## 使用範例

### 基本用法

使用 `v-bg-static` 指令可以讓指定物體積雪。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/bg-snow/examples/basic-usage.vue
:::

## 原理

下雪動畫基於 babylon.js 的[粒子系統](https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/customizingParticles/)，積雪效果則是對被標記的物體進行碰撞偵測

這裡就會有個小問題，因為雪的數量非常多，其計算量可能會相當可觀，如果直接在主執行續進行計算，就會導致畫面卡卡、不流暢。

這裡使用了一個有趣的小技巧，那就是 [Offscreen Canvas](https://doc.babylonjs.com/features/featuresDeepDive/scene/offscreenCanvas)！( •̀ ω •́ )✧

這個技術可以讓整個 Canvas 繪製都交給 WebWorker 處理，也就是說包含費時的計算任務在內，所有的計算都不會再主執行續進行，就不用擔心畫面卡頓了。(/≧▽≦)/

::: tip 所以我說那個支援度呢？Σ(ˊДˋ;)
截至 2024/12/22，[Offscreen Canvas 支援度很不錯](https://caniuse.com/?search=OffscreenCanvas)，應該是可以放心用啦 ᕕ( ﾟ ∀。)ᕗ
:::

大家查看原始碼可能會發現我用了一個名為 [`Comlink`](https://www.npmjs.com/package/comlink) 的套件，這個套件可以大幅簡化 WebWorker 與主執行續之間傳遞訊息的方式。( ´ ▽ ` )ﾉ

不然原本要用 `postMessage` 傳遞訊息，寫起來真滴麻煩。⎝(・ω´・⎝)

## 原始碼

<source-link-list name="bg-snow"/>

## API

### Methods

<<< ../../../src/components/bg-snow/bg-snow.vue/#Methods
