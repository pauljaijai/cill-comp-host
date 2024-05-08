<template>
  <div class="view relative">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full -z-10"
    />

    <slot />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';
import { ArcRotateCamera, Camera, MeshBuilder, Scalar, SolidParticleSystem, Vector3 } from '@babylonjs/core';
import { useElementBounding } from '@vueuse/core';

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
  createCamera(scene) {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      Math.max(width.value, height.value),
      new Vector3(0, 0, 0),
      scene
    );
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    return camera;
  },
  async init(param) {
    initParticles(param);

    MeshBuilder.CreateBox('', {
      width: 20,
      height: 20,
      depth: 20,
    }, param.scene);

    const box2 = MeshBuilder.CreateBox('', {
      width: 20,
      height: 20,
      depth: 20,
    }, param.scene);

    console.log('width : ', width.value);
    box2.position = new Vector3(width.value / 2, 0, 0);
  },
});
const { width, height } = useElementBounding(canvasRef);

function initParticles({ scene }: InitParam) {
  const SPS = new SolidParticleSystem("SPS", scene);
  const poly = MeshBuilder.CreatePolyhedron("p", { type: 2, size: 5 });
  SPS.addShape(poly, 120);
  poly.dispose();

  const mesh = SPS.buildMesh();

  const [x, y] = [width.value / 2, height.value / 2];

  // initiate particles function
  SPS.initParticles = () => {
    for (let p = 0; p < SPS.nbParticles; p++) {
      const particle = SPS.particles[p];
      if (!particle) return;

      particle.position.x = Scalar.RandomRange(-x, x);
      particle.position.y = Scalar.RandomRange(-y, y);
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
