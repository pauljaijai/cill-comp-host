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

大家有看過 Google 的 Minecraft 15 周年紀念彩蛋嗎？

沒看過的人[趕快來看看](https://gnn.gamer.com.tw/detail.php?sn=267898)。(/≧▽≦)/

簡單來說

::: tip 記得開聲音！🔊
更有挖方塊的感覺喔！◝(≧∀≦)◟
:::

## 使用範例

### 基本用法

按住滑鼠開始挖掘元素，持續一段時間後會將元素挖走。

對洞口雙擊則可將元素放回去。( ´ ▽ ` )ﾉ

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-minecraft-block/examples/basic-usage.vue
:::

### 更多方塊

可以指定不同方塊喔。( ´ ▽ ` )ﾉ

<other-block/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-minecraft-block/examples/other-block.vue
:::

## 原理

由 World 與 Block 兩個主要元件組成。

- World 提供 3D 畫面與網格管理。

- Block 提供使用者互動、聲音與狀態管理。

概念如下：

利用 babylon.js 建立一個覆蓋整個網頁的 3D 畫面，接著使用 CSG 裁切網格，製造出「凹洞」效果與每個方塊所需的粒子系統。

Block 元件負責管理互動、聲音、裂痕動畫與狀態，並透過 EventBus 通知 World 各類事件。

## 原始碼

<source-link-list name="wrapper-minecraft-block"/>

## API

### Props

<<< ../../../src/components/wrapper-minecraft-block/wrapper-minecraft-block.vue/#Props

### Emits

<<< ../../../src/components/wrapper-minecraft-block/wrapper-minecraft-block.vue/#Emits

### Slots

<<< ../../../src/components/wrapper-minecraft-block/wrapper-minecraft-block.vue/#Slots
