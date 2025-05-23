<template>
  <div class="relative overflow-hidden">
    <canvas
      ref="canvasRef"
      class="absolute left-0 top-0 h-full w-full -z-1"
    />

    <slot
      :target-index="targetIndex"
      :is-switching="isSwitching"
      :stable-target="stableTarget"
    />

    <div
      v-if="props.fpsVisible"
      class="absolute left-0 top-0 p-4 text-gray-400"
    >
      {{ fps }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  Mesh,
} from '@babylonjs/core'
import type { InitParam } from '../../composables/use-babylon-scene'
import {
  Color3,
  Color4,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  MeshBuilder,

  Scene,
  StandardMaterial,
  Texture,
  UniversalCamera,
  Vector2,
  Vector3,
} from '@babylonjs/core'
import { useIntervalFn } from '@vueuse/core'
import anime from 'animejs'
import { add, clone, map, pipe, range, shuffle } from 'remeda'
import { computed, ref, shallowRef } from 'vue'
import { useBabylonScene } from '../../composables/use-babylon-scene'

// import '@babylonjs/core/Debug/debugLayer';
// import '@babylonjs/inspector';

interface ImageInfo {
  src: string;
  offset?: Vector2;
  scale?: Vector2 | number;
  rotation?: Vector3;
  duration?: number;
}

// #region Props
interface Props {
  initIndex?: number;
  images?: Array<ImageInfo | string>;
  fpsVisible?: boolean;

  /** 背景色。無限遠處的顏色 */
  clearColor?: Color4;
  /** 霧化色。足夠遠處的照片會被此顏色籠罩 */
  fogColor?: Color3;
  /** 霧化終點距離。此距離以後的物體表面會完全不可見 */
  fogEnd?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  initIndex: 0,
  images: () => [],
  fpsVisible: false,
  clearColor: () => new Color4(1, 1, 1, 1),
  fogColor: () => new Color3(1, 1, 0.95),
  fogEnd: undefined,
})

// #region Slots
defineSlots<{
  default?: (data: {
    targetIndex: number;
    isSwitching: boolean;
    stableTarget?: ImageInfo | string;
  }) => unknown;
}>()
// #endregion Slots

const defaultImageInfo: Required<Omit<ImageInfo, 'src'>> = {
  offset: new Vector2(0, 0),
  scale: 1,
  rotation: new Vector3(0, 0, 0),
  duration: 3000,
}

const targetIndex = ref(props.initIndex)
const isSwitching = ref(true)
/** 動畫結束後注視的目標 */
const stableTarget = computed(() => {
  if (isSwitching.value)
    return

  return props.images[targetIndex.value]
})

const boards = shallowRef<Mesh[]>([])

const Z_OFFSET = 3
const CAMERA_OFFSET = 1

