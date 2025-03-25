---
description: 停用時絕不妥協的滑動條。(。-`ω´-)
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/slider-stubborn/examples/basic-usage.vue'
import CustomProp from '../../../src/components/slider-stubborn/examples/custom-prop.vue'
import DisabledCondition from '../../../src/components/slider-stubborn/examples/disabled-condition.vue'
</script>

# 固執的滑動條 <Badge type="info" text="slider" />

停用時絕不妥協的滑動條。(。-`ω´-)

## 使用範例

### 基本用法

當狀態為 disabled 時，拉動握把會越拉越長，還會越拉越緊。ᕕ( ﾟ ∀。)ᕗ

<basic-usage class="h-[30vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/slider-stubborn/examples/basic-usage.vue
:::

### 元件參數

樣式可隨意調整

<custom-prop />

::: details 查看範例原始碼
<<< ../../../src/components/slider-stubborn/examples/custom-prop.vue
:::

### 停用條件

根據條件來決定是否停用滑動條

<disabled-condition />

::: details 查看範例原始碼
<<< ../../../src/components/slider-stubborn/examples/disabled-condition.vue
:::

## 原理

使用 svg path 實現拉長與彎曲彈性效果。

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則握把拉長時會被裁切
:::

## 原始碼

<source-link-list name="slider-stubborn"/>

## API

### Props

<<< ../../../src/components/slider-stubborn/slider-stubborn.vue/#Props

### Emits

<<< ../../../src/components/slider-stubborn/slider-stubborn.vue/#Emits
