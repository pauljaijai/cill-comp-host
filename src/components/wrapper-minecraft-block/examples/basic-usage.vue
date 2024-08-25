<template>
  <div class="flex flex-col items-center gap-14 w-full border border-gray-300 p-6">
    <wrapper-minecraft-block>
      <img
        src="/profile.webp"
        width="200"
        height="200"
        class="p-2 border rounded pointer-events-none select-none"
      >
    </wrapper-minecraft-block>

    <wrapper-minecraft-block block-type="stone">
      <div class="border p-6 select-none">
        我是俗投 ᕕ( ﾟ ∀。)ᕗ
      </div>
    </wrapper-minecraft-block>

    <wrapper-minecraft-block block-type="sand">
      <div class="border p-6 select-none">
        我是沙子 (´,,•ω•,,)
      </div>
    </wrapper-minecraft-block>

    <wrapper-minecraft-world />
  </div>
</template>

<script setup lang="ts">
import WrapperMinecraftBlock from '../wrapper-minecraft-block.vue';
import WrapperMinecraftWorld from '../wrapper-minecraft-world.vue';
</script>