const { canvasRef, engine, camera, scene } = useBabylonScene({
  createCamera(param) {
    const { scene } = param
    const camera = new UniversalCamera(
      'camera',
      new Vector3(0, 0, props.images.length * Z_OFFSET),
      scene,
    )

    return camera
  },
  async init(param) {
    const { canvas, camera, scene } = param

    scene.clearColor = props.clearColor

    scene.fogColor = props.fogColor
    scene.fogMode = Scene.FOGMODE_LINEAR
    scene.fogStart = 5
    scene.fogEnd = props.fogEnd ?? Z_OFFSET * props.images.length / 2

    // camera.attachControl(canvas, true);

    // scene.debugLayer.show();

    initRenderingPipeline(param)

    boards.value = await initBoards(param)
    await processBoardsPosition(boards.value)

    focusBoard(targetIndex.value)
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
    true,
    scene,
    [camera],
  )

  pipeline.depthOfFieldEnabled = true
  pipeline.depthOfField.focusDistance = (Z_OFFSET - CAMERA_OFFSET) * 1000
  pipeline.depthOfField.focalLength = 100000
  pipeline.depthOfField.fStop = 16
  pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Low

  pipeline.samples = 4

  return pipeline
}

async function initBoards(
  { scene }: InitParam,
) {
  const boards = await pipe(
    props.images,
    map((item, i) => new Promise((resolve) => {
      const {
        src,
        rotation,
        scale,
      } = pipe(
        item,
        (data) => {
          if (typeof data === 'string') {
            return {
              ...defaultImageInfo,
              src: data,
            }
          }

          return {
            ...defaultImageInfo,
            ...data,
          }
        },
      )

      const texture = new Texture(src, scene)

      texture.onLoadObservable.add(() => {
        const { width, height } = texture.getSize()

        /** 根據圖片比例產生 plane */
        const board = MeshBuilder.CreatePlane(`board-${i}`, {
          width: width / height,
          height: 1,
        }, scene)

        const rotateZ = Math.PI / 2 * (i % 2)
        board.rotation = new Vector3(0, 0, rotateZ).add(rotation)
        board.scaling = pipe(
          scale,
          (value) => {
            if (typeof value === 'number') {
              return new Vector3(value, value, 1)
            }

            return new Vector3(value.x, value.y, 1)
          },
        )

        const material = new StandardMaterial(`material-${i}`, scene)
        material.diffuseTexture = texture

        material.disableLighting = true
        material.emissiveColor = new Color3(1, 1, 1)

        board.material = material

        resolve(board)
      })
    })),
    async (tasks) => {
      const results = await Promise.allSettled(tasks)

      return results
        .filter((result): result is PromiseFulfilledResult<Mesh> =>
          result.status === 'fulfilled',
        )
        .map(({ value }) => value)
    },
  )

  return boards
}

/** 取得指定分布範圍。
 *
 * 例如：min = 3, max = 5，則回傳 -5 ~ -3 與 3 ~ 5 之間的隨機數
 */
function getRandomRange(min: number, max: number): number {
  const range = max - min
  return (Math.random() * range + min) * (Math.random() > 0.5 ? 1 : -1)
}

/** 分散每個 board 位置，每個 board 距離不小於 3 */
function processBoardsPosition(boards: Mesh[]) {
  const count = boards.length

  const tasks = pipe(
    range(0, count),
    shuffle(),
    map((i, j) => {
      const board = boards[i]
      if (!board)
        return

      return anime({
        targets: board.position,
        x: getRandomRange(1, Z_OFFSET),
        y: getRandomRange(1, Z_OFFSET),
        z: j * Z_OFFSET,
        duration: 0,
        easing: 'easeInOutQuart',
      }).finished
    }),
  )

  return Promise.all(tasks)
}

async function focusBoard(index: number) {
  const currentCamera = camera.value
  const currentScene = scene.value
  if (!currentCamera || !currentScene)
    return
  if (!(currentCamera instanceof UniversalCamera))
    return

  const board = boards.value[index]
  if (!board)
    return

  const info = pipe(
    props.images[index],
    (data) => {
      if (!data || typeof data === 'string') {
        return defaultImageInfo
      }

      return {
        ...clone(defaultImageInfo),
        ...data,
      }
    },
  )

  const currentPosition = currentCamera.position
    .clone()
    .addInPlace(new Vector3(0, 0, CAMERA_OFFSET * 2))
  const { x, y, z } = board.position
  const { z: rotateZ } = board.rotation

  // 鏡頭移動動畫
  anime.remove(currentCamera.position)
  anime.remove(currentCamera.rotation)

  const { offset } = info

  isSwitching.value = true
  await Promise.all([
    anime({
      targets: currentCamera.position,
      x: [
        {
          value: x + offset.x,
          easing: 'easeInOutQuart',
        },
      ],
      y: [
        {
          value: y + offset.y,
          easing: 'easeInOutQuart',
        },
      ],
      z: [
        {
          value: pipe(
            z - currentPosition.z,
            (displacement) => {
              /** 小於 0 表示往射出螢幕移動 */
              if (displacement < 0) {
                return displacement + displacement / 2
              }

              return displacement / 2
            },
            add(currentPosition.z),
          ),
          easing: 'easeInOutQuart',
        },
        {
          value: z - CAMERA_OFFSET * 2,
          easing: 'easeInOutQuart',
        },
      ],
      duration: info.duration,
    }).finished,
    anime({
      targets: currentCamera.rotation,
      z: [
        {
          value: rotateZ,
          easing: 'easeInOutQuart',
        },
      ],
      duration: info.duration,
    }).finished,
  ])
  isSwitching.value = false
}

function next() {
  targetIndex.value = (targetIndex.value + 1) % props.images.length
  focusBoard(targetIndex.value)
}

function prev() {
  targetIndex.value = (targetIndex.value - 1 + props.images.length) % props.images.length
  focusBoard(targetIndex.value)
}

// #region Methods
defineExpose({
  /** 目標 index */
  targetIndex,
  /** 鏡頭穩定時，注視的目標。還沒穩定時為 undefined */
  stableTarget,
  /** 下一張圖片 */
  next,
  /** 上一張圖片 */
  prev,
})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
