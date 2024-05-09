<template>
  <div class="view relative">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full -z-10"
    />

    <slot />

    <div class=" absolute top-0 left-0 p-4">
      {{ engine?.getFps() }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, ref, shallowRef, toRefs } from 'vue';
import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';
import {
  ArcRotateCamera, Camera,
  Color3, Color4
  , HemisphericLight, MeshBuilder, Scalar,
  Scene, SolidParticle, SolidParticleSystem, Vector3
} from '@babylonjs/core';
import { useElementBounding } from '@vueuse/core';
import { pipe } from 'remeda';

// #region Props
interface Props {
  /** 紙屑參數 */
  confetti?: {
    width: number;
    height: number;
  };

  /** 每次發射數量
   * 
   * @default 10
   */
  quantityOfPerEmit?: number;
  /** 最大粒子數量。
   * 
   * @default 100
   */
  maxQuantity?: number;

  /** 最大角速度
   * 
   * @default 1.5
   */
  maxAngularVelocity?: number;
  /** 重力
   * 
   * @default -0.01
   */
  gravity?: number;
  /** 空氣阻力
   * 
   * @default 0.01
   */
  airResistance?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  confetti: () => ({
    width: 10,
    height: 15,
  }),
  quantityOfPerEmit: 10,
  maxQuantity: 100,
  maxAngularVelocity: Math.PI / 20,
  gravity: -0.05,
  airResistance: 0.01,
});

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

const {
  confetti, maxAngularVelocity,
  gravity,
} = toRefs(props);

const particleSystem = shallowRef<SolidParticleSystem>();
const {
  canvasRef,
  engine,
} = useBabylonScene({
  createScene(engine) {
    const scene = new Scene(engine);
    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0);

    /** 使用預設光源 */
    scene.createDefaultLight();
    const defaultLight = scene.lights.at(-1);

    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1;
      defaultLight.direction = new Vector3(0.5, 1, 0);

      defaultLight.diffuse = new Color3(1, 0.8, 0.8);
      defaultLight.groundColor = new Color3(0.8, 0.8, 0.8);
    }

    return scene;
  },
  createCamera(scene) {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      Math.max(elWidth.value, elHeight.value),
      new Vector3(0, 0, 0),
      scene
    );
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    return camera;
  },
  async init(param) {
    particleSystem.value = initParticles(param);
  },
});

const { width: elWidth, height: elHeight } = useElementBounding(canvasRef);
/** 畫布邊界 */
const canvasBoundary = computed(() => {
  const { width, height } = confetti.value;

  return {
    left: -elWidth.value / 2 - Math.max(width, height),
    right: elWidth.value / 2 + Math.max(width, height),
    bottom: -elHeight.value / 2 - Math.max(width, height),
  }
});

function initParticles({ scene }: InitParam) {
  const { width, height } = confetti.value;

  const spSystem = new SolidParticleSystem('SPS', scene);
  const box = MeshBuilder.CreateBox('box', { width, height, depth: 1 });
  spSystem.addShape(box, props.maxQuantity);
  box.dispose();

  const mesh = spSystem.buildMesh();

  spSystem.initParticles = () => {
    particleSystem.value?.particles.forEach((particle) => {
      particle.color = new Color4(
        Scalar.RandomRange(0.5, 1),
        Scalar.RandomRange(0.5, 1),
        Scalar.RandomRange(0.5, 1),
        1
      );

      initParticle(particle);

      particle.position.y = canvasBoundary.value.bottom;
    });
  };

  spSystem.initParticles();
  spSystem.setParticles();

  spSystem.updateParticle = (particle) => {
    if (particle.position.y < canvasBoundary.value.bottom
      || particle.position.x < canvasBoundary.value.left
      || particle.position.x > canvasBoundary.value.right
    ) return particle;

    particle.velocity.y += gravity.value;
    particle.position.addInPlace(particle.velocity);

    if (particle?.props?.rotationVelocity) {
      particle.rotation.addInPlace(
        particle.props.rotationVelocity
      );
    }

    return particle;
  }

  /** 播放動畫 */
  scene.onAfterRenderObservable.add(() => {
    spSystem.setParticles();
  })

  return spSystem;
}
function initParticle(particle: SolidParticle) {
  particle.velocity = new Vector3(
    Scalar.RandomRange(-5, 5),
    Scalar.RandomRange(-10, 10),
    0
  );

  particle.rotation = new Vector3(
    Scalar.RandomRange(0, 2 * Math.PI),
    Scalar.RandomRange(0, 2 * Math.PI),
    Scalar.RandomRange(0, 2 * Math.PI),
  );

  const minAngularVelocity = maxAngularVelocity.value * 0.6;
  particle.props = {
    rotationVelocity: new Vector3(
      Scalar.RandomRange(minAngularVelocity, maxAngularVelocity.value),
      Scalar.RandomRange(minAngularVelocity, maxAngularVelocity.value),
      Scalar.RandomRange(minAngularVelocity, maxAngularVelocity.value),
    )
  };
}

interface EmitParam {
  x: number;
  y: number;
}
function emit(param: EmitParam) {
  if (!particleSystem.value) return;

  /** babylon 中心點為 0, 0，需要偏移 */
  const { x, y } = pipe(param,
    (data) => ({
      x: data.x - elWidth.value / 2,
      y: data.y - elHeight.value / 2,
    }),
  );

  particleSystem.value?.particles.forEach((particle) => {
    particle.color = new Color4(
      Scalar.RandomRange(0.5, 1),
      Scalar.RandomRange(0.5, 1),
      Scalar.RandomRange(0.5, 1),
      1
    );
    particle.position = new Vector3(x, y, 0);

    initParticle(particle);
  });
}

// #region Methods
defineExpose({
  emit,
});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
