---
description: 任何元素包起來就會長出貓耳，讓萬物皆可萌吧！(^・ω・^ )✧
---

<script setup>
import BasicUsage from '../../../src/components/wrapper-cat-ear/examples/basic-usage.vue'
import SwitchAction from '../../../src/components/wrapper-cat-ear/examples/switch-action.vue'
import MixColors from '../../../src/components/wrapper-cat-ear/examples/mix-colors.vue'
import InteractiveEffect from '../../../src/components/wrapper-cat-ear/examples/interactive-effect.vue'
import NaughtyCat from '../../../src/components/wrapper-cat-ear/examples/naughty-cat.vue'
</script>

# 貓耳包裝器

任何元素包起來就會長出貓耳，讓萬物皆可萌吧！(^・ω・^ )✧

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

### 切換動作

可以切換各種不同的動作

<switch-action/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/switch-action.vue
:::

### 調整顏色

調整毛色，個性化貓貓。

<mix-colors/>

10 隻橘貓 9 隻胖，1 隻超級胖。(oﾟvﾟ)ノ

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/mix-colors.vue
:::

### 互動效果

配合耳朵動作設計各類邏輯，讓互動更加有趣。

嘗試讓滑鼠從遠處慢慢靠近按鈕看看。(. ❛ ᴗ ❛.)

<interactive-effect/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/interactive-effect.vue
:::

### 調皮的貓貓

搭配調皮的按鈕，貓貓度更高了！ᕕ( ﾟ ∀。)ᕗ

<naughty-cat/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-cat-ear/examples/naughty-cat.vue
:::

## 原理

使用 SVG 繪製耳朵，透過 anime.js 控制耳朵動畫。

📚 [anime.js](https://animejs.com/)

### 為甚麼選擇 anime.js？

因為最主流的 GSAP 的 SVG 動畫要收費。

最酷炫的 Motion One 使用上有點小問題，而且資料太少。

最後選擇了資料還算齊全且 SVG 支援度不錯的 anime.js 了。

如果大家有更好的套件，拜託請推薦給我。(´▽`ʃ♡ƪ)

## API

### ActionName

<<< ../../../src/components/wrapper-cat-ear/wrapper-cat-ear.vue/#ActionName

### Props

<<< ../../../src/components/wrapper-cat-ear/wrapper-cat-ear.vue/#Props
