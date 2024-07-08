---
description: 
---

<script setup>
import BasicUsage from '../../../src/components/carousel-space-floating/examples/basic-usage.vue'
import CustomPosture from '../../../src/components/carousel-space-floating/examples/custom-posture.vue'
</script>

# 空間懸浮輪播

所有的圖片會漂浮在空間中！ヾ(◍'౪`◍)ﾉﾞ

## 使用範例

### 基本用法

所有的圖片會分布在空間中，切換圖片時，鏡頭會移動至目標圖片前方。

點擊左鍵下一張，右鍵返回上一張。

<basic-usage class="h-[60vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/carousel-space-floating/examples/basic-usage.vue
:::

### 調整姿態

可以微調每張圖片的姿態，包含偏移、旋轉和縮放。

點擊左鍵下一張，右鍵返回上一張。

<custom-posture />

::: details 查看範例原始碼
<<< ../../../src/components/carousel-space-floating/examples/custom-posture.vue
:::

## 原理

使用 babylon 建立 3D 場景，將所有的圖片放置在空間中，並且根據目標圖片的位置，移動鏡頭至目標圖片前方。

## API

### Props

<<< ../../../src/components/carousel-space-floating/carousel-space-floating.vue/#Props

### Methods

<<< ../../../src/components/carousel-space-floating/carousel-space-floating.vue/#Methods

### Slots

<<< ../../../src/components/carousel-space-floating/carousel-space-floating.vue/#Slots
