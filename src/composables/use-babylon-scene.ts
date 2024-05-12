import { defaults } from 'lodash-es';
import {
  ArcRotateCamera,
  Engine, HemisphericLight, Scene, Vector3,
  WebGPUEngine,
} from '@babylonjs/core';
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

type BabylonEngine = Engine | WebGPUEngine;

export interface InitParam {
  canvas: HTMLCanvasElement;
  engine: BabylonEngine;
  scene: Scene;
  camera: ArcRotateCamera;
}

interface UseBabylonSceneParams {
  createEngine?: (canvas: HTMLCanvasElement) => Promise<BabylonEngine>;
  createScene?: (engine: BabylonEngine) => Scene;
  createCamera?: (scene: Scene) => ArcRotateCamera;
  init?: (params: InitParam) => Promise<void>;
}
const defaultParams: Required<UseBabylonSceneParams> = {
  async createEngine(canvas) {
    const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
    if (webGPUSupported) {
      const engine = new WebGPUEngine(canvas);
      await engine.initAsync();

      return engine;
    }

    return new Engine(canvas, true, {
      alpha: true,
    });
  },
  createScene(engine) {
    const scene = new Scene(engine);
    /** 使用預設光源 */
    scene.createDefaultLight();
    const defaultLight = scene.lights.at(-1);
    if (defaultLight instanceof HemisphericLight) {
      defaultLight.direction = new Vector3(0.5, 1, 0);
    }

    return scene;
  },
  createCamera(scene: Scene) {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      10,
      new Vector3(0, 0, 50),
      scene
    );

    return camera;
  },
  init: () => Promise.resolve(),
}

export function useBabylonScene(params?: UseBabylonSceneParams) {
  const canvasRef = ref<HTMLCanvasElement>();

  const engine = shallowRef<BabylonEngine>();
  const scene = shallowRef<Scene>();
  const camera = shallowRef<ArcRotateCamera>();

  const {
    createEngine, createScene, createCamera, init
  } = defaults(params, defaultParams);

  onMounted(async () => {
    if (!canvasRef.value) {
      console.error('無法取得 canvas DOM');
      return;
    }
    engine.value = await createEngine(canvasRef.value);
    scene.value = createScene(engine.value);
    camera.value = createCamera(scene.value);

    window.addEventListener('resize', handleResize);

    /** 反覆渲染場景，這樣畫面才會持續變化 */
    engine.value.runRenderLoop(() => {
      scene.value?.render();
    });

    await init({
      canvas: canvasRef.value,
      engine: engine.value,
      scene: scene.value,
      camera: camera.value,
    });
  });

  onBeforeUnmount(() => {
    engine.value?.dispose();
    window.removeEventListener('resize', handleResize);
  });

  function handleResize() {
    engine.value?.resize();
  }

  return {
    canvasRef,
    engine,
    scene,
    camera,
  }
}