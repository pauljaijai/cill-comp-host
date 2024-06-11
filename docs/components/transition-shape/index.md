---
description: Motion Graphic 風格的 Transition 元件
---

<script setup>
import BasicUsage from '../../../src/components/transition-shape/examples/basic-usage.vue'
import TransitionParam from '../../../src/components/transition-shape/examples/transition-param.vue'
import RoundTransition from '../../../src/components/transition-shape/examples/round-transition.vue'
import FenceTransition from '../../../src/components/transition-shape/examples/fence-transition.vue'
import ConvergingRectTransition from '../../../src/components/transition-shape/examples/converging-rect-transition.vue'
import SequentialLineTransition from '../../../src/components/transition-shape/examples/sequential-line-transition.vue'

</script>

# 多邊形轉場

Motion Graphic 風格的 Transition 元件。

甚麼是 Motion Graphic 轉場效果？可以看看這個影片：

<iframe width="100%" height="400" src="https://www.youtube.com/embed/jlR2J_Ztl4Y?si=MxcKRt7FjFnM4vvR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Motion Graphic 轉場在影片製作其實很常見，不過網頁中就沒那麼常見了。

所以我就嘗試把效果搬上網頁了！ˋ( ° ▽、° )

雖然目前稍微有一點點瑕疵，不過基本功能與效果都已經實現，剩下的改天再來慢慢改進吧。(。・∀・)ノ

## 使用範例

### 基本用法

基於 Vue 內建的 Transition 元件，不過目前連續切換會壞掉，請先手下留情。
（〃｀ 3′〃）

即使新舊元素尺寸不同也可以用呦！ˋ( ° ▽、° )

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/basic-usage.vue
:::

### 轉場參數

可以微調各類轉場參數。

<transition-param />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/transition-param.vue
:::

### Round 轉場

由圓形組成。

點擊任意魚，開始轉場。(≧∇≦)ﾉ

<round-transition />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/round-transition.vue
:::

### Fence 轉場

像柵欄一般，由多個矩形組成。

點擊任意魚，開始轉場。(≧∇≦)ﾉ

<fence-transition />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/fence-transition.vue
:::

### Converging Rect 轉場

多個矩形向中心匯聚，可以設定傾斜角度。

點擊任意魚，開始轉場。(≧∇≦)ﾉ

<converging-rect-transition />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/converging-rect-transition.vue
:::

<!-- ### Sequential Line 轉場

多條線條組成。

點擊任意魚，開始轉場。(≧∇≦)ﾉ

<sequential-line-transition />

::: details 查看範例原始碼
<<< ../../../src/components/transition-shape/examples/sequential-line-transition.vue
::: -->

## 原理

基於 Vue 內建的 Transition 元件，使用 babylon.js 產生形狀遮罩，接著透過 Transition Event 控制動畫的開始與結束。

可以處理以下情境：

- v-if 條件渲染
- 變更元素 key

暫時不考慮 v-show 的情境。

### 定位問題

原本使用 fixed 配合頁面滾動事件來定位 canvas 位置，但是在快速滾動畫面時 sharp 還是會稍微偏移。

苦惱之際發現了 CSS Anchor Positioning API 這個神奇酷炫的東西，完美解決此問題！(๑•̀ㅂ•́)و✧

📚 [CSS Anchor Positioning API](https://developer.chrome.com/blog/anchor-positioning-api?hl=zh-tw#core_concepts_anchors_and_positioned_elements)

## API

### Props

<<< ../../../src/components/transition-shape/transition-shape.vue/#Props

<<< ../../../src/components/transition-shape/type.ts/#TransitionType

::: details TransitionRect
<<< ../../../src/components/transition-shape/type.ts/#TransitionRect
:::

::: details TransitionConvergingRect
<<< ../../../src/components/transition-shape/type.ts/#TransitionConvergingRect
:::

::: details TransitionRound
<<< ../../../src/components/transition-shape/type.ts/#TransitionRound
:::

::: details TransitionFence
<<< ../../../src/components/transition-shape/type.ts/#TransitionFence
:::

### Emits

<<< ../../../src/components/transition-shape/transition-shape.vue/#Emits

### Slots

<<< ../../../src/components/transition-shape/transition-shape.vue/#Slots
