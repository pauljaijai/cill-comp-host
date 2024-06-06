<template>
  <div class="view relative pointer-events-none">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full"
    />

    <slot :fps="fps" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useBabylonScene } from '../../composables/use-babylon-scene';
import { ArcRotateCamera, Color3, Color4, Effect, GPUParticleSystem, HemisphericLight, Scene, Texture, Vector3 } from '@babylonjs/core';
import { useIntervalFn } from '@vueuse/core';

// #region Props
interface Props {
  quantity?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  quantity: 5000,
});

// #region Slots
defineSlots<{
  default?: (data: { fps: number }) => unknown;
}>();
// #endregion Slots

const fps = ref(0);
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0);
}, 100);

const { canvasRef, engine } = useBabylonScene({
  createCamera(scene) {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      20,
      new Vector3(0, 0, 0),
      scene
    );

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

    await initParticleSystem(scene);
  },
});

async function initParticleSystem(scene: Scene) {
  const particleSystem = new GPUParticleSystem(
    'fireflies',
    { capacity: props.quantity },
    scene
  );

  particleSystem.particleTexture = new Texture('/textures/flare.png');
  particleSystem.emitter = Vector3.Zero();

  particleSystem.minSize = 0.5;
  particleSystem.maxSize = 1;

  particleSystem.maxLifeTime = 10;
  particleSystem.minLifeTime = 10;

  particleSystem.createBoxEmitter(
    new Vector3(5, 5, 5), new Vector3(-5, 1, -5),
    new Vector3(10, -10, 0), new Vector3(-10, -10, 0)
  );

  particleSystem.start();
}

// #region Methods
defineExpose({
  /** 目前畫面 FPS */
  fps,
});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
