<template>
  <canvas
    ref="canvasRef"
    class=" pointer-events-none"
  />
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { pick } from 'remeda';
import { computed, CSSProperties, Ref, ref, shallowRef, TransitionProps, watch } from 'vue';
import { ArcRotateCamera, Camera, Color3, Color4, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import anime from 'animejs';

import { useBabylonScene } from '../../composables/use-babylon-scene';

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

function enter() {
  const first = rectangleMeshes[0];
  if (!first) return;

  anime.remove(first.position);

  anime({
    targets: first.position,
    x: [props.width, 0],
    duration: 1400,
    easing: 'easeOutExpo',
  });
}

function leave() {
  const first = rectangleMeshes[0];
  if (!first) return;

  anime({
    targets: first.position,
    x: -props.width,
    duration: 1400,
    easing: 'easeInExpo',
  });
}

defineExpose({
  enter,
  leave,
});
</script>

<style scoped lang="sass">
</style>
