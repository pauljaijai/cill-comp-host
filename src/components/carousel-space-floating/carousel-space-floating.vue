<template>
  <div class=" relative overflow-hidden">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full"
    />

    <div class=" absolute left-0 top-0 p-4 text-white">
      {{ fps }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import {
  ArcRotateCamera,
  Color3,
  Color4,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  DynamicTexture, Matrix, Mesh, MeshBuilder,
  Particle,
  ParticleSystem,
  StandardMaterial, Texture, Vector3
} from '@babylonjs/core';
import { pipe } from 'remeda';

import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';
import { useIntervalFn } from '@vueuse/core';

import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';


// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

const fps = ref(0);
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0);
}, 100);


const { canvasRef, engine } = useBabylonScene({
  async init(param) {
    const { canvas, scene } = param;
  },
});


</script>

<style scoped lang="sass">
</style>
