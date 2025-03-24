<script setup>

import BaseCheckbox from '../../src/components/base-checkbox.vue';
import ExpansionSection from '../../src/components/expansion-section.vue';

import BtnNaughty from '../../src/components/btn-naughty/btn-naughty.vue';

import SliderStubborn from '../../src/components/slider-stubborn/examples/basic-usage.vue';

import ToggleProactive from '../../src/components/toggle-proactive/examples/basic-usage.vue';

import InputDecoding from '../../src/components/input-decoding/examples/basic-usage.vue';

import WrapperStereoscopic from '../../src/components/wrapper-stereoscopic/wrapper-stereoscopic.vue';
import WrapperStereoscopicLayer from '../../src/components/wrapper-stereoscopic/wrapper-stereoscopic-layer.vue';

import WrapperPhysics from '../../src/components/wrapper-physics/examples/basic-usage.vue';
import WrapperCatEar from '../../src/components/wrapper-cat-ear/examples/interactive-effect.vue';
import WrapperKirbyMouthfulMode from '../../src/components/wrapper-kirby-mouthful-mode/examples/basic-usage.vue';
import WrapperMinecraftBlock from '../../src/components/wrapper-minecraft-block/examples/other-block.vue';
import WrapperDodging from '../../src/components/wrapper-dodging/examples/basic-usage.vue';

import CursorSidekick from '../../src/components/cursor-sidekick/examples/basic-usage.vue';

import CardFuturistic from '../../src/components/card-futuristic/examples/mix-part.vue';

import CarouselSpaceFloating from '../../src/components/carousel-space-floating/examples/custom-posture.vue';
import CarouselAnamorphosisText from '../../src/components/carousel-anamorphosis-text/examples/basic-usage.vue';

import TransitionShape from '../../src/components/transition-shape/examples/basic-usage.vue';
import TransitionSpecialEffects from '../../src/components/transition-special-effects/examples/basic-usage.vue';

import BgFirefly from '../../src/components/bg-firefly/examples/full-background.vue';
import BgSakuraFubuki from '../../src/components/bg-sakura-fubuki/examples/full-background.vue';
import BgSnow from '../../src/components/bg-snow/examples/basic-usage.vue';
import BgWavyLines from '../../src/components/bg-wavy-lines/examples/basic-usage.vue';

import TextCharactersTransition from '../../src/components/text-characters-transition/examples/custom-transition.vue';
import TextHateMouse from '../../src/components/text-hate-mouse/examples/basic-usage.vue';

import UtilPartyPopper from '../../src/components/util-party-popper/examples/wide-area-emit.vue';
import UtilCatFace from '../../src/components/util-cat-face/examples/interactive-case.vue';

import { ref } from 'vue';

const currentSection = ref('btn');
</script>

# 元件清單

## 按鈕

經典卻又不常見的按鈕。(。・∀・)ノ

<expansion-section
  v-model="currentSection"
  value="btn"
  header-class="border p-2 rounded-lg"
>

### [調皮的按鈕](./btn-naughty/) <Badge type="info" text="button" />

一個停用時會越嚕越遠的按鈕，像極了你家那隻欠揍的貓。(._.`)

<div class="flex w-full justify-center py-[20vh]">
  <btn-naughty label="(^._.^)ﾉ" z-index="99" disabled/>
</div>

</expansion-section>

## 滑動條

經典卻又不常見的滑動條。∠( ᐛ 」∠)_

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [固執的滑動條](./slider-stubborn/) <Badge type="info" text="slider" />

停用時絕不妥協的滑動條。(。-`ω´-)

<slider-stubborn class="h-[60vh]" z-index="999"/>

</expansion-section>

## 開關

有趣、有個性的開關。(●′ω`●)

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [主動的開關](./toggle-proactive/) <Badge type="info" text="toggle" />

停用時切換狀態會和你唱反調。( ´థ౪థ)

<toggle-proactive class="h-[60vh]" z-index="999"/>

</expansion-section>

## 輸入框

風格化的輸入框

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [解碼輸入框](./input-decoding/) <Badge type="info" text="input" />

不管是輸入還是貼上，都會有解碼效果，而且完全不會干擾輸入過程。(⌐■_■)✧

<input-decoding class="h-[30vmax] flex-center" z-index="999"/>

</expansion-section>

## 包裝器

包起來，產生各種有趣的效果吧！(´▽`ʃ♡ƪ)

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [立體包裝器](./wrapper-stereoscopic/) <Badge type="info" text="wrapper" />

可以讓元素有酷酷的 3D 偏轉效果

<div class="flex">
  <wrapper-stereoscopic v-slot="wrapper">
  <div
    class=" p-10 border rounded flex-center"
    :style="wrapper.style"
  >
    <wrapper-stereoscopic-layer v-slot="layer01">
      <div
        class=" p-10 border rounded flex-center"
        :style="layer01.style"
      >
        <wrapper-stereoscopic-layer v-slot="layer02">
          <div class="text-xl font-bold">
            ( ﾟ ∀。) 好暈好暈啊
          </div>
        </wrapper-stereoscopic-layer>
      </div>
    </wrapper-stereoscopic-layer>
  </div>
</wrapper-stereoscopic>
</div>

### [物理包裝器](./wrapper-physics/) <Badge type="info" text="wrapper" />

