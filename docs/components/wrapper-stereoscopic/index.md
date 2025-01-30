---
description: 可以讓元素有酷酷的 3D 偏轉效果。ˋ( ° ▽、° )
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/wrapper-stereoscopic/examples/basic-usage.vue'
import MultiLayer from '../../../src/components/wrapper-stereoscopic/examples/multi-layer.vue'
import AngleRange from '../../../src/components/wrapper-stereoscopic/examples/angle-range.vue'
import ZOffset from '../../../src/components/wrapper-stereoscopic/examples/z-offset.vue'
import CustomStrategy from '../../../src/components/wrapper-stereoscopic/examples/custom-strategy.vue'
</script>

# 立體包裝器 <Badge type="info" text="wrapper" />

可以讓元素有酷酷的 3D 偏轉效果。ˋ( ° ▽、° )

## 使用範例

### 基本用法

可以隨手關閉，不過沒辦法省電。乁( ◔ ௰◔)「

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/basic-usage.vue
:::

### 多層視差

多層 layer 可以產生多層立體效果

<multi-layer/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/multi-layer.vue
:::

### 最大偏轉角

可以設定最大偏轉角度

<angle-range/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/angle-range.vue
:::

### 漂浮距離

可以設定每層之間的漂浮距離，想躺平就躺平。\_(:3」ㄥ)\_

<z-offset/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/z-offset.vue
:::

### 自訂策略

可以自訂旋轉、懸浮，做出有趣的互動。

<custom-strategy/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/custom-strategy.vue
:::

## 原理

利用 CSS 的 perspective 與 transform3d，產生 3D 旋轉與透視變形效果。

其中 perspective 尤為重要，此屬性負責讓物體產生透視變形效果。

沒設定的話，物體看起來像莫名其妙扁掉。...('◉◞⊖◟◉` )

📚 [CSS perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

📚 [CSS translate3d](https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform-function/translate3d)

知道如何偏轉後，剩下的部分就簡單惹。( •̀ ω •́ )✧

計算從物體中心到滑鼠位置的向量，分別將向量的 x、y 分量映射到設定的角度範圍，最後套用到 transform 上即可。

不過這裡有個小技巧，我們不把「目前角度」直接設為「目標角度」，而是逐漸趨近「目標角度」。

這樣無論「目標角度」怎麼亂跳，都可以保證偏轉效果都有動畫呈現，看起來更自然、舒服。◝(≧∀≦)◟

## 原始碼

<source-link-list name="wrapper-stereoscopic"/>

## API

### Props

<<< ../../../src/components/wrapper-stereoscopic/wrapper-stereoscopic.vue/#Props
