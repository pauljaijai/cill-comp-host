<template>
  <div class="w-full py-16 border border-gray-300 flex flex-col gap-16 justify-center items-center">
    <wrapper-cat-ear main-color="#AAA">
      <div class="border border-[#AAA] rounded  bg-white">
        <button class="px-4 p-2">
          按鈕
        </button>
      </div>
    </wrapper-cat-ear>

    <wrapper-cat-ear main-color="#AAA">
      <div class="">
        <img
          class="rounded w-80"
          src="/codfish.webp"
        >
      </div>
    </wrapper-cat-ear>

    <wrapper-cat-ear main-color="#AAA">
      <div class=" border border-[#AAA] rounded ">
        <select class="px-10 py-2">
          <option
            disabled
            selected
            label="請選擇貓貓"
          />
          <option label="(>'-'<)ノ" />
          <option label="~(=^‥^)" />
          <option label="/ᐠ｡ꞈ｡ᐟ\" />
          <option label="(^._.^)ﾉ" />
          <option label="(^・ω・^ )" />
        </select>
      </div>
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import WrapperCatEar, { ActionName } from '../wrapper-cat-ear.vue';
</script>
