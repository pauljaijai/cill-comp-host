<template>
  <div class="view relative">
    <canvas
      ref="canvasRef"
      class="absolute left-0 top-0 h-full w-full -z-10"
    />

    <slot :fps="fps" />
  </div>
</template>

<script setup lang="ts">
import type { Mesh, SolidParticle } from '@babylonjs/core'
import type { InitParam } from '../../composables/use-babylon-scene'
import {
  ArcRotateCamera,
  Camera,
  Color3,
  Color4,
  DynamicTexture,
  HemisphericLight,
  MeshBuilder,
  Scalar,
  SolidParticleSystem,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core'
import { useElementBounding, useIntervalFn } from '@vueuse/core'
import { constant, pipe, piped, range, sample } from 'remeda'
import { computed, onBeforeMount, reactive, ref, shallowRef, toRefs } from 'vue'
import { useBabylonScene } from '../../composables/use-babylon-scene'

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
type Confetti = {
  shape: 'plane';
  width: number;
  height: number;
} | {
  shape: 'cylinder';
  height: number;
  diameter: number;
} | {
  shape: 'disc';
  radius: number;
  /** the number of disc/polygon sides */
  tessellation: number;
  /** ratio of the circumference between 0 and 1 */
  arc: number;
} | {
  shape: 'torus';
  diameter: number;
  /** number of segments along the circle */
  thickness: number;
} | {
  shape: 'polyhedron';
  /** polyhedron type in the range。0-14
   *
   * https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/polyhedra/polyhedra_by_numbers
   */
  type: number;
  size: number;
  sizeX?: number;
  sizeY?: number;
  sizeZ?: number;
} | {
  shape: 'text';
  width: number;
  height: number;
  char: string;
}

interface Props {
  /** 紙屑參數。初始化後即固定，不支援動態變更 */
  confetti?: Confetti | Confetti[];

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

  /** 空氣阻力。速度衰減比率
   *
   * @default 0.985
   */
  airResistance?: number;

  /** 預設發射速度 */
  velocity?: Vector | ((index: number) => Vector);

  /** 粒子顏色 */
  color?: Color | ((index: number) => Color);
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  confetti: () => ({
    shape: 'plane',
    width: 10,
    height: 10,
  }),
  quantityOfPerEmit: 20,
  maxConcurrency: 10,
  maxAngularVelocity: Math.PI / 40,
  gravity: -0.07,
  airResistance: 0.985,
  velocity: () => ({
    x: Scalar.RandomRange(-5, 5),
    y: Scalar.RandomRange(-5, 5),
  }),
  color: () => piped(
    constant([
      { r: 1, g: 0.4, b: 0 },
      { r: 1, g: 0.9, b: 0 },
      { r: 0.5, g: 1, b: 0 },
      { r: 0, g: 0.9, b: 1 },
    ]),
    sample(1),
    ([value]) => value ?? { r: 1, g: 0.4, b: 0 },
  ),
})

// #region Slots
defineSlots<{
  default?: (data: { fps: number }) => unknown;
}>()
// #endregion Slots

const {
  confetti,
  maxAngularVelocity,
  gravity,
} = toRefs(props)

const particleSystem = shallowRef<SolidParticleSystem>()
onBeforeMount(() => {
  particleSystem.value?.dispose()
})

const {
  canvasRef,
  engine,
} = useBabylonScene({
  createCamera({ scene }) {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      // eslint-disable-next-line ts/no-use-before-define
      Math.max(canvasBounding.width, canvasBounding.height),
      new Vector3(0, 0, 0),
      scene,
    )
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA

    return camera
  },
  async init(param) {
    const { scene } = param
    // 背景透明
    scene.clearColor = new Color4(0, 0, 0, 0)

    // 調整預設光源
    const defaultLight = scene.lights.at(-1)
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.intensity = 1
      defaultLight.direction = new Vector3(0.5, 1, 0)

      defaultLight.groundColor = new Color3(0.9, 0.9, 0.9)
    }

    // 初始化粒子系統
    particleSystem.value = await createParticleSystem(param)
  },
})

