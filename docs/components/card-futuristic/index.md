---
description:
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/card-futuristic/examples/basic-usage.vue'
</script>

# 科幻卡片 <Badge type="info" text="card" />

不過度花俏、實用的科幻風格（Sci-Fi、Futuristic）資訊容器。

我終於做出我夢想中的元件了！ლ（´∀`ლ）

在學階段的專業是自動控制，一直對於科幻風格的元件情有獨鍾。

過去最接近的作品如下：

- [平衡車控制](https://www.youtube.com/watch?v=M7zT4Zw0azc)
- [LED Cube 控制](https://www.youtube.com/watch?v=6dSCRM2puSs)

礙於技術力不足，可以看得出來介面非常陽春，只有勉強沾上科幻的邊。(́⊙◞౪◟⊙‵)

這次終於做出我心目中的樣子了！✧⁑｡٩(ˊᗜˋ*)و✧⁕｡

此元件主要由 border、bg、corner、content 與 ornament 子元件組成，由 card 父元件負責調度動畫。

子元件可以任意組合，藉此產生 N 種有趣的樣式設計。

## 使用範例

### 基本用法

文字文字文字文字文字文字文字文字文字文字文字文字

<basic-usage class="h-[60vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/card-futuristic/examples/basic-usage.vue
:::

## 原理

文字文字文字文字文字文字文字文字文字文字文字文字

📚 [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則按鈕一移動就會啪沒了，消失的無影無蹤。
:::

## 原始碼

<source-link-list name="card-futuristic"/>

## API

### Props

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Props

### Emits

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Emits

### Methods

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Methods

### Slots

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Slots
