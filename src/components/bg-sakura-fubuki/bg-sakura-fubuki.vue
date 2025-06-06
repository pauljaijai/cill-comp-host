<template>
  <div class="view pointer-events-none relative">
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
  DynamicTexture,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core'
import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'
import { useBabylonScene } from '../../composables/use-babylon-scene'

// #region Props
interface Props {
  /** 粒子貼圖 */
  particleSrc?: string;
  /** 粒子尺寸 */
  particleSize?: Record<'width' | 'height', number>;
  /** 粒子容量 */
  capacity?: number;
  /** 粒子移動速度。
   * - 正 x：往左
   * - 正 y：往上
   * - 正 z：射出螢幕方向
   */
  velocity?: Record<'x' | 'y' | 'z', number>;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  particleSrc: '/sakura-petal.png',
  particleSize: () => ({ width: 0.7, height: 1 }),
  capacity: 500,
  velocity: () => ({
    x: 0.01,
    y: -0.02,
    z: 0.01,
  }),
})

const pipeline = ref<DefaultRenderingPipeline>()

const { canvasRef, engine } = useBabylonScene({
  async init(param) {
    const { scene, camera, canvas } = param

    if (camera instanceof ArcRotateCamera) {
      camera.radius = 50
      // camera.attachControl(canvas, true);
    }

    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0)

    // 調整預設光源
    const defaultLight = scene.lights[0]
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1
      defaultLight.direction = new Vector3(0.5, 1, 0)

      defaultLight.diffuse = Color3.White()
      defaultLight.groundColor = Color3.White()
    }

    pipeline.value = initRenderingPipeline(param)
    initParticles(param)
  },
})

const fps = ref(0)
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0)
}, 100)

function initRenderingPipeline(
  { scene, camera }: InitParam,
) {
  const pipeline = new DefaultRenderingPipeline(
    'defaultPipeline',
    false,
    scene,
    [camera],
  )

  pipeline.depthOfFieldEnabled = true
  pipeline.depthOfField.focusDistance = 37000
  pipeline.depthOfField.focalLength = 5000
  pipeline.depthOfField.fStop = 8
  pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.High

  pipeline.bloomEnabled = true

  return pipeline
}

function initParticles(
  { scene, camera }: InitParam,
) {
  if (!(camera instanceof ArcRotateCamera))
    return

  const { velocity, capacity, particleSize } = props

  const box = MeshBuilder.CreateBox('box', {
    ...particleSize,
    depth: 0.001,
  })

  let index = 0

  // 分布範圍尺寸
  const size = camera.radius * 1.5

  const matricesData = new Float32Array(16 * capacity)

  for (let i = 0; i < capacity; i++) {
    // 使用 Matrix.Translation 來生成新的變換矩陣
    const translationMatrix = Matrix.Translation(
      Math.random() * size - size / 2,
      Math.random() * size - size / 2,
      Math.random() * size - size / 2,
    )

    translationMatrix.copyToArray(matricesData, index * 16)

    index++
  }

  box.thinInstanceSetBuffer('matrix', matricesData, 16)

  const material = new StandardMaterial('material')
  material.specularColor = new Color3(0.1, 0.1, 0.1)

  const dynamicTexture = new DynamicTexture('dynamicTexture', {
    width: 124,
    height: 180,
  }, scene)
  dynamicTexture.hasAlpha = true

  const img = new Image()
  img.onload = () => {
    const ctx = dynamicTexture.getContext()
    ctx.drawImage(img, 0, 0, 124, 180)

    dynamicTexture.update()
  }
  img.src = props.particleSrc

  material.diffuseTexture = dynamicTexture
  box.material = material

  // 定義動畫
  scene.registerBeforeRender(() => {
    // 以時間為基礎，弭平不同裝置 fps 差異
    const time = performance.now() * 0.001
    for (let i = 0; i < capacity; i++) {
      const offset = i * 16

      const originalX = matricesData[offset + 12] ?? 0
      const originalY = matricesData[offset + 13] ?? 0
      const originalZ = matricesData[offset + 14] ?? 0

      // 計算新的 Y 位置
      let y = originalY + velocity.y

      // 計算新的 X、Z 位置，加入一點擾動
      let x = originalX + 0.005 * Math.sin(time + i * 0.01) + velocity.x
      let z = originalZ + 0.005 * Math.cos(time + i * 0.01) + velocity.z

      // 如果 Y 位置小於 -size / 2，則將其移動到最上方
      if (y < -size / 2) {
        y = size / 2
        x = Math.random() * size - size / 2
        z = Math.random() * size - size / 2
      }

      // 建立旋轉矩陣
      const angle = time * 0.5 + i * 0.1
      const rotationMatrix = Matrix.RotationYawPitchRoll(
        angle,
        angle,
        angle,
      )

      // 建立平移矩陣
      const translationMatrix = Matrix.Translation(x, y, z)

      // 合併旋轉和平移矩陣
      const finalMatrix = rotationMatrix.multiply(translationMatrix)

      // 更新矩陣
      finalMatrix.copyToArray(matricesData, offset)
    }

    // 更新實例矩陣
    box.thinInstanceSetBuffer('matrix', matricesData, 16)
  })
}
</script>

<style scoped lang="sass">
</style>
