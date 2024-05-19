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
import { animeEnterProviders, animeLeaveProviders } from './anime-provider';
import { pipe, range, map } from 'remeda';

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

    await initMeshes(scene);
    emit('init');
    initFinished.value = true;
  },
});

const meshes: Mesh[] = [];

interface MeshProviderParam extends Required<Props> {
  scene: Scene;
}
type MeshProvider = (param: MeshProviderParam) => Mesh[] | undefined;
const meshProviders: MeshProvider[] = [
  // rect
  ({ scene, type, width, height }) => {
    if (type.name !== 'rect') return;

    return type.colors.map((color, index) => {
      const material = new StandardMaterial(`material-${index}`, scene);
      material.diffuseColor = Color3.FromHexString(color);

      const mesh = MeshBuilder.CreateBox(`rect`, {
        width,
        height,
        depth: 0,
      }, scene);
      mesh.position = new Vector3(0, 0, 0);

      mesh.material = material;

      return mesh;
    });
  },
  // round
  ({ scene, type, width, height }) => {
    if (type.name !== 'round') return;

    return type.colors.map((color, index) => {
      const material = new StandardMaterial(`material-${index}`, scene);
      material.diffuseColor = Color3.FromHexString(color);

      /** 外接圓半徑 */
      const radius = Math.sqrt(
        Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
      );

      const mesh = MeshBuilder.CreateDisc(`round`, {
        radius,
        tessellation: 32,
      }, scene);
      mesh.position = new Vector3(0, 0, 0);
      mesh.rotation = new Vector3(Math.PI, 0, 0);

      mesh.material = material;

      return mesh;
    });
  },
  // fence
  ({ scene, type, width, height }) => {
    if (type.name !== 'fence') return;

    const eachWidth = width / type.colors.length;

    const xList = pipe(
      range(0, type.colors.length),
      map((i) => i * eachWidth - width / 2 + eachWidth / 2),
    );

    return type.colors.map((color, i) => {
      const material = new StandardMaterial(`material-${i}`, scene);
      material.diffuseColor = Color3.FromHexString(color);

      const mesh = MeshBuilder.CreateBox(`fence`, {
        width: eachWidth,
        height,
        depth: 0,
      }, scene);
      mesh.position = new Vector3(xList[i], 0, 0);

      mesh.material = material;

      return mesh;
    });
  },
];
async function initMeshes(scene: Scene) {
  for (const provider of meshProviders) {
    const result = provider({ scene, ...props });
    if (!result) continue;
    meshes.push(...result);
  }
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
// // 寬高發生變化時，更新 mesh
// watch(() => [props.width, props.height], ([width, height]) => {
//   if (!width || !height) return;
//   if (!scene.value) return;

//   meshes.forEach(mesh => {
//     mesh.dispose();
//   });

//   initMeshes(scene.value);
// }, { deep: true });

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
