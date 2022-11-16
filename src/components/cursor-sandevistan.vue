<template>
  <div
    class="frame"
    :style="frameStyle"
  >
    <div
      v-for="afterimage, i in afterimages"
      :key="afterimage.id"
      :style="afterimage"
      class="cursor afterimage fixed select-none pointer-events-none"
      @animationend="deleteAfterimage(afterimage.id)"
    >
      <img
        :src="cursorUrl"
        class=" h-full"
        :style="getAfterimageColorStyle(i)"
      >
    </div>

    <div class="cursor">
      <img
        :src="cursorUrl"
        alt="cursor"
        class="h-full"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { nanoid } from 'nanoid';
import { clamp, remove } from 'lodash-es';

import defaultCursor from '../assets/cursors-cyberpunk.png'

import { useMouse, watchThrottled, useInterval } from '@vueuse/core';

interface Afterimage {
  id: string;
  top: string;
  left: string;
}

interface Props {
  img?: string;
  size?: string;
  /** 殘影數量 */
  quantity?: number;
}
const props = withDefaults(defineProps<Props>(), {
  img: undefined,
  size: '5rem',
  quantity: 10,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const cursorUrl = computed(() => props.img ? props.img : defaultCursor);

const mouse = useMouse();
watchThrottled(() => mouse, ({ x, y }) => {
  const top = `${y.value}px`;
  const left = `${x.value}px`;

  createAfterimage(top, left);
}, { throttle: 100, deep: true, })

const frameStyle = computed(() => ({
  top: `${mouse.y.value}px`,
  left: `${mouse.x.value}px`,
}));

const afterimages = ref<Afterimage[]>([]);

function createAfterimage(top: string, left: string) {
  afterimages.value.unshift({
    id: nanoid(),
    top,
    left
  });

  if (afterimages.value.length > props.quantity) {
    afterimages.value.pop();
  }
}
function deleteAfterimage(id: string) {
  remove(afterimages.value, { id });
}
function getAfterimageColorStyle(index: number) {
  const h = mapNumber(index, 0, props.quantity, 100, 280);
  const color = hslToHex(h, 100, 80);

  return {
    filter: `opacity(0.4) drop-shadow(0 0 0 ${color})`,
  };
}

function mapNumber(current: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const mapped: number = ((current - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  return clamp(mapped, outMin, outMax);
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
</script>

<style scoped lang="sass">
.frame
  position: fixed
  pointer-events: none

.cursor
  width: v-bind('props.size')
  height: v-bind('props.size')

.afterimage
  animation: afterimage 1s forwards
  z-index: -1

@keyframes afterimage
  0%, 100%
    opacity: 1
</style>
