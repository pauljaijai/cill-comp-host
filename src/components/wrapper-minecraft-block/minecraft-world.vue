<template>
  <canvas ref="canvasRef" />
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { Camera, Color4, Engine, Mesh, MeshBuilder, UniversalCamera, Vector3 } from '@babylonjs/core';
import { BusData, eventKey } from './type';

import { useBabylonScene } from '../../composables/use-babylon-scene';
import { useElementSize, useEventBus, useWindowScroll, useWindowSize } from '@vueuse/core';

const windowScroll = reactive(useWindowScroll());

const bus = useEventBus(eventKey);

const elDataQueue: Array<
  Extract<BusData, { type: 'add' }>
> = [];
const blocks: Mesh[] = [];

bus.on((data) => {
  if (data.type === 'add') {
    elDataQueue.push(data);
    // consumeElData();

    console.log(`🚀 ~ data:`, data);
    console.log(`🚀 ~ canvasSize:`, { ...canvasSize });
  }

  if (data.type === 'update') {
    console.log(`🚀 ~ data:`, data);
  }
});

const depth = 200;
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
      new Vector3(0, 0, -1085),
      scene
    );
    // camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    return camera;
  },
  async init(param) {
    const { canvas, camera, scene } = param;

    scene.clearColor = new Color4(0, 0, 0, 0);

    const block = MeshBuilder.CreateBox('block', {
      width: 114,
      height: 74,
      depth,
      sideOrientation: Mesh.BACKSIDE,
    }, scene);

    block.position.x = 0;
    block.position.y = -115;
    block.position.z = depth / 2;

    // consumeElData();
  },
});
const canvasSize = reactive(useElementSize(canvasRef));


function consumeElData() {
  if (!scene.value) return;
  if (elDataQueue.length === 0) return;

  const elData = elDataQueue.shift();
  if (!elData) return;

  const block = MeshBuilder.CreateBox('block', {
    width: elData.width,
    height: elData.height,
    depth: 200,
    sideOrientation: Mesh.BACKSIDE,
  }, scene.value);

  // block.position.x = elData.x - windowSize.width / 2 + elData.width / 2;
  // block.position.y = elData.y - windowSize.height / 2 - elData.height;
  block.position.x = -9;
  block.position.y = 10;

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
