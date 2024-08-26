---
description: 讓網頁元素變成方塊，在小小的網頁裡挖呀挖呀挖！ᕕ( ﾟ ∀。)ᕗ
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/wrapper-minecraft-block/examples/basic-usage.vue'
import OtherBlock from '../../../src/components/wrapper-minecraft-block/examples/other-block.vue'
</script>

# Minecraft 方塊包裝器

讓網頁元素變成方塊，在小小的網頁裡挖呀挖呀挖！ᕕ( ﾟ ∀。)ᕗ

## 使用範例

### 基本用法

按住滑鼠開始挖掘元素，持續一段時間後會將元素挖走。

對洞口雙擊則可將元素放回去。( ´ ▽ ` )ﾉ

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-minecraft-block/examples/basic-usage.vue
:::

### 更多方塊

還可以指定不同方塊。( ´ ▽ ` )ﾉ

<other-block/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-minecraft-block/examples/other-block.vue
:::

## 原理

利用 babylon.js 建立一個覆蓋整個網頁的 3D 畫面，接著使用 CSG 裁切網格，製造出「凹洞」效果與每個方塊所需的粒子系統。

Block 元件負責管理使用者互動、聲音與狀態，並透過 EventBus 通知 World 各類事件。

## 原始碼

<source-link-list name="wrapper-minecraft-block"/>

## API

### Props

<<< ../../../src/components/wrapper-minecraft-block/wrapper-minecraft-block.vue/#Props

### Emits

<<< ../../../src/components/wrapper-minecraft-block/wrapper-minecraft-block.vue/#Emits

### Slots

<<< ../../../src/components/wrapper-minecraft-block/wrapper-minecraft-block.vue/#Slots
