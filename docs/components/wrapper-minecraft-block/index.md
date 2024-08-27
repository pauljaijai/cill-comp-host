---
description: 讓網頁元素變成 Minecraft 方塊，在小小的網頁裡挖呀挖呀挖！ᕕ( ﾟ ∀。)ᕗ
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/wrapper-minecraft-block/examples/basic-usage.vue'
import OtherBlock from '../../../src/components/wrapper-minecraft-block/examples/other-block.vue'
</script>

# Minecraft 方塊包裝器

大家有玩過 [Minecraft](https://www.minecraft.net/zh-hant) 嗎？

不瞞大家說，其實鱈魚我是資深玩家，還曾經在巴哈發表過地圖作品。(´,,•ω•,,)

前陣子 Google 發布了的 Minecraft 15 周年紀念彩蛋。（沒看過的[趕快來看看](https://gnn.gamer.com.tw/detail.php?sn=267898)）

大受感動的我決定也來做一個自己的版本，不過礙於技術力不足，搞了好久才做出來。...(›´ω`‹ )

讓我們一起把網頁元素變成 Minecraft 方塊，在小小的網頁裡挖呀挖呀挖！ᕕ( ﾟ ∀。)ᕗ

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

- World 提供 3D 畫面。

- Block 負責互動。

概念如下：

利用 babylon.js 建立一個覆蓋整個網頁的 3D 畫面，接著使用 CSG 裁切網格，製造出「凹洞」效果並初始化每個方塊所需的粒子系統。

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
