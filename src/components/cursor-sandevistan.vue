<template>
  <div
    class="frame"
    :style="frameStyle"
  >
    <div
      v-for="afterimage in afterimages"
      :key="afterimage.id"
      :style="{ top: afterimage.top, left: afterimage.left }"
      class="cursor afterimage fixed select-none pointer-events-none"
      @animationend="deleteAfterimage(afterimage.id)"
    >
      <img
        :src="cursorUrl"
        class=" h-full"
        :style="{ filter: afterimage.filter }"
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
/**
 * https://www.cursor.cc/cursor3d/120677.png
 */

import { computed, ref, watch } from 'vue';
import { nanoid } from 'nanoid';
import { remove } from 'lodash-es';
import { hslToHex } from '../common/utils';

import defaultCursor from '../assets/cursors-cyberpunk.png'

import { useMouse, watchThrottled } from '@vueuse/core';

interface Afterimage {
  id: string;
  top: string;
  left: string;
  filter: string;
}

interface Props {
  img?: string;
  size?: string;
  /** 殘影數量 */
  quantity?: number;
  /** 每次色相變化度數 */
  hueStep?: number;
}
const props = withDefaults(defineProps<Props>(), {
  img: undefined,
  size: '8rem',
  quantity: 10,
  hueStep: 10,
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

const hue = ref(100);
const afterimages = ref<Afterimage[]>([]);
watch(afterimages, (images) => {
  if (images.length > 2) return;

  hue.value = 100;
});

function createAfterimage(top: string, left: string) {
  const color = hslToHex(hue.value, 100, 80);

  hue.value += props.hueStep;

  afterimages.value.unshift({
    id: nanoid(),
    top,
    left,
    filter: `opacity(0.4) drop-shadow(0 0 0 ${color})`,
  });

  if (afterimages.value.length > props.quantity) {
    afterimages.value.pop();
  }
}
function deleteAfterimage(id: string) {
  remove(afterimages.value, { id });
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
