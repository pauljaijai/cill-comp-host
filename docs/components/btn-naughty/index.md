<script setup>
import BasicUsage from '../../../src/components/btn-naughty/examples/basic-usage.vue'
import MovingDistance from '../../../src/components/btn-naughty/examples/moving-distance.vue'
import CallMethod from '../../../src/components/btn-naughty/examples/call-method.vue'
import CustomButton from '../../../src/components/btn-naughty/examples/custom-button.vue'
import CustomRubbing from '../../../src/components/btn-naughty/examples/custom-rubbing.vue'
import SlotProps from '../../../src/components/btn-naughty/examples/slot-props.vue'
</script>

# 調皮的按鈕

一個在停用狀態會亂跑的按鈕。ᕕ( ﾟ ∀。)ᕗ

越想嚕他，就跑得越遠，和你家的貓一樣。(._.`)

## 原理

滑鼠碰觸按鈕時，計算滑鼠位置到按鈕中心的單位向量，並以此向量為基準，移動一個按鈕尺寸的距離。

如果按鈕移動到畫面外，則會自動返回原點，使用 IntersectionObserver 實作。

- [甚麼是 IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

::: danger 注意！Σ(ˊДˋ;)
請不要將 overflow 設定為 hidden，否則按鈕會被隱藏。
:::

## API

### Props

<<< ../../../src/components/btn-naughty/btn-naughty.vue/#Props

### Emits

<<< ../../../src/components/btn-naughty/btn-naughty.vue/#Emits

### Methods

<<< ../../../src/components/btn-naughty/btn-naughty.vue/#Methods

## 使用範例

### 基本用法

當按鈕狀態為 disable 並觸發 hover、click、key enter 事件時，按鈕會開始亂跑

<basic-usage/>

::: details 查看範例原始碼
<<< ../../../src/components/btn-naughty/examples/basic-usage.vue
:::

### 移動距離

指定 maxDistanceMultiple 可以設定最大移動距離倍數（自身寬高倍數），若按鈕跑出指定範圍或超出畫面，都會自動回歸原點

<moving-distance/>

::: details 查看範例原始碼
<<< ../../../src/components/btn-naughty/examples/moving-distance.vue
:::

### 呼叫 method

除了元件自身行為外，也可以直接呼叫 method 產生動作

<call-method/>

::: details 查看範例原始碼
<<< ../../../src/components/btn-naughty/examples/call-method.vue
:::

### 自訂按鈕

可以使用 default slot 自定義按鈕外觀

<custom-button/>

::: details 查看範例原始碼
<<< ../../../src/components/btn-naughty/examples/custom-button.vue
:::

### 自訂拓印

拓印當然也可以自定義。

使用 rubbing slot，自訂按鈕拓印內容

<custom-rubbing/>

::: details 查看範例原始碼
<<< ../../../src/components/btn-naughty/examples/custom-rubbing.vue
:::

### Slot Props

使用 slot prop 可以玩出更多花樣

<slot-props/>

::: details 查看範例原始碼
<<< ../../../src/components/btn-naughty/examples/slot-props.vue
:::
