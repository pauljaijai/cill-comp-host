<template>
  <canvas
    ref="canvasRef"
    class="shape-mask pointer-events-none"
  />
</template>

<script setup lang="ts">
import {
  ArcRotateCamera, Camera,
  Color3, Color4, HemisphericLight, Mesh, MeshBuilder,
  Scene, StandardMaterial, Vector3
} from '@babylonjs/core';
import anime from 'animejs';
import { computed, ref } from 'vue';
import { until } from '@vueuse/core';
import { TransitionType } from './type';

import { useBabylonScene } from '../../composables/use-babylon-scene';



// #region Props
interface Props {
  type: TransitionType;
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
  const type = props.type;
  if (type.shape !== 'rect') {
    return;
  }

  type.colors.forEach((color, index) => {
    const material = new StandardMaterial(`material-${index}`, scene);
    material.diffuseColor = Color3.FromHexString(color);

    const mesh = MeshBuilder.CreatePlane(`rect-${index}`, {
      width: props.width,
      height: props.height,
    }, scene);
    mesh.rotation = new Vector3(0, Math.PI, 0);
    mesh.position = new Vector3(props.width, 0, 0);

    mesh.material = material;

    rectangleMeshes.push(mesh);
  });
}

type AnimeProvider = (rect: DOMRect) => Promise<void>[] | undefined;
/** 進入動畫 */
const animeInProviders: AnimeProvider[] = [
  (rect) => {
    if (props.type.shape !== 'rect') return;

    return rectangleMeshes.map((mesh, index) => {
      return anime({
        targets: mesh.position,
        x: [rect.width, 0],
        duration: 1000,
        easing: 'easeInOutExpo',
        delay: 100 * index,
      }).finished;
    })
  },
];
/** 進入動畫 */
const animeOutProviders: AnimeProvider[] = [
  (rect) => {
    if (props.type.shape !== 'rect') return;

    return rectangleMeshes.map((mesh, index) => {
      return anime({
        targets: mesh.position,
        x: -rect.width,
        duration: 1000,
        easing: 'easeInOutExpo',
        delay: 100 * (2 - index),
      }).finished;
    })
  },
];

const isEntering = ref(false);
async function enter(el: Element) {
  if (isEntering.value) {
    return until(isEntering).toBe(false);
  }

  const rect = el.getBoundingClientRect();

  isEntering.value = true;

  for (const provider of animeInProviders) {
    const result = provider(rect);
    if (!result) continue;
    await Promise.all(result);
    break;
  }

  isEntering.value = false;
}

const isLeaving = ref(false);
async function leave(el: Element) {
  if (isLeaving.value) {
    return until(isLeaving).toBe(false);
  }

  const rect = el.getBoundingClientRect();
  isLeaving.value = true;

  for (const provider of animeOutProviders) {
    const result = provider(rect);
    if (!result) continue;
    await Promise.all(result);
    break;
  }

  isLeaving.value = false;
}

const isTransition = computed(
  () => isEntering.value || isLeaving.value
);

defineExpose({
  async initFinished() {
    await until(initFinished).toBe(true);
  },
  isTransition,
  enter,
  leave,
});
</script>

<style scoped lang="sass">
.shape-mask
  transition-duration: width 0.1s, height 0.1s !important
</style>
