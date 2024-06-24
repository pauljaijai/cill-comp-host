<template>
  <div class="view relative ">
    <div
      v-if="pipeline"
      class=" pointer-events-auto text-white p-10 z-[9999] absolute w-full"
    >
      <base-input
        v-model="pipeline.depthOfField.focusDistance"
        :label="`focusDistance: ${pipeline.depthOfField.focusDistance}`"
        type="range"
        :min="0"
        :step="1"
        :max="100000"
      />

      <base-input
        v-model="pipeline.depthOfField.focalLength"
        :label="`focalLength: ${pipeline.depthOfField.focalLength}`"
        type="range"
        :min="0"
        :step="1"
        :max="5000"
      />

      <base-input
        v-model="pipeline.depthOfField.fStop"
        :label="`fStop: ${pipeline.depthOfField.fStop}`"
        type="range"
        :min="0.1"
        :step="0.1"
        :max="16"
      />
    </div>

    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full"
    />

    <slot :fps="fps" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  ArcRotateCamera, Color3, Color4,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  NoiseProceduralTexture,
  ParticleSystem, Scalar, SolidParticleSystem, StandardMaterial, Texture, Vector3
} from '@babylonjs/core';
import { forEach, map, pipe, range } from 'remeda';

import BaseInput from '../base-input.vue';

import { useIntervalFn } from '@vueuse/core';
import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const fps = ref(0);
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0);
}, 100);

const pipeline = ref<DefaultRenderingPipeline>();

const { canvasRef, engine } = useBabylonScene({
  async init(param) {
    const { scene, camera, canvas } = param;

    if (camera instanceof ArcRotateCamera) {
      const rect = canvas.getBoundingClientRect();
      // camera.radius = Math.max(rect.width, rect.height);
      camera.radius = 50;
      // camera.attachControl(canvas, true);
    }

    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0);

    // 調整預設光源
    const defaultLight = scene.lights[0];
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1;
      defaultLight.direction = new Vector3(0.5, 1, 0);
    }

    // pipeline.value = initRenderingPipeline(param);
    initParticles(param);
  },
});

function initRenderingPipeline(
  { scene, canvas, camera }: InitParam
) {
  const rect = canvas.getBoundingClientRect();

  const pipeline = new DefaultRenderingPipeline(
    'defaultPipeline',
    true,
    scene,
    [camera]
  );

  // 單位是毫米，所以要乘以 1000
  const focusDistance = 5000;

  pipeline.depthOfFieldEnabled = true;
  pipeline.depthOfField.focusDistance = focusDistance
  /** 相機焦距 */
  pipeline.depthOfField.focalLength = 80;
  /** 光圈 */
  pipeline.depthOfField.fStop = 0.5;
  pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Low;

  return pipeline;
}

function initParticles(
  { scene, camera }: InitParam
) {
  if (!(camera instanceof ArcRotateCamera)) return

  const box = MeshBuilder.CreateBox('box', {});

  let index = 0;

  // 分布範圍尺寸
  const size = camera.radius * 1.5;
  const instanceCount = 1000;

  const matricesData = new Float32Array(16 * instanceCount);

  for (let i = 0; i < instanceCount; i++) {
    // 使用 Matrix.Translation 來生成新的變換矩陣
    const translationMatrix = Matrix.Translation(
      Math.random() * size - size / 2,
      Math.random() * size - size / 2,
      Math.random() * size - size / 2
    );

    translationMatrix.copyToArray(matricesData, index * 16);

    index++;
  }

  box.thinInstanceSetBuffer('matrix', matricesData, 16);

  const material = new StandardMaterial('material');
  material.diffuseColor = Color3.FromHexString('#ff756e');
  material.emissiveColor = Color3.FromHexString('#ff7842');

  box.material = material;

  // 定義動畫
  scene.registerBeforeRender(() => {
    const time = performance.now() * 0.001; // 取得當前時間（秒）
    for (let i = 0; i < instanceCount; i++) {
      const offset = i * 16;

      // 獲取原始位置
      const originalX = matricesData[offset + 12] ?? 0;
      const originalY = matricesData[offset + 13] ?? 0;
      const originalZ = matricesData[offset + 14] ?? 0;

      // 計算新的 Y 位置
      let newY = originalY - 0.02;

      // 計算新的 X 和 Z 位置，讓其左右擺動
      const newX = originalX + 0.005 * Math.sin(time + i * 0.01) + 0.005;
      const newZ = originalZ + 0.005 * Math.cos(time + i * 0.01) + 0.005;

      // 如果 Y 位置小於 -size / 2，則將其移動到最上方
      if (newY < -size / 2) {
        newY = size / 2;
      }

      // 創建旋轉矩陣
      const rotationMatrix = Matrix.RotationYawPitchRoll(
        time * 0.5 + i * 0.01,
        time * 0.5 + i * 0.01,
        time * 0.5 + i * 0.01
      );

      // 創建平移矩陣
      const translationMatrix = Matrix.Translation(newX, newY, newZ);

      // 合併旋轉和平移矩陣
      const finalMatrix = rotationMatrix.multiply(translationMatrix);

      // 更新矩陣數據
      finalMatrix.copyToArray(matricesData, offset);
    }

    // 更新實例矩陣
    box.thinInstanceSetBuffer('matrix', matricesData, 16);
  });
}
</script>

<style scoped lang="sass">
</style>
