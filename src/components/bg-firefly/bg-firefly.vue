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
import {
  ArcRotateCamera, Color3, Color4, Effect,
  GPUParticleSystem, HemisphericLight,
  ParticleSystem, Scene, Texture, Vector3
} from '@babylonjs/core';
import { useIntervalFn } from '@vueuse/core';
import { forEach, pipe, range } from 'remeda';

// #region Props
interface Props {
  quantity?: number;
  /** 每一幀最大發射數量 */
  emitRate?: number;
  color?: Record<'r' | 'g' | 'b', number> | string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  quantity: 5000,
  emitRate: 100,
  color: () => ({ r: 0.5, g: 1, b: 0.2 })
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
  createCamera({ scene }) {
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
  // const particleSystem = new GPUParticleSystem(
  //   'fireflies',
  //   { capacity: props.quantity, randomTextureSize: 4096 },
  //   scene
  // );

  const particleSystem = new ParticleSystem(
    'fireflies',
    props.quantity,
    scene
  );

  particleSystem.particleTexture = new Texture('/textures/flare.png');
  particleSystem.emitter = new Vector3(0, -10, 0);
  particleSystem.emitRate = props.emitRate;

  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.4;

  particleSystem.maxLifeTime = 20;
  particleSystem.minLifeTime = 10;

  particleSystem.createBoxEmitter(
    new Vector3(2, 3, 4), new Vector3(-1, 0, -4),
    new Vector3(10, 0, 0), new Vector3(-10, 0, 0)
  );

  // 阻力
  const dragMaxStep = 50;
  pipe(
    range(0, dragMaxStep),
    forEach.indexed((value, i) => {
      const gradient = value / dragMaxStep;
      const factor = Math.sin(i / 3) * 0.5;

      particleSystem.addDragGradient(gradient, factor);
    }),
  );

  const color = pipe(
    props.color,
    (value) => {
      if (typeof value === 'string') {
        return Color3.FromHexString(value).toColor4()
      }

      const { r, g, b } = value;
      return new Color4(r, g, b, 1);
    },
  );

  // 閃爍效果
  const blinkMaxStep = 50;
  const hideColor = new Color4();
  pipe(
    range(0, blinkMaxStep),
    forEach.indexed((value, i) => {
      const gradient = value / blinkMaxStep;
      const color1 = i % 4 ? color : hideColor;

      particleSystem.addColorGradient(gradient, color1);
    }),
  );
  particleSystem.addColorGradient(1, hideColor);

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
