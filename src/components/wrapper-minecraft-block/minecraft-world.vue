<template>
  <canvas ref="canvasRef" />
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { ref } from 'vue';
import { Color4, UniversalCamera, Vector3 } from '@babylonjs/core';

import { useBabylonScene } from '../../composables/use-babylon-scene';

const { canvasRef, engine, camera, scene } = useBabylonScene({
  createCamera(param) {
    const { scene } = param;
    const camera = new UniversalCamera(
      'camera',
      new Vector3(0, 0, 10),
      scene
    );

    return camera;
  },
  async init(param) {
    const { canvas, camera, scene } = param;

    scene.clearColor = new Color4(0, 0, 0, 0);
  },
});
// #endregion Slots
</script>

<style scoped lang="sass">
</style>
