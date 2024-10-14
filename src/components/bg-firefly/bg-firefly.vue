<template>
  <div class="view pointer-events-none relative">
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
      class="absolute left-0 top-0 h-full w-full"
    />

    <slot :fps="fps" />
  </div>
</template>

<script setup lang="ts">
import type { InitParam } from '../../composables/use-babylon-scene'

import {
  ArcRotateCamera,
  Color3,
  Color4,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  HemisphericLight,
  NoiseProceduralTexture,
  ParticleSystem,
  Texture,
  Vector3,
} from '@babylonjs/core'
import { useIntervalFn } from '@vueuse/core'
import { forEach, map, pipe, range } from 'remeda'

import { ref } from 'vue'
import { useBabylonScene } from '../../composables/use-babylon-scene'

// #region Props
type Size = number | Record<'max' | 'min', number>
type CanvasSize = Record<'width' | 'height', number>
/** string 請使用包含 # 之 HEX 格式 */
type Color = Record<'r' | 'g' | 'b', number> | string

interface Props {
  /** 粒子容量。同時存活的最大粒子數量 */
  capacity?: number;
  /** 每一幀最大發射數量 */
  emitRate?: number;
  /** 如果設定兩種顏色，則會隨機取兩色之間的顏色 */
  color?: Color | [Color, Color];
  /** 可以依 canvas 尺寸設定粒子尺寸 */
  size?: Size | ((canvasSize: CanvasSize) => Size);
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  capacity: 5000,
  emitRate: 100,
  color: () => ['#5af522', '#abf522'],
  size: () => ({ min: 4, max: 10 }),
})

// #region Slots
defineSlots<{
  default?: (data: { fps: number }) => unknown;
}>()
// #endregion Slots

const pipeline = ref<DefaultRenderingPipeline>()

const { canvasRef, engine } = useBabylonScene({
  async init(param) {
    const { scene, camera, canvas } = param

    if (camera instanceof ArcRotateCamera) {
      const rect = canvas.getBoundingClientRect()
      camera.radius = Math.min(rect.width, rect.height)
    }

    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0.01)

    // 調整預設光源
    const defaultLight = scene.lights.at(-1)
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1
      defaultLight.direction = new Vector3(0.5, 1, 0)

      defaultLight.diffuse = new Color3(1, 1, 1)
      defaultLight.groundColor = new Color3(1, 1, 1)
    }

    pipeline.value = initRenderingPipeline(param)
    await initParticleSystem(param)
  },
})

const fps = ref(0)
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0)
}, 100)

function initRenderingPipeline(
  { scene, canvas, camera }: InitParam,
) {
  const rect = canvas.getBoundingClientRect()

  const pipeline = new DefaultRenderingPipeline(
    'defaultPipeline',
    true,
    scene,
    [camera],
  )

  // 單位是毫米，所以要乘以 1000
  const focusDistance = Math.min(rect.width, rect.height) * 1000

  pipeline.depthOfFieldEnabled = true
  pipeline.depthOfField.focusDistance = focusDistance
  /** 相機焦距 */
  pipeline.depthOfField.focalLength = 800
  /** 光圈 */
  pipeline.depthOfField.fStop = 0.5
  pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Low

  return pipeline
}

async function initParticleSystem({ scene, canvas }: InitParam) {
  const rect = canvas.getBoundingClientRect()
  const { width, height } = rect

  // const particleSystem = new GPUParticleSystem(
  //   'fireflies',
  //   { capacity: props.quantity, randomTextureSize: 4096 },
  //   scene
  // );

  const particleSystem = new ParticleSystem(
    'fireflies',
    props.capacity,
    scene,
  )

  particleSystem.particleTexture = new Texture('/textures/flare.png')
  particleSystem.emitter = new Vector3(0, -height / 2, 0)
  particleSystem.emitRate = props.emitRate

  // 設定尺寸
  pipe(
    props.size,
    (sizeParam) => {
      if (typeof sizeParam === 'function') {
        return sizeParam({ width, height })
      }

      return sizeParam
    },
    (size) => {
      if (typeof size === 'number') {
        particleSystem.minSize = size
        particleSystem.maxSize = size
        return
      }

      particleSystem.minSize = size.min
      particleSystem.maxSize = size.max
    },
  )

  particleSystem.maxLifeTime = 20
  particleSystem.minLifeTime = 10

  const maxSpeed = height / 10
  const x = width / 2
  particleSystem.createBoxEmitter(
    new Vector3(maxSpeed, maxSpeed / 2, maxSpeed),
    new Vector3(-maxSpeed, 0, -maxSpeed),
    new Vector3(x, 0, 0),
    new Vector3(-x, 0, 0),
  )

  // 隨機移動
  const noiseTexture = new NoiseProceduralTexture('noise', 256, scene)
  noiseTexture.octaves = 6
  noiseTexture.persistence = 2
  noiseTexture.animationSpeedFactor = 2
  noiseTexture.brightness = 0.5

  particleSystem.noiseTexture = noiseTexture
  particleSystem.noiseStrength = new Vector3(50, 0, 50)

  // 顏色
  const [color1, color2] = pipe(
    props.color,
    (colorValue) => {
      if (Array.isArray(colorValue)) {
        return colorValue
      }
      return [colorValue] as const
    },
    map.strict((value) => {
      if (typeof value === 'string') {
        return Color3.FromHexString(value).toColor4()
      }

      const { r, g, b } = value
      return new Color4(r, g, b, 1)
    }),
  )

  // 閃爍效果
  const blinkMaxStep = 50
  const hideColor = new Color4()
  pipe(
    range(0, blinkMaxStep),
    forEach.indexed((value, i) => {
      const gradient = value / blinkMaxStep
      if (i % 4) {
        particleSystem.addColorGradient(gradient, color1, color2)
        return
      }

      particleSystem.addColorGradient(gradient, hideColor)
    }),
  )
  particleSystem.addColorGradient(1, hideColor)

  particleSystem.start()
}

// #region Methods
defineExpose({
  /** 目前畫面 FPS */
  fps,
})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
