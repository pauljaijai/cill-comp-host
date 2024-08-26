<template>
  <div class="flex justify-center flex-wrap gap-20 w-full border border-gray-300 p-6">
    <div class="flex justify-center flex-wrap gap-14">
      <wrapper-minecraft-block>
        <img
          src="/profile.webp"
          width="200"
          height="200"
          class="p-2 border rounded pointer-events-none select-none"
        >
      </wrapper-minecraft-block>

      <wrapper-minecraft-block>
        <img
          src="/profile-2.webp"
          width="200"
          height="200"
          class="p-2 border rounded pointer-events-none select-none"
        >
      </wrapper-minecraft-block>
    </div>

    <wrapper-minecraft-block>
      <img
        src="/profile-3.webp"
        width="260"
        height="260"
        class="p-2 border rounded pointer-events-none select-none"
      >
    </wrapper-minecraft-block>

    <!-- 必須放置一個 world 元件 -->
    <wrapper-minecraft-world />
  </div>
</template>

<script setup lang="ts">
import WrapperMinecraftBlock from '../wrapper-minecraft-block.vue';
import WrapperMinecraftWorld from '../wrapper-minecraft-world.vue';
</script>
