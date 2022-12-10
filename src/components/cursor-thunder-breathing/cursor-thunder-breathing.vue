<template>
  <canvas
    ref="view"
    class="view"
  />
</template>

<script setup lang="ts">
/**
 * https://www.cursor.cc/cursor3d/120677.png
 */

import { Application, Sprite } from 'pixi.js';
import { computed, onMounted, ref, watch } from 'vue';

import defaultCursor from '../../assets/cursors-cyberpunk.png'

import { useMouse, useElementBounding, useWindowScroll } from '@vueuse/core';

interface Position {
  x: number;
  y: number;
}

interface Props {
  /** 滑鼠移動 */
  triggerDistance?: number,
  zIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {
  triggerDistance: 50,
  zIndex: 99999,
});


const view = ref<HTMLCanvasElement>();
const canvasBounding = useElementBounding(view);
const { x: mouseX, y: mouseY } = useMouse();
const { x: scrollX, y: scrollY } = useWindowScroll();

const mouse = computed(() => {
  const x = mouseX.value - scrollX.value;
  const y = mouseY.value - scrollY.value;

  return {
    x, y
  }
});

const app = ref<Application>();
function createApplication(el: HTMLCanvasElement) {
  const app = new Application({
    view: el,
    backgroundAlpha: 0,
    width: canvasBounding.width.value,
    height: canvasBounding.height.value,
    resizeTo: view.value,
  });

  return app;
}

watch(mouse, (pPos, nPos) => {
  if (!app.value) return;

  const distance = getDistance(pPos, nPos);
  console.log("🚀 ~ file: cursor-thunder-breathing.vue:67 ~ watch ~ distance", distance)
});

function getDistance(start: Position, end: Position) {
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);

  return Math.sqrt(dx ** 2 + dy ** 2);
}


onMounted(() => {
  if (!view.value) return;

  app.value = createApplication(view.value);
});

</script>

<style scoped lang="sass">
.view
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  pointer-events: none
  z-index: v-bind('props.zIndex')
</style>
