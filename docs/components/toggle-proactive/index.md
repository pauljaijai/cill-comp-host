---
description: 停用時切換狀態會和你唱反調。( ´థ౪థ)
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/toggle-proactive/examples/basic-usage.vue'
import CustomProp from '../../../src/components/toggle-proactive/examples/custom-prop.vue'
import TermsExample from '../../../src/components/toggle-proactive/examples/terms-example.vue'
</script>

# 主動的開關 <Badge type="info" text="toggle" />

停用時切換狀態會和你唱反調。( ´థ౪థ)

靈感來自 [Useless machine](https://en.wikipedia.org/wiki/Useless_machine)，這個小廢物可是 Maker 的浪漫。(´,,•ω•,,)

至於為甚麼要用貓手，因為貓手是我想的到最欠揍的小手手。ヾ(◍'౪`◍)ﾉﾞ

## 使用範例

### 基本用法

開關停用時，切換開關會被貓貓手切回來。(◜௰◝)y

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/toggle-proactive/examples/basic-usage.vue
:::

### 元件參數

樣式可隨意調整

<custom-prop/>

::: details 查看範例原始碼
<<< ../../../src/components/toggle-proactive/examples/custom-prop.vue
:::

### 使用須知

讓使用者心甘情願（？閱讀須知。(´,,•ω•,,)

閱讀率 100% 時才能切換開關，否則會被強制回復。

<terms-example/>

UI：「這裡不應該用 toggle 吧！ Σ(ˊДˋ;)」

::: details 查看範例原始碼
<<< ../../../src/components/toggle-proactive/examples/terms-example.vue
:::

## 原理

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則貓貓手會被狠心切割
:::

利用 anime.js 製作 svg 動畫。

裡面有個小細節，就是貓手一開始藏在 toggle 背後（手臂與手肘都在背後），播放切換動畫時，手臂一樣在 toggle 背後，但是手肘會伸到 toggle 前面。

SVG 內的物件為甚麼有辦法忽然變換堆疊順序？大家來猜猜看如何實現這個效果。(´,,•ω•,,)

賣個關子，想知道的話可以看看原始碼或留言讓我知道你的猜想。( ´ ▽ ` )ﾉ

## 原始碼

<source-link-list name="toggle-proactive"/>

## API

### Props

<<< ../../../src/components/toggle-proactive/toggle-proactive.vue/#Props

### Emits

<<< ../../../src/components/toggle-proactive/toggle-proactive.vue/#Emits
