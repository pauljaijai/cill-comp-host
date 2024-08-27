<template>
  <svg class=" w-full h-full">
    <!-- 定義馬賽克效果的濾鏡 -->
    <filter id="mosaic">
      <!-- 使用 feTurbulence 來產生隨機紋理 -->
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.1"
        numOctaves="1"
        result="turbulence"
      />

      <!-- 使用 feTile 將紋理以固定大小進行複製 -->
      <feTile
        in="turbulence"
        x="0"
        y="0"
        width="20"
        height="20"
        result="tiled"
      />

      <!-- 使用 feComponentTransfer 調整亮度來產生像素化效果 -->
      <feComponentTransfer>
        <feFuncR
          type="discrete"
          tableValues="0 0.5 1"
        />
        <feFuncG
          type="discrete"
          tableValues="0 0.5 1"
        />
        <feFuncB
          type="discrete"
          tableValues="0 0.5 1"
        />
      </feComponentTransfer>
    </filter>

    <!-- 在這裡應用濾鏡效果到圖像 -->
    <image
      href="https://via.placeholder.com/400"
      class=" w-full h-full"
      filter="url(#mosaic)"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { BlockType, BusData, eventKey } from './type';
import { nanoid } from 'nanoid';
import { pick, sample } from 'remeda';
import { minecraftResource } from './constant';

import {
  useElementBounding,
  useEventBus,
  useIntervalFn,
  useMousePressed,
  useVibrate,
} from '@vueuse/core';
import { useLongPressTimings } from '../../composables/use-long-press-timings';

// #region Props
interface Props {
  /** 方塊種類。初始化後不可變更 */
  blockType?: BlockType;
  /** 初始化是否為挖掉的狀態 */
  isInitDug?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  blockType: 'dirt',
  isInitDug: false,
});

</script>

<style scoped lang="sass">
</style>
