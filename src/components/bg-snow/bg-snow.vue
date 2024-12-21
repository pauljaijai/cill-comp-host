<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none"
  />
</template>

<script setup lang="ts">
import type { WorkerApi } from './bg-snow-worker'
import * as Comlink from 'comlink'
import { onMounted, ref } from 'vue'
import SceneWorker from './bg-snow-worker?worker'

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
  color?: Color;
  size?: Size | ((canvasSize: CanvasSize) => Size);
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  capacity: 5000,
  emitRate: 500,
  color: '#edfbff',
  size: () => ({ min: 1, max: 4 }),
})

let worker: Worker | undefined
let remoteWorker: Comlink.Remote<WorkerApi> | undefined
const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) {
    throw new Error('無法取得 canvas DOM')
  }

  const rect = canvas.getBoundingClientRect()

  if (!canvas.transferControlToOffscreen) {
    throw new Error('此瀏覽器不支援 canvas.transferControlToOffscreen')
  }

  const offscreen = canvas.transferControlToOffscreen()
  offscreen.width = rect.width
  offscreen.height = rect.height

  worker = new SceneWorker({ name: 'bg-snow' })
  remoteWorker = Comlink.wrap<WorkerApi>(worker)

  remoteWorker.init(Comlink.transfer(offscreen, [offscreen]))
})

// const { canvasRef } = useBabylonScene({
//   async init(param) {
//     const { scene, camera, canvas } = param

//     if (camera instanceof ArcRotateCamera) {
//       const rect = canvas.getBoundingClientRect()
//       camera.radius = Math.min(rect.width, rect.height)
//     }

//     // 背景透明
//     scene.clearColor = new Color4(0, 0, 0, 0.01)

//     await initParticleSystem(param)
//   },
// })

// async function initParticleSystem({ scene, canvas }: InitParam) {
//   const rect = canvas.getBoundingClientRect()
//   const { width, height } = rect

//   const particleSystem = new GPUParticleSystem(
//     'snow',
//     { capacity: props.capacity, randomTextureSize: 4096 },
//     scene,
//   )

//   particleSystem.particleTexture = new Texture('/textures/dot.png')
//   particleSystem.emitter = new Vector3(0, height / 2, 0)
//   particleSystem.emitRate = props.emitRate

//   // 設定尺寸
//   pipe(
//     props.size,
//     (sizeParam) => {
//       if (typeof sizeParam === 'function') {
//         return sizeParam({ width, height })
//       }

//       return sizeParam
//     },
//     (size) => {
//       if (typeof size === 'number') {
//         particleSystem.minSize = size
//         particleSystem.maxSize = size
//         return
//       }

//       particleSystem.minSize = size.min
//       particleSystem.maxSize = size.max
//     },
//   )

//   particleSystem.minLifeTime = 30

//   const maxSpeed = height / 15
//   const maxHorizontalSpeed = maxSpeed / 4

//   const x = width / 2
//   particleSystem.createBoxEmitter(
//     new Vector3(maxHorizontalSpeed, -maxSpeed, maxHorizontalSpeed),
//     new Vector3(-maxHorizontalSpeed, 0, -maxHorizontalSpeed),
//     new Vector3(x, 0, 0),
//     new Vector3(-x, 0, 0),
//   )

//   // 隨機移動
//   const noiseTexture = new NoiseProceduralTexture('noise', 256, scene)
//   noiseTexture.octaves = 6
//   noiseTexture.animationSpeedFactor = 2
//   noiseTexture.brightness = 0.5

//   particleSystem.noiseTexture = noiseTexture

//   const color = pipe(
//     props.color,
//     (value) => {
//       if (typeof value === 'string') {
//         return Color3.FromHexString(value).toColor4()
//       }

//       const { r, g, b } = value
//       return new Color4(r, g, b, 1)
//     },
//   )
//   particleSystem.addColorGradient(0, color)
//   particleSystem.addColorGradient(0.98, color)
//   particleSystem.addColorGradient(1, color.add(new Color4(0, 0, 0, -1)))

//   particleSystem.blendMode = GPUParticleSystem.BLENDMODE_STANDARD

//   particleSystem.start()
// }

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
