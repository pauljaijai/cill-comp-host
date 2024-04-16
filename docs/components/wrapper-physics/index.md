---
description: 產生物理世界，讓內部元素具有物理效果 ヾ(⌐■_■)ノ♪
---

<script setup>
import BasicUsage from '../../../src/components/wrapper-physics/examples/basic-usage.vue'
import BodyProperty from '../../../src/components/wrapper-physics/examples/body-property.vue'
import AdjustGravity from '../../../src/components/wrapper-physics/examples/adjust-gravity.vue'
import WindowScroll from '../../../src/components/wrapper-physics/examples/window-scroll.vue'
import BodyPolygon from '../../../src/components/wrapper-physics/examples/body-polygon.vue'
import ScopeProp from '../../../src/components/wrapper-physics/examples/scope-prop.vue'
import DeviceMotion from '../../../src/components/wrapper-physics/examples/device-motion.vue'
</script>

# 物理包裝器

產生物理世界，讓內部元素具有物理效果 ヾ(⌐■_■)ノ♪

## 使用範例

### 基本用法

開始運行後，被 body 包裹的元素會產生物理效果

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/basic-usage.vue
:::

### 物理性質

調整物理性質，讓元素嗨起來！ᕕ( ﾟ ∀。)ᕗ

<body-property/>

鱈魚：「我怎麼覺得這個範例偷嘴我？╭(°A ,°`)╮」

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/body-property.vue
:::

### 調整重力

調整重力方向，讓元素飄起來！(ﾉ>ω<)ﾉ

<adjust-gravity/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/adjust-gravity.vue
:::

### 視窗滾動

結合滾動效果，將捲動之速度映射至重力加速度，製造上下搖晃效果

<window-scroll/>

鱈魚：「夭壽虐魚喔！Σ(っ °Д °;)っ」

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/window-scroll.vue
:::

### 物體形狀

調整物體碰撞箱（hit box）外型，例如圓形才符合鱈魚的真實體型。╮(╯▽╰)╭

鱈魚：「現在是當我聽不到是不是？ಠ_ಠ」

::: tip 甚麼是碰撞箱（hit box）
碰撞箱是指實際上在物理世界中參與碰撞的實際形狀。

你一定在想為甚麼不用物體本身的形狀？

因為物體通常很複雜，如果使用過度複雜的形狀進行運算會導致性能問題，所以通常都會適當簡化，使用形狀更單純的碰撞箱呦。(. ❛ ᴗ ❛.)
:::

<body-polygon/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/body-polygon.vue
:::

### Scope Prop

使用 Scope Prop 玩出更多花樣

<scope-prop/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/scope-prop.vue
:::

### 手機感測器

配合手機的加速度計，做出更有趣的互動！(/≧▽≦)/

::: tip
感謝前端社團和 Line 社群的朋友們提供靈感！

(o゜▽ ゜)o☆
:::

<device-motion/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/device-motion.vue
:::

## 原理

概念為利用 Matter.js 模擬物理效果，並將對應元素之狀態同步至 DOM 元素上。

::: tip 甚麼是 Matter.js
Matter.js 是一個很成熟的 JavaScript 2D 物理引擎套件，官網上有很多有趣的範例

📚 [Matter.js](https://brm.io/matter-js/)
:::

具體流程如下：

1. wrapper-physics 收集內部註冊的 wrapper-physics-body。
1. 根據 body 的位置、尺寸與 prop，建立對應的 Matter.js 物體。
1. 透過 Matter.js 模擬物理效果並將物理效果儲存。
1. body 取得儲存的物理效果，並同步至 DOM 元素上。

如此這般，我們成功實現物理效果模擬了！就像是替身一樣！(ﾉ>ω<)ﾉ

JOJO！我不想當 DOM 了！（⊙益⊙）

## API

需要兩個元件，分別為：

- wrapper-physics：產生物理世界。
- wrapper-physics-body：定義物體，放在物理世界中。

### 🧩 WrapperPhysics

定義物理世界與特性，對其中物體產生交互作用。

#### Props {#wrapper-physics-props}

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Props

#### Methods {#wrapper-physics-methods}

<<< ../../../src/components/wrapper-physics/wrapper-physics.vue/#Methods

### 🧩 WrapperPhysicsBody

定義物體與性質，放在物理世界中，會受其物理規則影響。

#### Props {#wrapper-physics-body-props}

<<< ../../../src/components/wrapper-physics/wrapper-physics-body.vue/#Props

#### Slots {#wrapper-physics-body-slots}

<<< ../../../src/components/wrapper-physics/wrapper-physics-body.vue/#Slots