產生物理世界，讓內部元素具有物理效果

<wrapper-physics />

### [貓耳包裝器](./wrapper-cat-ear/) <Badge type="info" text="wrapper" />

任何元素包起來就會長出貓耳，讓萬物皆可萌吧！(^・ω・^ )

<wrapper-cat-ear class="h-[70vh]" />

### [塞滿嘴包裝器](./wrapper-kirby-mouthful-mode/) <Badge type="info" text="wrapper" />

讓粉紅惡魔來幫你吃掉畫面上的一切。( ͡• ͜ʖ ͡• )

<wrapper-kirby-mouthful-mode class="h-[70vh]" />

### [Minecraft 方塊包裝器](./wrapper-minecraft-block/) <Badge type="info" text="wrapper" />

讓網頁元素變成 Minecraft 方塊！

在小小的網頁裡挖呀挖呀挖！ᕕ( ﾟ ∀。)ᕗ

<!-- <wrapper-minecraft-block  /> -->
::: warning 暫停展示
由於在這裡展示會偏移，大家還是前往[元件頁面](./wrapper-minecraft-block/)看看吧。(。-`ω´-)
:::

### [閃躲飄包裝器](./wrapper-dodging/) <Badge type="info" text="wrapper" />

被包裹的元素會開始閃躲飄，像極了...。ԅ( ˘ω˘ԅ)

<wrapper-dodging  />

</expansion-section>

## 游標

讓~~勞贖~~滑鼠更趣味！ᕕ( ﾟ ∀。)ᕗ

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [游標小跟班](./cursor-sidekick/) <Badge type="info" text="cursor" />

跟著游標跑的小跟班。(´ ・ω・`)ﾉ╰(・ิω・ิ )

<cursor-sidekick  />

</expansion-section>

## 卡片

實用、酷炫的資料容器。

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [科幻卡片](./card-futuristic/) <Badge type="info" text="card" />

簡潔、實用的科幻風格資訊容器。(≖‿ゝ≖)✧

<card-futuristic  />

</expansion-section>

## 輪播

讓畫面更生動的輪播元件！◝( •ω• )◟

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [空間懸浮輪播](./carousel-space-floating/) <Badge type="info" text="carousel" />

所有的圖片會漂浮在空間中！ヾ(◍'౪`◍)ﾉﾞ

<div class="h-[70vh]">
  <carousel-space-floating  />
</div>

### [錯視文字輪播](./carousel-anamorphosis-text/) <Badge type="info" text="carousel" />

文字作為遮罩裁切圖片後，邊移動移動邊組成圖片，看不懂說明？來看看就懂啦。(*´∀`)~♥

<div>
  <carousel-anamorphosis-text  />
</div>

</expansion-section>

## 背景

讓生成式藝術藝術點綴網頁吧！ヾ(◍'౪`◍)ﾉﾞ

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [螢火蟲](./bg-firefly/) <Badge type="info" text="bg" />

靜下心，享受夜晚的寧靜。(´,,•ω•,,)

<bg-firefly class="h-[70vh]" />

### [櫻吹雪](./bg-sakura-fubuki/) <Badge type="info" text="bg" />

櫻花漫天，紛飛如夢

<bg-sakura-fubuki class="h-[70vh]" />

### [落雪](./bg-snow/) <Badge type="info" text="bg" />

讓網頁飄雪吧，還會積雪喔。( ´ ▽ ` )ﾉ

<bg-snow class="h-[70vh]" />

### [波浪線](./bg-wavy-lines/) <Badge type="info" text="bg" />

一條條樸實無華的實線，於動靜之間，為網站添上一抹簡約的詩意。

<bg-wavy-lines class="h-[70vh]" />

</expansion-section>

## 轉場

特殊的轉場元件

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [多邊形轉場](./transition-shape/) <Badge type="info" text="transition" />

Motion Graphic 風格的 Transition 元件

<transition-shape  />

### [特效轉場](./transition-special-effects/) <Badge type="info" text="transition" />

效果酷炫、風格強烈的 Transition 元件！◝( •ω• )◟

<transition-special-effects  />

</expansion-section>

## 文字

讓文字活起來吧！(๑•̀ㅂ•́)و✧

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [逐字轉場](./text-characters-transition/) <Badge type="info" text="text" />

讓每個文字都有進入進出動畫。( •̀ ω •́ )✧

（點擊以下任一方塊，開始切換）

<text-characters-transition  />

鱈魚：「那個沒有也太晚出現了吧！Σ(ˊДˋ;)」

### [怕鼠的文字](./text-hate-mouse/) <Badge type="info" text="text" />

「有勞鼠！Σ(ˊДˋ;)」

<text-hate-mouse class="h-[70vh] flex items-center"  />

</expansion-section>

## 實用

各種實用（？）的奇怪東東。( ͡° ͜ʖ ͡°)✧

<expansion-section
  v-model="currentSection"
  header-class="border p-2 rounded-lg"
>

### [拉炮](./util-party-popper/) <Badge type="info" text="util" />

隨時隨地都可以慶祝！✧｡٩(ˊᗜˋ*)و✧*｡

<util-party-popper class="h-[70vh]" />

### [貓臉](./util-cat-face/) <Badge type="info" text="util" />

提供滿滿的情緒價值。(=¯ω¯=)

<util-cat-face  />

</expansion-section>
