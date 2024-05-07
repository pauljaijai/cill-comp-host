<template>
  <div class="view relative">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full"
    />

    <slot />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';
import { MeshBuilder, Scalar, SolidParticleSystem } from '@babylonjs/core';

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

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

const { canvasRef } = useBabylonScene({
  async init(param) {
    initParticles(param);
  },
});

function initParticles({ scene }: InitParam) {
  const SPS = new SolidParticleSystem("SPS", scene);
  const sphere = MeshBuilder.CreateSphere("s", {});
  const poly = MeshBuilder.CreatePolyhedron("p", { type: 2 });
  SPS.addShape(sphere, 20);
  SPS.addShape(poly, 120);
  SPS.addShape(sphere, 80);
  sphere.dispose();
  poly.dispose();

  const mesh = SPS.buildMesh();

  // initiate particles function
  SPS.initParticles = () => {
    for (let p = 0; p < SPS.nbParticles; p++) {
      const particle = SPS.particles[p];
      if (!particle) return;

      particle.position.x = Scalar.RandomRange(-50, 50);
      particle.position.y = Scalar.RandomRange(-50, 50);
      particle.position.z = Scalar.RandomRange(-50, 50);
    }
  };

  //Update SPS mesh
  SPS.initParticles();
  SPS.setParticles();
}

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
