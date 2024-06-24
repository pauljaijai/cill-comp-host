<template>
  <div class="view relative pointer-events-none">
    <!-- <div
      v-if="pipeline"
      class=" pointer-events-auto text-white"
    >
      <base-input
        v-model="pipeline.depthOfField.focusDistance"
        :label="`focusDistance: ${pipeline.depthOfField.focusDistance}`"
        type="range"
        :min="0"
        :step="0.1"
        :max="1000000"
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
  NoiseProceduralTexture,
  ParticleSystem, Texture, Vector3
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
      camera.radius = Math.min(rect.width, rect.height);
    }

    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0);

    // 調整預設光源
    const defaultLight = scene.lights[0];
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1;
      defaultLight.direction = new Vector3(0.5, 1, 0);

      defaultLight.diffuse = new Color3(1, 1, 1);
      defaultLight.groundColor = new Color3(1, 1, 1);
    }
  },
});
</script>

<style scoped lang="sass">
</style>
