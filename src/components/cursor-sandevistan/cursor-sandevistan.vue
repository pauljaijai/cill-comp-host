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
import { nanoid } from 'nanoid';
import { remove } from 'lodash-es';
import { hslToHex } from '../../common/utils';

import defaultCursor from '../../assets/cursors-cyberpunk.png'

import { useMouse, useElementBounding, watchThrottled } from '@vueuse/core';

interface Props {
  img?: string;
  size?: number;
  /** 殘影數量 */
  quantity?: number;
  /** 每次色相變化度數 */
  hueStep?: number;
  zIndex?: number;
  /** 殘影存活時間 */
  survivalMillisecond?: number;
  intervalMillisecond?: number,
}
const props = withDefaults(defineProps<Props>(), {
  img: undefined,
  size: 130,
  quantity: 100,
  hueStep: 10,
  zIndex: 99999,
  survivalMillisecond: 1000,
  intervalMillisecond: 50,
});


const view = ref<HTMLCanvasElement>();
const mouse = useMouse();
const canvasBounding = useElementBounding(view);

const imgUrl = computed(() => props.img ? props.img : defaultCursor);

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


const cursor = ref<Sprite>();
function createCursor(app: Application) {
  const sprite = Sprite.from(imgUrl.value);
  sprite.width = props.size;
  sprite.height = props.size;

  app.stage.addChild(sprite);
  return sprite;
}
watch(() => mouse, ({ x, y }) => {
  if (!cursor.value) return;

  cursor.value.position.set(x.value, y.value);
}, { deep: true });

const hue = ref(160);
const afterimages = ref<Sprite[]>([]);
function createAfterimage(app: Application, x: number, y: number) {
  const sprite = createCursor(app);

  sprite.name = nanoid();
  sprite.tint = parseInt(hslToHex(hue.value, 100, 80), 16);
  sprite.position.set(x, y);

  hue.value = (hue.value + props.hueStep) % 360;

  app.stage.addChildAt(sprite, 0);

  setTimeout(() => {
    sprite.destroy();
  }, props.survivalMillisecond);

  return sprite;
}
watchThrottled(() => mouse, ({ x, y }) => {
  if (!app.value) return;

  const afterimage = createAfterimage(app.value, x.value, y.value);
  afterimages.value.unshift(afterimage);

  if (afterimages.value.length < props.quantity) return;

  const target = afterimages.value.pop();
  if (!target) return;

  const child = app.value.stage.getChildByName(target.name);
  app.value.stage.removeChild(child);

}, { throttle: props.intervalMillisecond, deep: true });


onMounted(() => {
  if (!view.value) return;

  app.value = createApplication(view.value);
  cursor.value = createCursor(app.value);
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
