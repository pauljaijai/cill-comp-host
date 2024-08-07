---
description: 讓粉紅惡魔來幫你吃掉畫面上的一切。( ͡• ͜ʖ ͡• )
---

<script setup>
import BasicUsage from '../../../src/components/wrapper-kirby-mouthful-mode/examples/basic-usage.vue'
import MixColors from '../../../src/components/wrapper-kirby-mouthful-mode/examples/mix-colors.vue'
</script>

# 塞滿嘴包裝器 <Badge type="info" text="wrapper" />

讓粉紅惡魔來幫你吃掉畫面上的一切。( ͡• ͜ʖ ͡• )

在《星之卡比 探索發現》中，卡比不只可以吃掉敵人，還可以吃掉各類物品，例如汽車、自動販賣機等等。

<iframe width="100%" height="400"
src="https://www.youtube.com/embed/1TnQh8xbGBg?si=Bt44bGxHD4Ccp4Ks"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
 referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen></iframe>

粉紅惡魔再度進化惹！ᕕ( ﾟ ∀。)ᕗ

不得不說這個能力看起來真的有夠ㄎㄧㄤ，玩得時候笑到不行。

## 使用範例

### 基本用法

改變 isMouthful 參數即可召喚~~粉紅惡魔~~卡比來幫你吃掉畫面上的東西。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-kirby-mouthful-mode/examples/basic-usage.vue
:::

### 卡比小夥伴

調整顏色，讓卡比的朋友們一起大吃特吃吧！ლ（´∀`ლ）

<mix-colors/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-kirby-mouthful-mode/examples/mix-colors.vue
:::

## 原理

使用 SVG 繪製卡比主體，透過 anime.js 控制動畫。

📚 [anime.js](https://animejs.com/)

這裡使用了 SVG Mask 的技巧，切割出卡比的嘴巴，實現卡比吃掉元素的效果。

## 原始碼

<source-link-list name="wrapper-kirby-mouthful-mode"/>

## API

### Props

<<< ../../../src/components/wrapper-kirby-mouthful-mode/wrapper-kirby-mouthful-mode.vue/#Props
