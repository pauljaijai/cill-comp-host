---
description: 跟著游標跑的小跟班。(´ ・ω・`)ﾉ╰(・ิω・ิ )
---

<script setup>
import BasicUsage from '../../../src/components/cursor-sidekick/examples/basic-usage.vue'
import CustomProvider from '../../../src/components/cursor-sidekick/examples/custom-provider.vue'
</script>

# 游標小跟班

跟著游標跑的小跟班。(´ ・ω・`)ﾉ╰(・ิω・ิ )

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

這個小廢物元件應該是使用最多種 Web API 的元件了，以下是功能與其對應的 API：



## API

### Props

<<< ../../../src/components/cursor-sidekick/cursor-sidekick.vue/#Props

ContentProvider 具體內容如下：

<<< ../../../src/components/cursor-sidekick/use-content-provider.ts/#ContentProvider
