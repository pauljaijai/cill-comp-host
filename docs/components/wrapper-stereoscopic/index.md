<script setup>
import BasicUsage from '../../../src/components/wrapper-stereoscopic/examples/basic-usage.vue'
import MultiLayer from '../../../src/components/wrapper-stereoscopic/examples/multi-layer.vue'
import AngleRange from '../../../src/components/wrapper-stereoscopic/examples/angle-range.vue'
import ZOffset from '../../../src/components/wrapper-stereoscopic/examples/z-offset.vue'
</script>

# 立體包裝器

可以讓元素有酷酷的 3D 偏轉效果

## 原理

利用 CSS 的 perspective 與 transform3d，產生 3D 旋轉與透視變形效果。

其中 perspective 尤為重要，此屬性負責讓物體產生透視變形效果。

沒設定的話，物體看起來像莫名其妙扁掉。...('◉◞⊖◟◉` )

- [CSS perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

- [CSS translate3d](https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform-function/translate3d)

## API

### Props

<<< ../../../src/components/wrapper-stereoscopic/wrapper-stereoscopic.vue/#Props

## 使用範例

### 基本用法

可以隨手關閉，不過沒辦法省電。乁( ◔ ௰◔)「

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/basic-usage.vue
:::

### 多層視差

多層 layer 可以產生多層立體效果

<multi-layer/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/multi-layer.vue
:::

### 最大偏轉角

可以設定最大偏轉角度

<angle-range/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/angle-range.vue
:::

### 漂浮距離

可以設定每層之間的漂浮距離，想躺平就躺平。\_(:3」ㄥ)\_

<z-offset/>

::: details 查看範例原始碼
<<< ../../../src/components/wrapper-stereoscopic/examples/z-offset.vue
:::
