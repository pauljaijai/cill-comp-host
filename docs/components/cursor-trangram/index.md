---
description: 隨著滑鼠型態變形的七巧板，讓游標變得超酷。ヽ(●`∀´●)ﾉ
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/cursor-trangram/examples/basic-usage.vue'
</script>

# 七巧板游標 <Badge type="info" text="cursor" />

隨著滑鼠型態變形的七巧板，讓游標變得超酷。ヽ(●`∀´●)ﾉ

::: tip
此元件針對滑鼠設計，建議使用電腦或可以使用滑鼠的裝置瀏覽。
:::

## 使用範例

### 基本用法

隨著 cursor 型態持續變化。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/cursor-trangram/examples/basic-usage.vue
:::

## 原理

使用 [`useElementByPoint`](https://vueuse.org/core/useElementByPoint/) 取得目前觸碰的元素。

接著使用 `getComputedStyle` 取得目標具體的 CSS 屬性，再透過 `cursor` 屬性設定游標樣式。

最後就是 anime.js 與 svg 動畫的部分惹。(´,,•ω•,,)

## 原始碼

<source-link-list name="cursor-trangram"/>

## API

### Props

<<< ../../../src/components/cursor-trangram/cursor-trangram.vue/#Props
