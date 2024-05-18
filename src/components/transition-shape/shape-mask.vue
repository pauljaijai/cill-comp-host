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
import { computed, ref, watch } from 'vue';
import { until } from '@vueuse/core';
import { TransitionType } from './type';

import { useBabylonScene } from '../../composables/use-babylon-scene';
import { animeEnterProviders, animeLeaveProviders } from './anime-provider';



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

    await initMeshes(scene);
    emit('init');
    initFinished.value = true;
  },
});

const meshes: Mesh[] = [];
async function initMeshes(scene: Scene) {
  const type = props.type;
  if (type.name !== 'rect') return;

  type.colors.forEach((color, index) => {
    const material = new StandardMaterial(`material-${index}`, scene);
    material.diffuseColor = Color3.FromHexString(color);

    const mesh = MeshBuilder.CreateBox(`rect`, {
      width: props.width,
      height: props.height,
      depth: 0,
    }, scene);
    mesh.position = new Vector3(0, 0, 0);

    mesh.material = material;

    meshes.push(mesh);
  });
}
// 顏色變化時，更新材質
watch(() => props.type.colors, (colors) => {
  if (meshes.length === 0) return;
  colors.forEach((color, index) => {
    const mesh = meshes[index];
    if (!mesh || !mesh.material) return;
    if (!(mesh.material instanceof StandardMaterial)) {
      return;
    }

    mesh.material.diffuseColor = Color3.FromHexString(color);
  });
}, { deep: true });

const isEntering = ref(false);
async function enter(el: Element) {
  if (isEntering.value) {
    return until(isEntering).toBe(false);
  }

  const rect = el.getBoundingClientRect();

  isEntering.value = true;

  for (const provider of animeEnterProviders) {
    const result = provider({
      rect, type: props.type, meshes: meshes,
    });
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

  for (const provider of animeLeaveProviders) {
    const result = provider({
      rect, type: props.type, meshes: meshes,
    });
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
