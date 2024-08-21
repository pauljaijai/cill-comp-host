<template>
  <canvas
    ref="canvasRef"
    class=" opacity-80"
  />
</template>

<script setup lang="ts">
import { computed, reactive, watch, watchEffect } from 'vue';
import { Color4, Engine, Mesh, MeshBuilder, UniversalCamera, Vector3 } from '@babylonjs/core';
import { BusData, eventKey } from './type';

import { useBabylonScene } from '../../composables/use-babylon-scene';
import { useEventBus, useWindowScroll, useWindowSize } from '@vueuse/core';

const windowScroll = reactive(useWindowScroll());
const windowSize = reactive(useWindowSize({ includeScrollbar: false }));

const bus = useEventBus(eventKey);

const elDataQueue: Array<
  Extract<BusData, { type: 'add' }>
> = [];
const blocks: Mesh[] = [];

bus.on((data) => {
  if (data.type === 'add') {
    elDataQueue.push(data);
    consumeElData();
  }

  if (data.type === 'update') {
    // console.log(`🚀 ~ data:`, data);
  }
});

/** 相機到 XY 平面距離 */
const cameraDistance = 2000;
const { canvasRef, engine, camera, scene } = useBabylonScene({
  async createEngine({ canvas }) {
    return new Engine(canvas, true, {
      alpha: true,
    });
  },
  createCamera(param) {
    const { scene, canvas } = param;
    const camera = new UniversalCamera(
      'camera',
      new Vector3(0, 0, -cameraDistance),
      scene
    );
    // camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    return camera;
  },
  async init(param) {
    const { canvas, camera, scene } = param;

    scene.clearColor = new Color4(0, 0, 0, 0);

    consumeElData();
  },
});

const fov = computed(() => {
  const distance = Math.abs(camera.value?.position.z ?? 1000);
  const hypotenuse = Math.sqrt((windowSize.height / 2) ** 2 + distance ** 2);

  const cosine = distance / hypotenuse;
  const halfAngle = Math.acos(cosine);

  return halfAngle * 2;
});
watchEffect(() => {
  if (!camera.value) return;
  camera.value.fov = fov.value;
});

function consumeElData() {
  if (!scene.value) return;
  if (elDataQueue.length === 0) return;

  const elData = elDataQueue.shift();
  if (!elData) return;

  const depth = Math.max(elData.width, elData.height);

  const block = MeshBuilder.CreateBox('block', {
    width: elData.width,
    height: elData.height,
    depth,
    sideOrientation: Mesh.BACKSIDE,
  }, scene.value);

  console.log(`🚀 ~ elData:`, elData);
  console.log(`🚀 ~ canvasSize:`, { ...windowSize });

  block.position.x = elData.x + elData.width / 2 - windowSize.width / 2;
  block.position.y = -elData.y - elData.height / 2 + windowSize.height / 2;
  block.position.z = depth / 2;

  blocks.push(block);

  consumeElData();
}

watch(windowScroll, ({ x, y }) => {
  if (camera.value instanceof UniversalCamera) {
    camera.value.position.x = x;
    camera.value.position.y = -y;
  }
});


// #endregion Slots
</script>

<style scoped lang="sass">
</style>
