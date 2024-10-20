---
description: 文字作為遮罩裁切圖片後，邊移動移動邊組成圖片。看不懂說明？沒關係我也看不太懂，來看看就懂啦。ᕕ( ﾟ ∀。)ᕗ
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/carousel-anamorphosis-text/examples/basic-usage.vue'
import LayerText from '../../../src/components/carousel-anamorphosis-text/examples/layer-text.vue'
</script>

# 錯視文字輪播 <Badge type="info" text="carousel" />

文字作為遮罩裁切圖片後，邊移動移動邊組成圖片。

看不懂說明？沒關係我也看不太懂，來看看就懂啦。ᕕ( ﾟ ∀。)ᕗ

靈感來自我在 Envato 路過的一個[輪播效果](https://elements.envato.com/inspired-slideshow-V4Z2QX8)。

覺得非常有趣，想說挑戰在網頁上實現看看，本來想加入模糊效果，但是性能負擔過重，只好忍痛放棄了。 (๑•́ ₃ •̀๑)

## 使用範例

### 基本用法

酷酷的錯視文字輪播。(≖‿ゝ≖)✧

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/carousel-anamorphosis-text/examples/basic-usage.vue
:::

### 自訂每層文字

可以自由調整文字內容。◝( •ω• )◟

<layer-text/>

雖然看不太清楚文字寫啥就是了 (́⊙◞౪◟⊙‵)

::: details 查看範例原始碼
<<< ../../../src/components/carousel-anamorphosis-text/examples/layer-text.vue
:::

## 原理

文字文字文字文字文字文字文字文字文字文字文字文字

## 原始碼

<source-link-list name="carousel-anamorphosis-text"/>

## API

### Props

<<< ../../../src/components/carousel-anamorphosis-text/carousel-anamorphosis-text.vue/#Props

### Emits

<<< ../../../src/components/carousel-anamorphosis-text/carousel-anamorphosis-text.vue/#Emits

### Methods

<<< ../../../src/components/carousel-anamorphosis-text/carousel-anamorphosis-text.vue/#Methods

### Slots

<<< ../../../src/components/carousel-anamorphosis-text/carousel-anamorphosis-text.vue/#Slots
