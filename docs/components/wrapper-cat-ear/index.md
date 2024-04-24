---
description: 
---

<script setup>
import BasicUsage from '../../../src/components/wrapper-cat-ear/examples/basic-usage.vue'
import SelectEmotion from '../../../src/components/wrapper-cat-ear/examples/select-emotion.vue'
import MixColors from '../../../src/components/wrapper-cat-ear/examples/mix-colors.vue'
import InteractiveEffect from '../../../src/components/wrapper-cat-ear/examples/interactive-effect.vue'
</script>

# 貓耳包裝器

包起來就會長出貓耳，讓萬物皆可萌吧！~(=^‥^)ノ

路人：「這是甚麼鬼玩意兒？(っ´Ι`)っ」

鱈魚：「聽說有貓就給讚啊？( •̀ ω •́ )✧」

路人：「只有耳朵算啥貓啊。(˘･_･˘)」

## 使用範例

### 基本用法

使用元件包裹後，萬物都會長出貓耳，變得比較討喜（？

耳朵還會自動調整尺寸呦！ˋ( ° ▽、° )

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/basic-usage.vue
:::

### 選擇情緒

可以切換各種不同的情緒

<select-emotion/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/select-emotion.vue
:::

### 調整顏色

調整毛色，個性化貓貓。

10 隻橘貓 9 隻胖，1 隻超級胖。(oﾟvﾟ)ノ

<mix-colors/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/mix-colors.vue
:::

### 嚕貓囉

配合情緒設計各類邏輯，讓互動更加有趣。

嘗試讓滑鼠從遠處慢慢靠近按鈕看看。(. ❛ ᴗ ❛.)

<interactive-effect/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/interactive-effect.vue
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

<<< ../../../src/components/wrapper-cat-ear/wrapper-cat-ear.vue/#Props

### Emits

<<< ../../../src/components/wrapper-cat-ear/wrapper-cat-ear.vue/#Emits

### Methods

<<< ../../../src/components/wrapper-cat-ear/wrapper-cat-ear.vue/#Methods

### Slots

<<< ../../../src/components/wrapper-cat-ear/wrapper-cat-ear.vue/#Slots
