---
description: 被包裹的元素會開始閃躲飄，像極了...。ԅ( ˘ω˘ԅ)
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/wrapper-dodging/examples/basic-usage.vue'
import ConfidentialData from '../../../src/components/wrapper-dodging/examples/confidential-data.vue'
import PointlessSurvey from '../../../src/components/wrapper-dodging/examples/pointless-survey.vue'
</script>

# 閃躲飄包裝器 <Badge type="info" text="wrapper" />

被包裹的元素會開始閃躲飄，像極了...。ԅ( ˘ω˘ԅ)

## 使用範例

### 基本用法

啟用後被包裹的元素會精準地閃躲飄，像極了那些閃避率點滿的同事。(。-`ω´-)

<basic-usage />

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-dodging/examples/basic-usage.vue
:::

### 機密資料

機密到連碰都碰不到。(́⊙◞౪◟⊙‵)

<confidential-data class="h-[20vmax]" />

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-dodging/examples/confidential-data.vue
:::

### 意願調查表

調查下午要不要喝飲料。♪( ◜ω◝و(و

<pointless-survey/>

同事：「根本強迫喝飲料！Σ(ˊДˋ;)」

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-dodging/examples/pointless-survey.vue
:::

## 原理

使用 Matter.js 實現物理模擬效果

實作延伸至基於[怕鼠的文字](/components/text-hate-mouse/){target=_blank}，最大的差別在於物體的形狀為矩形，需要多處理旋轉問題。

## 原始碼

<source-link-list name="wrapper-dodging"/>

## API

### Props

<<< ../../../src/components/wrapper-dodging/wrapper-dodging.vue/#Props

### Slots

<<< ../../../src/components/wrapper-dodging/wrapper-dodging.vue/#Slots
