<template>
  <div class="flex flex-col items-center gap-14 w-full border border-gray-300 p-6">
    <wrapper-minecraft-block block-type="stone">
      <div class="border p-6 py-10 select-none">
        我是俗投 ᕕ( ﾟ ∀。)ᕗ
      </div>
    </wrapper-minecraft-block>

    <wrapper-minecraft-block block-type="sand">
      <div class="border p-6 py-20 select-none">
        我是沙子 (´,,•ω•,,)
      </div>
    </wrapper-minecraft-block>

    <!-- 必須放置一個 world 元件 -->
    <wrapper-minecraft-world />
  </div>
</template>

<script setup lang="ts">
import WrapperMinecraftBlock from '../wrapper-minecraft-block.vue';
import WrapperMinecraftWorld from '../wrapper-minecraft-world.vue';
</script>