const canvasBounding = reactive(useElementBounding(canvasRef))
/** 畫布邊界 */
const canvasBoundary = computed(() => {
  // 抓大一點的範圍，讓粒子可以飄到畫布外
  const x = canvasBounding.width / 3 * 2
  const y = canvasBounding.height / 3 * 2

  return {
    left: -x,
    right: x,
    top: y,
    bottom: -y,
  }
})

const totalAmount = props.quantityOfPerEmit * props.maxConcurrency
const numberOfMeshType = pipe(props.confetti, (data) => Array.isArray(data) ? data.length : 1,
)
const numberOfEachMesh = Math.floor(totalAmount / numberOfMeshType)

const fps = ref(0)
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0)
}, 100)

const meshProviders: (
  (param: Confetti) => Mesh | undefined
)[] = [
  (data) => {
    if (data.shape !== 'plane')
      return
    return MeshBuilder.CreateBox('mesh', data)
  },
  (data) => {
    if (data.shape !== 'cylinder')
      return
    return MeshBuilder.CreateCylinder('mesh', {
      ...data,
      tessellation: 8,
    })
  },
  (data) => {
    if (data.shape !== 'disc')
      return
    return MeshBuilder.CreateDisc('mesh', data)
  },
  (data) => {
    if (data.shape !== 'torus')
      return
    return MeshBuilder.CreateTorus('mesh', {
      ...data,
      tessellation: 6,
    })
  },
  (data) => {
    if (data.shape !== 'polyhedron')
      return
    return MeshBuilder.CreatePolyhedron('mesh', data)
  },
  (data) => {
    if (data.shape !== 'text')
      return
    const mesh = MeshBuilder.CreatePlane('text', data)

    const texture = new DynamicTexture('text', {
      width: data.width,
      height: data.height,
    })

    // 量測文字寬度
    const ctx = texture.getContext()
    const size = 12
    ctx.font = `${size}px monospace`
    const textWidth = ctx.measureText(data.char).width
    const ratio = textWidth / size
    const fontSize = Math.floor(data.width / ratio)

    texture.drawText(data.char, null, null, `${fontSize}px monospace`, 'black', 'white', true)

    const material = new StandardMaterial('material')
    material.diffuseTexture = texture

    mesh.material = material

    return mesh
  },
]

