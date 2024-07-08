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

點擊滑鼠左鍵前往下一張，點擊滑鼠右鍵返回上一張。

<basic-usage class="h-[60vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/carousel-space-floating/examples/basic-usage.vue
:::

### 調整姿態

可以微調每張圖片的姿態，包含偏移、旋轉和縮放。

點擊滑鼠左鍵前往下一張，點擊滑鼠右鍵返回上一張。

<custom-posture class="h-[40vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/carousel-space-floating/examples/custom-posture.vue
:::

## 原理

滑鼠碰觸按鈕時，計算滑鼠位置到按鈕中心的單位向量，並以此向量為基準，移動一個按鈕尺寸的距離。

如果按鈕移動到畫面外，則會自動返回原點，使用 IntersectionObserver 實作。

📚 [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則按鈕會啪沒了，消失的無影無蹤。
:::

## API

### Props

<<< ../../../src/components/carousel-space-floating/carousel-space-floating.vue/#Props

### Emits

<<< ../../../src/components/carousel-space-floating/carousel-space-floating.vue/#Emits

### Methods

<<< ../../../src/components/carousel-space-floating/carousel-space-floating.vue/#Methods

### Slots

<<< ../../../src/components/carousel-space-floating/carousel-space-floating.vue/#Slots
