---
description: 櫻花漫天，紛飛如夢
---

<script setup>
import BasicUsage from '../../../src/components/bg-sakura-fubuki/examples/basic-usage.vue'
import FullBackground from '../../../src/components/bg-sakura-fubuki/examples/full-background.vue'
</script>

# 櫻吹雪

大家有看過新海誠的經典作品《秒速 5 公分》嗎？

聽說最近要重返大銀幕啦，有興趣的話推薦大家一起來胃痛一下。ᕕ( ﾟ ∀。)ᕗ（大誤

電影的場景真的很美，櫻花飄落的畫面真的如詩如畫。

配上山崎將義的《One more time, One more chance》，氣氛真的很到位，惆悵感滿滿。

<iframe width="100%" height="400" src="https://www.youtube.com/embed/du_wXTARyjE?si=ze-o2KTXWufACd2T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

分享一篇我覺得寫得很好的[觀後感](https://meet.eslite.com/tw/tc/article/202112210002)，內含據透，請自行斟酌。

現在讓我們在網頁上感受一下櫻花飄落的浪漫吧。(´,,•ω•,,)

## 使用範例

### 基本用法

設定基本參數。

<basic-usage class="h-[60vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/bg-sakura-fubuki/examples/basic-usage.vue
:::

### 背景

<full-background />

::: details 查看範例原始碼
<<< ../../../src/components/bg-sakura-fubuki/examples/full-background.vue
:::

## 原理

使用 babylon.js 產生實體粒子，才有辦法產生鏡頭特效。(≖‿ゝ≖)✧

## 原始碼

<source-link-list name="bg-sakura-fubuki"/>

## API

### Props

<<< ../../../src/components/bg-sakura-fubuki/bg-sakura-fubuki.vue/#Props
