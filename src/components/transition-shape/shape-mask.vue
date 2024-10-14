<template>
  <canvas
    ref="canvasRef"
    class="shape-mask pointer-events-none"
  />
</template>

<script setup lang="ts">
import type { Mesh, Scene } from '@babylonjs/core'
import type { TransitionType } from './type'
import {
  ArcRotateCamera,
  Camera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core'
import { until } from '@vueuse/core'
import { map, pipe, range } from 'remeda'
import { computed, ref, watch } from 'vue'
import { useBabylonScene } from '../../composables/use-babylon-scene'

import { animeEnterProviders, animeLeaveProviders } from './anime-provider'

// #region Props
interface Props {
  type: TransitionType;
  width?: number;
  height?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
})

// #region Emits
const emit = defineEmits<{
  (e: 'init'): void;
  (e: 'before-transition'): void;
  (e: 'after-transition'): void;
}>()
// #endregion Emits

const {
  canvasRef,
  scene,
  engine,
} = useBabylonScene({
  async createEngine({ canvas }) {
    return new Engine(canvas, true, {
      alpha: true,
    })
  },
  createCamera({ scene }) {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      Math.max(props.width, props.height),
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

      defaultLight.diffuse = new Color3(1, 1, 1)
      defaultLight.groundColor = new Color3(1, 1, 1)
    }
  },
})

const meshes: Mesh[] = []

interface MeshProviderParam extends Required<Props> {
  scene: Scene;
}
type MeshProvider = (param: MeshProviderParam) => Mesh[] | undefined
const meshProviders: MeshProvider[] = [
  // rect
  ({ scene, type, width, height }) => {
    const name = 'rect'
    if (type.name !== name)
      return

    return type.colors.map((color, index) => {
      const material = new StandardMaterial(`material-${index}`, scene)
      material.diffuseColor = Color3.FromHexString(color)

      const mesh = MeshBuilder.CreateBox(name, {
        width,
        height,
        depth: 0,
      }, scene)
      mesh.position = new Vector3(0, 0, 0)

      mesh.material = material
      mesh.isVisible = false

      return mesh
    })
  },
  // converging-rect
  ({ scene, type, width, height }) => {
    const name: TransitionType['name'] = 'converging-rect'
    if (type.name !== name)
      return

    return type.colors.map((color, index) => {
      const material = new StandardMaterial(`material-${index}`, scene)
      material.diffuseColor = Color3.FromHexString(color)

      /** 每種顏色建立 2 個 mesh */
      const meshes = pipe([-1, 1], map((value) => {
        const meshHight = height * 10
        const mesh = MeshBuilder.CreateBox(name, {
          width,
          height: meshHight,
          depth: 0,
        }, scene)
        mesh.material = material

        mesh.setPivotPoint(
          new Vector3((width / 2) * value, 0, 0),
        )

        mesh.position = new Vector3(0, 0, 0)
        mesh.isVisible = false

        return mesh
      }))

      return meshes
    }).flat()
  },
  // round
  ({ scene, type, width, height }) => {
    const name = 'round'
    if (type.name !== name)
      return

    return type.colors.map((color, index) => {
      const material = new StandardMaterial(`material-${index}`, scene)
      material.diffuseColor = Color3.FromHexString(color)

      /** 外接圓半徑 */
      const radius = Math.sqrt(
        (width / 2) ** 2 + (height / 2) ** 2,
      )

      const mesh = MeshBuilder.CreateDisc(name, {
        radius,
        tessellation: 48,
      }, scene)
      mesh.position = new Vector3(0, 0, 0)
      mesh.rotation = new Vector3(Math.PI, 0, 0)

      mesh.material = material
      mesh.isVisible = false

      return mesh
    })
  },
  // fence
  ({ scene, type, width, height }) => {
    const name = 'fence'
    if (type.name !== name)
      return

    const eachWidth = width / type.colors.length

    const xList = pipe(
      range(0, type.colors.length),
      map((i) => i * eachWidth - width / 2 + eachWidth / 2),
    )

    return type.colors.map((color, i) => {
      const material = new StandardMaterial(`material-${i}`, scene)
      material.diffuseColor = Color3.FromHexString(color)

      const mesh = MeshBuilder.CreateBox(name, {
        width: eachWidth,
        height,
        depth: 0,
      }, scene)
      mesh.position = new Vector3(0, 0, 0)

      mesh.material = material
      mesh.isVisible = false

      return mesh
    })
  },
]
async function initMeshes(scene: Scene, size: { width: number; height: number }) {
  for (const provider of meshProviders) {
    const result = provider({
      scene,
      type: props.type,
      width: size.width,
      height: size.height,
    })
    if (!result)
      continue
    meshes.push(...result)
  }
}
// 顏色變化時，更新材質
watch(() => props.type.colors, (colors) => {
  if (meshes.length === 0)
    return
  colors.forEach((color, index) => {
    const mesh = meshes[index]
    if (!mesh || !mesh.material)
      return
    if (!(mesh.material instanceof StandardMaterial)) {
      return
    }

    mesh.material.diffuseColor = Color3.FromHexString(color)
  })
}, { deep: true })
// 寬高發生變化時，resize
watch(() => [props.width, props.height], ([width, height]) => {
  if (!width || !height)
    return

  engine.value?.resize()
}, { deep: true })

const initFinished = ref(false)
async function init(rect: DOMRect) {
  if (initFinished.value)
    return

  await until(scene).toBeTruthy()

  if (!scene.value) {
    throw new Error('scene is not ready')
  }

  await initMeshes(scene.value, rect)
  emit('init')
  initFinished.value = true
  engine.value?.resize()
}

const isEntering = ref(false)
async function enter(rect: DOMRect) {
  emit('before-transition')

  if (isEntering.value) {
    return until(isEntering).toBe(false)
  }

  isEntering.value = true

  for (const provider of animeEnterProviders) {
    const result = provider({
      rect,
      type: props.type,
      meshes,
    })
    if (!result)
      continue

    meshes.forEach((mesh) => {
      mesh.isVisible = true
    })

    await Promise.all(result)
    break
  }

  isEntering.value = false
}

const isLeaving = ref(false)
async function leave(rect: DOMRect) {
  if (isLeaving.value) {
    return until(isLeaving).toBe(false)
  }

  isLeaving.value = true

  for (const provider of animeLeaveProviders) {
    const result = provider({
      rect,
      type: props.type,
      meshes,
    })
    if (!result)
      continue
    await Promise.all(result)

    meshes.forEach((mesh) => {
      mesh.isVisible = false
    })
    break
  }

  isLeaving.value = false

  emit('after-transition')
}

const isTransition = computed(
  () => isEntering.value || isLeaving.value,
)

defineExpose({
  init,
  isTransition,
  enter,
  leave,
  /** 如果 mask 形狀異常，可能是因為初始化時尺寸發生變化，
   * 可以呼叫 resize 嘗試重新調整 mask 形狀
   */
  resize() {
    engine.value?.resize()
  },
})
</script>

<style scoped lang="sass">
</style>
