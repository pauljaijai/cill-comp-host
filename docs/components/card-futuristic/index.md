---
description: 簡潔、實用的科幻風格資訊容器
---

<script setup>
import { onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'

import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/card-futuristic/examples/basic-usage.vue'
import MixPart from '../../../src/components/card-futuristic/examples/mix-part.vue'
import TextAnime from '../../../src/components/card-futuristic/examples/text-anime.vue'

const { isDark } = useData()

// 強制取消暗黑模式
const oriDarKValue = isDark.value
isDark.value = false

onBeforeUnmount(() => {
  isDark.value = oriDarKValue
})
</script>

# 科幻卡片 <Badge type="info" text="card" />

簡潔、實用的科幻風格資訊容器。

終於做出我夢想中的元件了！◝(≧∀≦)◟

在學階段的專業是機電與自動控制，一直對於科幻風格的元件情有獨鍾。

過去最接近的作品為：

- [平衡車控制](https://www.youtube.com/watch?v=M7zT4Zw0azc)
- [LED Cube 控制](https://www.youtube.com/watch?v=6dSCRM2puSs)

礙於技術力不足，可以看得出來介面非常陽春，只有勉強沾上科幻的邊。(́⊙◞౪◟⊙‵)

時隔多年，總算藉由網頁技術實現我心目中的樣子了！✧⁑｡٩(ˊᗜˋ*)و✧⁕｡

## 使用範例

### 基本用法

<basic-usage />

::: details 查看範例原始碼
<<< ../../../src/components/card-futuristic/examples/basic-usage.vue
:::

### 組合零件

組合不同零件，產生多種的樣式。

<mix-part />

::: details 查看範例原始碼
<<< ../../../src/components/card-futuristic/examples/mix-part.vue
:::

### 文字動畫

使用文件元件就可以產生科幻文字特效。

<text-anime />

::: details 查看範例原始碼
<<< ../../../src/components/card-futuristic/examples/text-anime.vue
:::

## 原理

動態由 border、bg、corner、content 之子元件構成，由 card 父元件負責調度動畫。

子元件可以任意組合，藉此產生 N 種有趣的樣式設計。

子元件具體實作使用 Vue 綁定 SVG 的 Attr 進行繪圖，並使用 anime.js 實現動畫

## 原始碼

<source-link-list name="card-futuristic"/>

## API

### Props

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Props

<!-- ### Emits

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Emits -->

### Methods

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Methods

### Slots

<<< ../../../src/components/card-futuristic/card-futuristic.vue/#Slots