async function createParticleSystem({ scene }: InitParam) {
  const useModelMaterial = pipe(props.confetti, (data) => Array.isArray(data) ? data : [data], (data) => data.some(({ shape }) => shape === 'text'))

  const particleSystem = new SolidParticleSystem('SPS', scene, {
    useModelMaterial,
  })

  const list = Array.isArray(confetti.value)
    ? confetti.value
    : [confetti.value]

  // 依序建立每個 mesh
  list.forEach((item) => {
    const mesh = pipe(item, (data) => {
      for (const provider of meshProviders) {
        const result = provider(data)
        if (!result)
          continue

        return result
      }
    }, (data) => data ?? MeshBuilder.CreatePlane('mesh', {
      width: 10,
      height: 10,
    }))

    particleSystem.addShape(mesh, numberOfEachMesh)
    mesh.dispose()
  })

  particleSystem.buildMesh()

  particleSystem.initParticles = () => {
    particleSystem.particles.forEach((particle) => {
      const colorValue = pipe(props.color, (param) => {
        if (param instanceof Function) {
          return param(particle.idx)
        }

        return param ?? {
          r: 1,
          g: Scalar.RandomRange(0.4, 1),
          b: 0,
        }
      })

      particle.color = new Color4(
        colorValue.r,
        colorValue.g,
        colorValue.b,
        1,
      )

      initParticle(particle)

      particle.isVisible = false
    })
  }

  particleSystem.initParticles()
  particleSystem.setParticles()

  particleSystem.updateParticle = (particle) => {
    if (!particle.isVisible)
      return particle

    if (particle.position.y > canvasBoundary.value.top
      || particle.position.y < canvasBoundary.value.bottom
      || particle.position.x < canvasBoundary.value.left
      || particle.position.x > canvasBoundary.value.right
    ) {
      particle.isVisible = false
      particle.alive = false
      return particle
    }

    const animationRatio = scene.getAnimationRatio()

    // 模擬空氣擾動
    particle.velocity.addInPlaceFromFloats(
      Scalar.RandomRange(-0.25, 0.25) * animationRatio,
      Scalar.RandomRange(-0.25, 0.25) * animationRatio,
      0,
    )

    // 空氣阻力
    const airResistance = pipe(
      props.airResistance,
      (value) => {
        const delta = 1 - value
        return value + (delta - delta * animationRatio)
      },
    )
    particle.velocity.x *= airResistance
    particle.velocity.y *= airResistance

    // 限制粒子最大掉落速度
    if (particle.velocity.y > -5) {
      particle.velocity.y += gravity.value * animationRatio
    }
    particle.position.addInPlace(
      particle.velocity.multiplyByFloats(animationRatio, animationRatio, 1),
    )

    if (particle?.props?.rotationVelocity) {
      particle.rotation.addInPlace(
        particle.props.rotationVelocity.multiplyByFloats(animationRatio, animationRatio, 1),
      )
    }

    return particle
  }

  /** 播放動畫 */
  scene.onAfterRenderObservable.add(() => {
    particleSystem.setParticles()
  })

  return particleSystem
}
function initParticle(particle: SolidParticle) {
  const velocityValue = pipe(props.velocity, (param) => {
    if (param instanceof Function) {
      return param(particle.idx)
    }

    return {
      x: Scalar.RandomRange(-5, 5),
      y: Scalar.RandomRange(-5, 5),
    }
  })

  particle.velocity = new Vector3(
    velocityValue.x,
    velocityValue.y,
    0,
  )

  particle.rotation = new Vector3(
    Scalar.RandomRange(0, 2 * Math.PI),
    Scalar.RandomRange(0, 2 * Math.PI),
    Scalar.RandomRange(0, 2 * Math.PI),
  )

  const minAngularVelocity = maxAngularVelocity.value * 0.6
  particle.props = {
    rotationVelocity: new Vector3(
      Scalar.RandomRange(minAngularVelocity, maxAngularVelocity.value),
      Scalar.RandomRange(minAngularVelocity, maxAngularVelocity.value),
      Scalar.RandomRange(minAngularVelocity, maxAngularVelocity.value),
    ),
  }
}

let groupIndex = 0

/** 要平均取得每個 mesh。預先建立 index 映射表，用查表法取得目前 groupIndex 對應之 particle index */
const particleIndexMapList = pipe(
  range(0, totalAmount),
  (list) => {
    const numCols = Math.ceil(list.length / numberOfMeshType)
    const result: number[] = []

    // 重組陣列
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numberOfMeshType; row++) {
        const value = list[row * numCols + col]
        if (value !== undefined) {
          result.push(value)
        }
      }
    }

    return result
  },
)

interface EmitParam {
  x: number;
  y: number;
  velocity?: Vector;
}
function emit(param: EmitParam | ((index: number) => EmitParam)) {
  if (!particleSystem.value)
    return

  for (let i = 0; i < props.quantityOfPerEmit; i++) {
    const { x, y, velocity } = pipe(param, (data) => {
      if (data instanceof Function) {
        return data(i)
      }

      return data
    }, (data) => ({
      /** babylon 中心點和網頁中心點位置不同，需要轉換 */
      x: -(data.x - canvasBounding.width / 2),
      y: -(data.y - canvasBounding.height / 2),
      velocity: data.velocity,
    }))

    /** 根據 groupIndex 取得正確 index  */
    const index = particleIndexMapList[i + groupIndex * props.quantityOfPerEmit]
    console.log(`🚀 ~ groupIndex:`, groupIndex)
    console.log(`🚀 ~ index:`, index)
    if (index === undefined)
      continue

    const particle = particleSystem.value.particles[index]
    if (!particle)
      continue

    particle.isVisible = true
    particle.alive = true

    particle.position = new Vector3(x, y, 0)

    initParticle(particle)

    if (velocity) {
      particle.velocity = new Vector3(
        velocity.x,
        velocity.y,
        0,
      )
    }
  }

  groupIndex++
  groupIndex %= props.maxConcurrency
}

// #region Methods
defineExpose({
  /** 發射粒子，如果提供 function，則可以分別設定粒子參數 */
  emit,
  /** 目前畫面 FPS */
  fps,
})
// #endregion Methods
</script>
