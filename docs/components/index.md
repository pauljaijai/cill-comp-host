<script setup>
import BtnNaughty from '../../src/components/btn-naughty/btn-naughty.vue';
import WrapperStereoscopic from '../../src/components/wrapper-stereoscopic/wrapper-stereoscopic.vue';
import WrapperStereoscopicLayer from '../../src/components/wrapper-stereoscopic/wrapper-stereoscopic-layer.vue';
</script>

# 元件清單

## [調皮的按鈕](./btn-naughty/)

一個會亂跑的按鈕，和你家的貓一樣欠揍。ᕕ( ﾟ ∀。)ᕗ

<div class="flex">
  <btn-naughty label="哈哈抓我啊" z-index="99" disable/>
</div>

## [立體包裝器](./wrapper-stereoscopic/)

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
            (๑•̀ㅂ•́)و✧
          </div>
        </wrapper-stereoscopic-layer>
      </div>
    </wrapper-stereoscopic-layer>
  </div>
</wrapper-stereoscopic>
</div>
