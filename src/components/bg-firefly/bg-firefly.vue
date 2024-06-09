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

import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';
import {
  ArcRotateCamera, Color3, Color4,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  HemisphericLight,
  LensRenderingPipeline,
  ParticleSystem, Texture, Vector3
} from '@babylonjs/core';
import { useIntervalFn } from '@vueuse/core';
import { forEach, map, pipe, range } from 'remeda';

// #region Props
type Size = number | Record<'max' | 'min', number>;
type CanvasSize = Record<'width' | 'height', number>;
/** string 請使用包含 # 之 HEX 格式 */
type Color = Record<'r' | 'g' | 'b', number> | string;

interface Props {
  /** 粒子容量。同時存活的最大粒子數量 */
  capacity?: number;
  /** 每一幀最大發射數量 */
  emitRate?: number;
  /** 如果設定兩種顏色，則會隨機取兩色之間的顏色 */
  color?: Color | [Color, Color];
  /** 可以依 canvas 尺寸設定粒子尺寸 */
  size?: Size | ((canvasSize: CanvasSize) => Size)
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  capacity: 5000,
  emitRate: 100,
  color: () => ['#5af522', '#abf522'],
  size: () => ({ min: 4, max: 10 })
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
  createCamera({ scene, canvas }) {
    const rect = canvas.getBoundingClientRect();

    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      Math.min(rect.width, rect.height),
      new Vector3(0, 0, 0),
      scene
    );

    return camera;
  },
  async init(param) {
    const { scene, camera } = param;
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

    const pipeline = new DefaultRenderingPipeline(
      'defaultPipeline',
      true,
      scene,
      [camera]
    );
    pipeline.depthOfFieldEnabled = true;
    pipeline.depthOfField.focusDistance = 800;
    pipeline.depthOfField.focalLength = 30;
    pipeline.depthOfField.fStop = 8;
    pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Low;

    await initParticleSystem(param);
  },
});

async function initParticleSystem({ scene, canvas }: InitParam) {
  const rect = canvas.getBoundingClientRect();
  const { width, height } = rect;

  // const particleSystem = new GPUParticleSystem(
  //   'fireflies',
  //   { capacity: props.quantity, randomTextureSize: 4096 },
  //   scene
  // );

  const particleSystem = new ParticleSystem(
    'fireflies',
    props.capacity,
    scene
  );

  particleSystem.particleTexture = new Texture('/textures/flare.png');
  particleSystem.emitter = new Vector3(0, -height / 2, 0);
  particleSystem.emitRate = props.emitRate;

  // 設定尺寸
  pipe(
    props.size,
    (sizeParam) => {
      if (typeof sizeParam === 'function') {
        return sizeParam({ width, height });
      }

      return sizeParam;
    },
    (size) => {
      if (typeof size === 'number') {
        particleSystem.minSize = size;
        particleSystem.maxSize = size;
        return;
      }

      particleSystem.minSize = size.min;
      particleSystem.maxSize = size.max;
    }
  )

  particleSystem.maxLifeTime = 20;
  particleSystem.minLifeTime = 10;

  const maxSpeed = height / 10;
  const x = width / 2;
  particleSystem.createBoxEmitter(
    new Vector3(maxSpeed, maxSpeed / 2, maxSpeed), new Vector3(-maxSpeed, 0, -maxSpeed),
    new Vector3(x, 0, 0), new Vector3(-x, 0, 0)
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

  const [color1, color2] = pipe(
    props.color,
    (colorValue) => {
      if (Array.isArray(colorValue)) {
        return colorValue;
      }
      return [colorValue] as const;
    },
    map.strict((value) => {
      if (typeof value === 'string') {
        return Color3.FromHexString(value).toColor4()
      }

      const { r, g, b } = value;
      return new Color4(r, g, b, 1);
    }),
  );

  // 閃爍效果
  const blinkMaxStep = 50;
  const hideColor = new Color4();
  pipe(
    range(0, blinkMaxStep),
    forEach.indexed((value, i) => {
      const gradient = value / blinkMaxStep;
      if (i % 4) {
        particleSystem.addColorGradient(gradient, color1, color2);
        return;
      }

      particleSystem.addColorGradient(gradient, hideColor);
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
