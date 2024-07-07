<template>
  <div class=" relative overflow-hidden">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full"
    />

    <div class=" absolute left-0 top-0 p-4 text-white">
      {{ fps }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import {
  ArcRotateCamera,
  Color3,
  Color4,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  DynamicTexture, Matrix, Mesh, MeshBuilder,
  Particle,
  ParticleSystem, Animation,
  StandardMaterial, Texture, Vector3,
  CubicEase,
  EasingFunction,
  SineEase,
  QuadraticEase,
  QuinticEase,
  UniversalCamera,
  IAnimationKey,
  Vector2,
  Engine
} from '@babylonjs/core';
import { add, clone, forEach, map, pipe, range, shuffle, splice, sum } from 'remeda';
import anime from 'animejs';

import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';
import { promiseTimeout, useIntervalFn, useRefHistory } from '@vueuse/core';

// import '@babylonjs/core/Debug/debugLayer';
// import '@babylonjs/inspector';

interface ImageInfo {
  src: string;
  offset: Vector2;
  rotation: Vector3;
  duration: number;
}

// #region Props
interface Props {
  images?: Array<ImageInfo | string>;
  /** 自動播放。若為 true，則預設每 5s 切換一次；
   * number 則可自行指定毫秒。
   */
  autoplay?: boolean | number;
  fpsVisible?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  autoplay: false,
  fpsVisible: false,
});

// #region Emits
// const emit = defineEmits<{
//   'update:modelValue': [value: Props['modelValue']];
// }>();
// #endregion Emits

const fps = ref(0);
useIntervalFn(() => {
  fps.value = Math.floor(engine.value?.getFps() ?? 0);
}, 100);

const currentIndex = ref(0);
const boards = shallowRef<Mesh[]>([]);

const Z_OFFSET = 3;
const CAMERA_OFFSET = 1;

const { canvasRef, engine, camera, scene } = useBabylonScene({
  createCamera(param) {
    const { scene } = param;
    const camera = new UniversalCamera(
      'camera',
      new Vector3(0, 0, props.images.length * Z_OFFSET),
      scene
    );

    return camera;
  },
  async init(param) {
    const { canvas, camera, scene } = param;

    scene.clearColor = new Color4(0, 0, 0, 0);

    // camera.attachControl(canvas, true);

    // scene.debugLayer.show();

    initRenderingPipeline(param);
    boards.value = await initBoards(param);
    await processBoardsPosition(boards.value);
    focusBoard(currentIndex.value);
  },
});

function initRenderingPipeline(
  { scene, camera }: InitParam,
) {
  const pipeline = new DefaultRenderingPipeline(
    'defaultPipeline',
    true,
    scene,
    [camera]
  );

  pipeline.depthOfFieldEnabled = true;
  pipeline.depthOfField.focusDistance = (Z_OFFSET - CAMERA_OFFSET) * 1000;
  pipeline.depthOfField.focalLength = 100000;
  pipeline.depthOfField.fStop = 16;
  pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Low;

  pipeline.bloomEnabled = true;

  return pipeline;
}

async function initBoards(
  { scene }: InitParam
) {
  const boards = await pipe(
    props.images,
    map.indexed((item, i) => new Promise((resolve) => {
      const {
        src, rotation,
      } = pipe(
        item,
        (data) => {
          if (typeof data === 'string') {
            return {
              src: data,
              rotation: defaultImageInfo.rotation,
            };
          }

          return data
        },
      );

      const texture = new Texture(src, scene);

      texture.onLoadObservable.add(() => {
        const { width, height } = texture.getSize();

        /** 根據圖片比例產生 plane */
        const board = MeshBuilder.CreatePlane(`board-${i}`, {
          width: width / height, height: 1,
        }, scene);

        const rotateZ = Math.PI / 2 * (i % 2);
        board.rotation = new Vector3(0, 0, rotateZ);
        board.rotation.addInPlace(rotation);

        const material = new StandardMaterial(`material-${i}`, scene);
        material.diffuseTexture = texture;

        material.disableLighting = true;
        material.emissiveColor = new Color3(1, 1, 1);

        board.material = material;

        resolve(board);
      })
    })),
    async (tasks) => {
      const results = await Promise.allSettled(tasks);

      return results
        .filter((result): result is PromiseFulfilledResult<Mesh> =>
          result.status === 'fulfilled'
        )
        .map(({ value }) => value);
    },
  )

  return boards;
}

/** 分散每個 board 位置，每個 board 距離不小於 3 */
function processBoardsPosition(boards: Mesh[]) {
  const count = boards.length;

  const tasks = pipe(
    range(0, count),
    shuffle(),
    map.indexed((i, j) => {
      const board = boards[i];
      if (!board) return;

      return anime({
        targets: board.position,
        x: Math.random() * Z_OFFSET - Z_OFFSET / 2,
        y: Math.random() * Z_OFFSET - Z_OFFSET / 2,
        z: j * Z_OFFSET,
        duration: 1,
        easing: 'easeInOutQuart',
      }).finished
    }),
  )

  return Promise.all(tasks);
}

const defaultImageInfo: Omit<ImageInfo, 'src'> = {
  offset: new Vector2(0, 0),
  rotation: new Vector3(0, 0, 0),
  duration: 3000,
}
async function focusBoard(index: number) {
  const currentCamera = camera.value;
  const currentScene = scene.value;
  if (!currentCamera || !currentScene) return;
  if (!(currentCamera instanceof UniversalCamera)) return;

  const board = boards.value[index];
  if (!board) return;

  const info = pipe(
    props.images[index],
    (data) => {
      if (!data || typeof data === 'string') {
        return defaultImageInfo;
      }

      return {
        ...clone(defaultImageInfo),
        ...data,
      }
    },
  );

  const currentPosition = currentCamera.position
    .clone()
    .addInPlace(new Vector3(0, 0, CAMERA_OFFSET * 2));
  const { x, y, z } = board.position;
  const { z: rotateZ } = board.rotation;

  // 鏡頭移動動畫
  anime.remove(currentCamera.position);
  anime.remove(currentCamera.rotation);

  const { offset } = info;
  await Promise.all([
    anime({
      targets: currentCamera.position,
      x: [
        {
          value: x + offset.x,
          easing: 'easeInOutQuart',
        }
      ],
      y: [
        {
          value: y + offset.y,
          easing: 'easeInOutQuart',
        }
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
        }
      ],
      duration: info.duration,
    }).finished,
    anime({
      targets: currentCamera.rotation,
      z: [
        {
          value: rotateZ,
          easing: 'easeInOutQuart',
        }
      ],
      duration: info.duration,
    }).finished
  ])
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
  focusBoard(currentIndex.value);
}

// #region Methods
defineExpose({
  next,
});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
