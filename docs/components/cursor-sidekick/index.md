---
description: 跟著游標跑的小跟班。(´ ・ω・`)ﾉ╰(・ิω・ิ )
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/cursor-sidekick/examples/basic-usage.vue'
import CustomProvider from '../../../src/components/cursor-sidekick/examples/custom-provider.vue'
</script>

# 游標小跟班 <Badge type="info" text="cursor" />

跟著游標跑的小跟班。(´ ・ω・`)ﾉ╰(・ิω・ิ )

::: tip
此元件針對滑鼠設計，建議使用電腦或可以使用滑鼠的裝置瀏覽。
:::

## 使用範例

### 基本用法

平時跟著游標跑，碰到特定元素會有特殊互動

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/cursor-sidekick/examples/basic-usage.vue
:::

### 自定義內容

自行設計 Provider，產生各種奇奇怪怪的互動吧！ლ（´∀`ლ）

<custom-provider/>

::: details 查看範例原始碼
<<< ../../../src/components/cursor-sidekick/examples/custom-provider.vue
:::

## 原理

這個小廢物元件應該是使用最多種瀏覽器 API 的元件了，以下是 API 與其應用範圍：

- [Document: activeElement property](https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement)
：取得目前 focus 的輸入框元素。

- [Document: elementFromPoint() method](https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint)
：取得目前被 hover 的元素。

- [Document: getSelection() method](https://developer.mozilla.org/en-US/docs/Web/API/Document/getSelection)
：取得選取文字與位置。

- [Element: getBoundingClientRect() method](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
：取得目標元素尺寸與位置。

小跟班的變形動畫是靠老朋友 anime.js 實現。

tooltip 定位使用 [Floating UI](https://floating-ui.com/) 實現，功能超強大，極度推薦。

## 原始碼

<source-link-list name="cursor-sidekick"/>

## API

### Props

<<< ../../../src/components/cursor-sidekick/cursor-sidekick.vue/#Props

ContentProvider 定義如下：

<<< ../../../src/components/cursor-sidekick/use-content-provider.ts/#ContentProvider
