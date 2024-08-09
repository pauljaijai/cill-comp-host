---
description: 讓網頁充滿漫天飛舞的小小螢火
---

<script setup>
import SourceLinkList from '../../../src/components/source-link-list.vue'

import BasicUsage from '../../../src/components/bg-firefly/examples/basic-usage.vue'
import FullBackground from '../../../src/components/bg-firefly/examples/full-background.vue'

</script>

# 螢火蟲

讓網頁充滿漫天飛舞的小小螢火。ヾ(◍'౪`◍)ﾉﾞ

大家有沒有看過螢火蟲海呢？

我原本也想說不過就是會亮亮的小蟲蟲，應該沒什麼吧？(´・ω・`)

直到自己親臨現場，才感受到那種彷彿沐浴在銀河中的那種浪漫。

照片感受不到現場的感覺，推薦大家可以去個一次看看。( ´ ▽ ` )ﾉ

<a data-flickr-embed="true" data-header="true" data-footer="true" href="https://www.flickr.com/photos/coodfish/17364014109/in/dateposted/" title="IMG_71867"><img src="https://live.staticflickr.com/5330/17364014109_811ea8a4cc_k.jpg" width="2048" height="1365" alt="IMG_71867"/></a>

<a data-flickr-embed="true" data-header="true" data-footer="true" href="https://www.flickr.com/photos/coodfish/17001456808/in/dateposted/" title="IMG_71484"><img src="https://live.staticflickr.com/7682/17001456808_8611babaf5_k.jpg" width="2048" height="1365" alt="IMG_71484"/></a>

<script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

微涼的夜風與飛舞營火交織成銀河一般的流光密語。

在一個又一個失眠的夜裡，呢喃。

## 使用範例

### 基本用法

設定基本參數。

<basic-usage class="h-[60vh]"/>

::: details 查看範例原始碼
<<< ../../../src/components/bg-firefly/examples/basic-usage.vue
:::

### 背景

靜下心，享受夜晚的寧靜。(´,,•ω•,,)

<full-background />

::: details 查看範例原始碼
<<< ../../../src/components/bg-firefly/examples/full-background.vue
:::

## 原理

使用 WebGPU 與 babylon 的粒子系統，性能超棒棒。( •̀ ω •́ )✧

## 原始碼

<source-link-list name="bg-firefly"/>

## API

### Props

<<< ../../../src/components/bg-firefly/bg-firefly.vue/#Props
