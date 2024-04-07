---
description: 產生物理世界，讓內部元素具有物理效果
---

<script setup>
import BasicUsage from '../../../src/components/wrapper-physics/examples/basic-usage.vue'
import BodyProperty from '../../../src/components/wrapper-physics/examples/body-property.vue'
import AdjustGravity from '../../../src/components/wrapper-physics/examples/adjust-gravity.vue'
</script>

# 物理包裝器

產生物理世界，讓內部元素具有物理效果

## 原理

利用 Matter.js 模擬物理效果，並將對應元素之狀態同步至 DOM 元素上，。

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

## 使用範例

### 基本用法

開始運行後，內部元素會產生物理效果

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/basic-usage.vue
:::

### 物理性質

調整物理性質，讓元素嗨起來！ᕕ( ﾟ ∀。)ᕗ

<body-property/>

鱈魚：我怎麼覺得這個範例偷嘴我？╭(°A ,°`)╮

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/basic-usage.vue
:::

### 調整重力

調整重力方向，讓元素飄起來！(ﾉ>ω<)ﾉ

<adjust-gravity/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-physics/examples/basic-usage.vue
:::
