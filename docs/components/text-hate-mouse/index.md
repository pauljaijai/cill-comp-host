---
description: 滑鼠靠近時會躲得遠遠的文字。(。-`ω´-)
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/text-hate-mouse/examples/basic-usage.vue'
import MoreCase from '../../../src/components/text-hate-mouse/examples/more-case.vue'
import CustomProps from '../../../src/components/text-hate-mouse/examples/custom-props.vue'
</script>

# 怕鼠的文字 <Badge type="info" text="text" />

滑鼠靠近時會躲得遠遠的文字。

::: tip
此元件針對滑鼠設計，建議使用電腦或可以使用滑鼠的裝置瀏覽。
:::

## 使用範例

### 基本用法

滑鼠靠近時，文字會遠離滑鼠。

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/text-hate-mouse/examples/basic-usage.vue
:::

### 不同組合

不同參數有不同效果。

<more-case/>

::: details 查看範例原始碼
<<< ../../../src/components/text-hate-mouse/examples/more-case.vue
:::

### 自定義參數

變出有趣的效果吧！ԅ(´∀` ԅ)

<custom-props/>

::: details 查看範例原始碼
<<< ../../../src/components/text-hate-mouse/examples/custom-props.vue
:::

## 原理

基於 `Matter.js` 實現物理模擬效果。

基本上就是[逐字轉場](https://chillcomponent.codlin.me/components/text-characters-transition/)與[物理包裝器](https://chillcomponent.codlin.me/components/wrapper-physics/)的融合。

## 原始碼

<source-link-list name="text-hate-mouse"/>

## API

### Props

<<< ../../../src/components/text-hate-mouse/text-hate-mouse.vue/#Props
