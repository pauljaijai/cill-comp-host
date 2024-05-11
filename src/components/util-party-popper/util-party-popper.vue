<template>
  <div class="view relative">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full -z-10"
    />

    <slot :fps="fps" />
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
import { useElementBounding, useIntervalFn } from '@vueuse/core';
import { pipe } from 'remeda';

interface Vector {
  x: number;
  y: number;
}
interface Color {
  /** 0 ~ 1 */
  r: number;
  /** 0 ~ 1 */
  g: number;
  /** 0 ~ 1 */
  b: number;
}

// #region Props
interface Props {
  /** 紙屑參數 */
  confetti?: {
    width: number;
    height: number;
  };

  /** 每次發射數量
   * 
   * @default 20
   */
  quantityOfPerEmit?: number;
  /** 最大同時觸發次數。
   * 
   * @default 10
   */
  maxConcurrency?: number;

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

  velocity?: Vector | ((index: number) => Vector);

  color?: Color | ((index: number) => Color);
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  confetti: () => ({
    width: 10,
    height: 10,
  }),
  quantityOfPerEmit: 20,
  maxConcurrency: 10,
  maxAngularVelocity: Math.PI / 40,
  gravity: -0.04,
  // airResistance: 0.01,
  velocity: () => ({
    x: Scalar.RandomRange(-5, 5),
    y: Scalar.RandomRange(-5, 5),
  }),
  color: () => ({
    r: 1,
    g: Scalar.RandomRange(0.4, 1),
    b: 0,
  }),
});

// #region Slots
defineSlots<{
  default?: (data: { fps: number }) => unknown;
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
    const { scene } = param;
    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0);

    // 調整預設光源
    const defaultLight = scene.lights.at(-1);
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1;
      defaultLight.direction = new Vector3(0.5, 1, 0);

      defaultLight.diffuse = new Color3(1, 0.8, 0.8);
      defaultLight.groundColor = new Color3(1, 1, 1);
    }

    // 初始化粒子系統
    particleSystem.value = initParticles(param);
  },
});

const groupIndex = ref(0);

const fps = ref(0);
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0);
}, 100);

const { width: elWidth, height: elHeight } = useElementBounding(canvasRef);
/** 畫布邊界 */
const canvasBoundary = computed(() => {
  const x = elWidth.value / 3 * 2;
  const y = elHeight.value / 3 * 2;

  return {
    left: -x,
    right: x,
    top: y,
    bottom: -y,
  }
});

function initParticles({ scene }: InitParam) {
  const { width, height } = confetti.value;

  const spSystem = new SolidParticleSystem('SPS', scene);
  const box = MeshBuilder.CreateBox('box', { width, height, depth: 1 });
  spSystem.addShape(box, props.quantityOfPerEmit * props.maxConcurrency);
  box.dispose();

  const mesh = spSystem.buildMesh();

  spSystem.initParticles = () => {
    spSystem.particles.forEach((particle) => {
      const colorValue = pipe(props.color,
        (param) => {
          if (param instanceof Function) {
            return param(particle.idx);
          }

          return {
            r: 1,
            g: Scalar.RandomRange(0.4, 1),
            b: 0,
          }
        },
      );

      particle.color = new Color4(
        colorValue.r, colorValue.g, colorValue.b, 1
      );

      initParticle(particle);

      particle.position.y = canvasBoundary.value.bottom * 2;
    });
  };

  spSystem.initParticles();
  spSystem.setParticles();

  spSystem.updateParticle = (particle) => {
    if (particle.position.y > canvasBoundary.value.top
      || particle.position.y < canvasBoundary.value.bottom
      || particle.position.x < canvasBoundary.value.left
      || particle.position.x > canvasBoundary.value.right
    ) return particle;

    // 模擬空氣擾動
    particle.velocity.addInPlace(
      new Vector3(
        Scalar.RandomRange(-0.2, 0.2),
        Scalar.RandomRange(-0.2, 0.2),
        0
      )
    );
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
  const velocityValue = pipe(props.velocity,
    (param) => {
      if (param instanceof Function) {
        return param(particle.idx);
      }

      return {
        x: Scalar.RandomRange(-5, 5),
        y: Scalar.RandomRange(-5, 5)
      }
    },
  );

  particle.velocity = new Vector3(
    velocityValue.x, velocityValue.y, 0
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
  velocity?: Vector
}
function emit(param: EmitParam | ((index: number) => EmitParam)) {
  if (!particleSystem.value) return;

  for (let i = 0; i < props.quantityOfPerEmit; i++) {
    const { x, y, velocity } = pipe(param,
      (data) => {
        if (data instanceof Function) {
          return data(i);
        }

        return data;
      },
      (data) => ({
        /** babylon 中心點和網頁中心點位置不同，需要轉換 */
        x: -(data.x - elWidth.value / 2),
        y: -(data.y - elHeight.value / 2),
        velocity: data.velocity,
      }),
    );

    const index = i + groupIndex.value * props.quantityOfPerEmit;
    const particle = particleSystem.value.particles[index];
    if (!particle) return;

    particle.position = new Vector3(x, y, 0);

    initParticle(particle);

    if (velocity) {
      particle.velocity = new Vector3(
        velocity.x, velocity.y, 0
      );
    }
  }

  groupIndex.value++;
  groupIndex.value %= props.maxConcurrency;
}

// #region Methods
defineExpose({
  emit,
  fps,
});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
