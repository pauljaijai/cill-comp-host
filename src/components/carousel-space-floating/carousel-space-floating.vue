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
  QuinticEase
} from '@babylonjs/core';
import { map, pipe } from 'remeda';

import { InitParam, useBabylonScene } from '../../composables/use-babylon-scene';
import { useIntervalFn } from '@vueuse/core';

import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';


// #region Props
interface Props {
  srcList?: string[];
  /** 自動播放。若為 true，則預設每 5s 切換一次；
   * number 則可自行指定毫秒。
   */
  autoplay?: boolean | number;
  fpsVisible?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  srcList: () => [],
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

const { canvasRef, engine, camera, scene } = useBabylonScene({
  async init(param) {
    const { canvas, camera, scene } = param;

    // camera.attachControl(canvas, true);

    // scene.debugLayer.show();

    boards.value = await initBoards(param);

    focusBoard(currentIndex.value);
  },
});


const OFFSET = 5;
async function initBoards(
  { scene }: InitParam
) {
  const boards = await pipe(
    props.srcList,
    map.indexed((src, i) => new Promise((resolve) => {
      const texture = new Texture(src, scene);

      texture.onLoadObservable.add(() => {
        const { width, height } = texture.getSize();

        /** 根據圖片比例產生 plane */
        const board = MeshBuilder.CreatePlane(`board-${i}`, {
          width: width / height, height: 1,
        });
        board.position = new Vector3(
          Math.random() * OFFSET - OFFSET / 2,
          Math.random() * OFFSET - OFFSET / 2,
          Math.random() * OFFSET - OFFSET / 2,
        );

        const rotateZ = Math.PI / 2 * (i % 4);
        board.rotation = new Vector3(Math.PI, 0, rotateZ);

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

function focusBoard(index: number) {
  const currentCamera = camera.value;
  const currentScene = scene.value;
  if (!currentCamera || !currentScene) return;

  const board = boards.value[index];
  if (!board) return;

  const { x, y, z } = board.position;
  const { z: rotateZ } = board.rotation;

  const target = new Vector3(x, y, z);

  // currentCamera.target = target;
  // currentCamera.position = new Vector3(x, y, z + 2);
  // currentCamera.rotation.addInPlace(new Vector3(0, 0, 0));

  // 鏡頭移動動畫
  const animations = pipe([],
    // position
    (result: Animation[]) => {
      const keys = [
        { frame: 0, value: currentCamera.position },
        { frame: 5, value: new Vector3(x, y, z + 5) },
        { frame: 10, value: new Vector3(x, y, z + 2) },
      ];

      const easingFunction = new SineEase();
      easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

      const animation = Animation.CreateAnimation(
        'position',
        Animation.ANIMATIONTYPE_VECTOR3,
        5,
        easingFunction
      );
      animation.setKeys(keys);

      result.push(animation);
      return result;
    },

    // target
    (result: Animation[]) => {
      const keys = [
        { frame: 0, value: currentCamera.target },
        { frame: 10, value: target },
      ];

      const easingFunction = new SineEase();
      easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

      const animation = Animation.CreateAnimation(
        'target',
        Animation.ANIMATIONTYPE_VECTOR3,
        5,
        easingFunction
      );
      animation.setKeys(keys);

      result.push(animation);
      return result;
    },
  );

  currentScene.beginDirectAnimation(currentCamera, animations, 0, 10);

  // console.log(`🚀 ~ currentCamera.rotation:`, currentCamera.rotation);
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.srcList.length;
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
