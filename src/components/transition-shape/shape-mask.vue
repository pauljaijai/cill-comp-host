<template>
  <canvas
    ref="canvasRef"
    class=" pointer-events-none"
  />
</template>

<script setup lang="ts">
import {
  ArcRotateCamera, Camera,
  Color3, Color4
  , HemisphericLight, Mesh, MeshBuilder,
  Scene, StandardMaterial, Vector3
} from '@babylonjs/core';
import anime from 'animejs';

import { useBabylonScene } from '../../composables/use-babylon-scene';
import { ref } from 'vue';
import { until } from '@vueuse/core';

// #region Props
interface Props {
  width?: number;
  height?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
});

// #region Emits
const emit = defineEmits<{
  (e: 'init'): void;
  (e: 'run'): void;
  (e: 'back'): void;
}>();
// #endregion Emits

const initFinished = ref(false);
const { canvasRef } = useBabylonScene({
  createCamera(scene) {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      Math.max(props.width, props.height),
      new Vector3(0, 0, 0),
      scene
    );
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    return camera;
  },
  async init(param) {
    const { scene } = param;
    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0);

    // 調整預設光源
    const defaultLight = scene.lights.at(-1);
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1;
      defaultLight.direction = new Vector3(0.5, 1, 0);

      defaultLight.diffuse = new Color3(1, 1, 1);
      defaultLight.groundColor = new Color3(1, 1, 1);
    }

    await initRectangleMeshes(scene);
    emit('init');
    initFinished.value = true;
  },
});


const rectangleMeshes: Mesh[] = [];
async function initRectangleMeshes(scene: Scene) {
  const rectangle = MeshBuilder.CreatePlane('rectangle', {
    width: props.width,
    height: props.height,
  }, scene);
  rectangle.rotation = new Vector3(0, Math.PI, 0);
  rectangle.position = new Vector3(props.width, 0, 0);

  const material = new StandardMaterial('material');
  material.diffuseColor = new Color3(1, 0, 0);

  rectangle.material = material;

  rectangleMeshes.push(rectangle);
}

async function enter(el: Element) {
  const first = rectangleMeshes[0];
  if (!first) return;

  const rect = el.getBoundingClientRect();

  return anime({
    targets: first.position,
    x: [rect.width, 0],
    duration: 1000,
    easing: 'easeInOutExpo',
  }).finished;
}

async function leave(el: Element) {
  const first = rectangleMeshes[0];
  if (!first) return;

  const rect = el.getBoundingClientRect();

  return anime({
    targets: first.position,
    x: -rect.width,
    duration: 1000,
    easing: 'easeInOutExpo',
  }).finished;
}

defineExpose({
  async initFinished() {
    await until(initFinished).toBe(true);
  },
  enter,
  leave,
});
</script>

<style scoped lang="sass">
</style>
