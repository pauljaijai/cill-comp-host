<template>
  <div class="view relative pointer-events-none">
    <!-- <div
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
    </div> -->

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
  StandardMaterial, Vector3
} from '@babylonjs/core';

import BaseInput from '../base-input.vue';

import { useIntervalFn } from '@vueuse/core';
import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';

// #region Props
interface Props {
  /** 粒子顏色。包含 # 之 HEX 格式 */
  diffuseColor?: string;
  /** 陰影顏色。包含 # 之 HEX 格式 */
  groundColor?: string;
  /** 粒子移動速度。
   * - 正 x：往左
   * - 正 y：往上
   * - 正 z：射出螢幕方向
   */
  velocity?: Record<'x' | 'y' | 'z', number>;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  diffuseColor: '#ffbace',
  groundColor: '#ffdcbd',
  velocity: () => ({
    x: 0.01,
    y: -0.02,
    z: 0.01,
  })
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

      defaultLight.diffuse = Color3.White();
      defaultLight.groundColor = Color3.FromHexString(props.groundColor);
    }

    pipeline.value = initRenderingPipeline(param);
    initParticles(param);
  },
});

function initRenderingPipeline(
  { scene, camera }: InitParam
) {
  const pipeline = new DefaultRenderingPipeline(
    'defaultPipeline',
    false,
    scene,
    [camera]
  );

  pipeline.depthOfFieldEnabled = true;
  pipeline.depthOfField.focusDistance = 37000
  pipeline.depthOfField.focalLength = 5000;
  pipeline.depthOfField.fStop = 8;
  pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Medium;

  pipeline.bloomEnabled = true;

  return pipeline;
}

function initParticles(
  { scene, camera }: InitParam
) {
  if (!(camera instanceof ArcRotateCamera)) return

  const box = MeshBuilder.CreateBox('box', {
    width: 0.5,
    depth: 0.1
  });

  let index = 0;

  // 分布範圍尺寸
  const size = camera.radius * 1.5;
  const instanceCount = 500;

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
  material.diffuseColor = Color3.FromHexString(props.diffuseColor);

  box.material = material;

  const velocity = props.velocity;
  // 定義動畫
  scene.registerBeforeRender(() => {
    // 以時間為基礎，弭平不同裝置 fps 差異
    const time = performance.now() * 0.001;
    for (let i = 0; i < instanceCount; i++) {
      const offset = i * 16;

      const originalX = matricesData[offset + 12] ?? 0;
      const originalY = matricesData[offset + 13] ?? 0;
      const originalZ = matricesData[offset + 14] ?? 0;

      // 計算新的 Y 位置
      let y = originalY + velocity.y;

      // 計算新的 X、Z 位置，加入一點擾動
      let x = originalX + 0.005 * Math.sin(time + i * 0.01) + velocity.x;
      let z = originalZ + 0.005 * Math.cos(time + i * 0.01) + velocity.z;

      // 如果 Y 位置小於 -size / 2，則將其移動到最上方
      if (y < -size / 2) {
        y = size / 2;
        x = Math.random() * size - size / 2;
        z = Math.random() * size - size / 2;
      }

      // 建立旋轉矩陣
      const angle = time * 0.5 + i * 0.1;
      const rotationMatrix = Matrix.RotationYawPitchRoll(
        angle, angle, angle
      );

      // 建立平移矩陣
      const translationMatrix = Matrix.Translation(x, y, z);

      // 合併旋轉和平移矩陣
      const finalMatrix = rotationMatrix.multiply(translationMatrix);

      // 更新矩陣
      finalMatrix.copyToArray(matricesData, offset);
    }

    // 更新實例矩陣
    box.thinInstanceSetBuffer('matrix', matricesData, 16);
  });
}
</script>

<style scoped lang="sass">
</style>
