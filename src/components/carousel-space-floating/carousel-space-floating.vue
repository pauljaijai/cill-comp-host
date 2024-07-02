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
  ParticleSystem,
  StandardMaterial, Texture, Vector3
} from '@babylonjs/core';
import { pipe } from 'remeda';

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


const { canvasRef, engine } = useBabylonScene({
  async init(param) {
    const { canvas, camera, scene } = param;

    camera.attachControl(canvas, true);

    scene.debugLayer.show();

    initBoards(param);
  },
});


function initBoards(
  { scene }: InitParam
) {
  const boards = props.srcList.map((src, i) => {
    const board = MeshBuilder.CreatePlane(`board-${i}`, { width: 1, height: 1 });
    board.position = new Vector3(i * 2, 0, 0);
    board.rotation = new Vector3(Math.PI, 0, 0);

    const material = new StandardMaterial(`material-${i}`, scene);
    material.diffuseTexture = new Texture(src, scene);

    board.material = material;

    return board;
  })

  return boards;
}
</script>

<style scoped lang="sass">
</style>
