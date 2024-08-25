<template>
  <canvas
    ref="canvasRef"
    class="fixed top-0 left-0 w-full h-full pointer-events-none"
  />
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import {
  Color4, CSG, Engine,
  Mesh, MeshBuilder,
  Scene, StandardMaterial,
  UniversalCamera, Vector3
} from '@babylonjs/core';
import { BusData, eventKey } from './type';
import { pipe } from 'remeda';
import { debounce } from 'lodash-es';
import { createHole, Hole } from './hole';

// import '@babylonjs/core/Debug/debugLayer';
// import '@babylonjs/inspector';

import { useBabylonScene } from '../../composables/use-babylon-scene';
import { useEventBus, useRafFn, useWindowSize } from '@vueuse/core';

type ElData = Extract<BusData, { type: 'add' }>

const windowSize = reactive(useWindowSize({ includeScrollbar: false }));

const bus = useEventBus(eventKey);

/** 儲存註冊資料 */
const elDataQueue: ElData[] = [];
/** 空洞 */
const holes: Hole[] = [];

/** 遞迴消耗 queue 資料並產生 hole */
function consumeElData() {
  if (!scene.value) return;
  if (elDataQueue.length === 0) {
    initOccluder(scene.value);
    return;
  }

  const elData = elDataQueue.shift();
  if (!elData) return;

  holes.push(
    createHole({
      data: elData,
      windowSize,
    }, scene.value)
  );

  consumeElData();
}

/** 接收資料 */
bus.on((data) => {
  if (data.type === 'add') {
    elDataQueue.push(data);
    consumeElData();
  }

  const hole = holes.find((hole) => hole.id === data.id);
  if (!hole) return;

  if (data.type === 'update') {
    hole.setVisible(!data.visible);

    // hole.scaling.x = data.width;
    // hole.scaling.y = data.height;

    // hole.position.x = data.x + data.width / 2 - windowSize.width / 2;
    // hole.position.y = -data.y - data.height / 2 + windowSize.height / 2;
  }

  if (data.type === 'dig') {
    if (data.isActive) {
      hole.diggingParticles.start();
    } else {
      hole.diggingParticles.stop();
    }
  }
});

/** 相機到 XY 平面距離 */
const cameraDistance = 1000;
const { canvasRef, camera, scene } = useBabylonScene({
  async createEngine({ canvas }) {
    return new Engine(canvas, true, {
      alpha: true,
    });
  },
  createCamera(param) {
    const { scene, canvas } = param;
    const camera = new UniversalCamera(
      'camera',
      new Vector3(0, 0, -cameraDistance),
      scene
    );

    return camera;
  },
  async init(param) {
    const { canvas, camera, scene } = param;

    scene.clearColor = new Color4(0, 0, 0, 0);

    // scene.debugLayer.show();

    consumeElData();
  },
});

/** 計算相機 fov */
const fov = computed(() => {
  const distance = Math.abs(camera.value?.position.z ?? 1000);
  const hypotenuse = Math.sqrt((windowSize.height / 2) ** 2 + distance ** 2);

  const cosine = distance / hypotenuse;
  const halfAngle = Math.acos(cosine);

  return halfAngle * 2;
});
/** 同步 fov 至 camera */
watchEffect(() => {
  if (!camera.value) return;
  camera.value.fov = fov.value;
});

/** camera 同步捲動 */
useRafFn(() => {
  if (camera.value) {
    const x = window.scrollX;
    const y = window.scrollY;

    camera.value.position.x = x;
    camera.value.position.y = -y;
  }
});


/** XY 平面上的遮擋面 */
let occluder: Mesh | undefined;
const initOccluder = debounce((scene: Scene) => {
  if (occluder) {
    occluder.material?.dispose();
    occluder.dispose();
  }

  /** 整個網頁尺寸 */
  const { scrollWidth, scrollHeight } = document.documentElement;
  const plane = MeshBuilder.CreateBox('plane', {
    width: scrollWidth,
    depth: scrollHeight,
    height: 0.001
  }, scene);

  plane.rotation.x = Math.PI / 2;
  plane.position.y = -scrollHeight / 2 + windowSize.height / 2;

  const result = pipe(null,
    () => {
      const planeCSG = holes.reduce((accCSG, hole) => {
        const holeCutter = MeshBuilder.CreateBox('holeCutter', {
          width: hole.width,
          height: hole.height,
          depth: 10,
        }, scene);
        holeCutter.position = hole.mesh.position;
        holeCutter.position.z = 0;

        const holeCSG = CSG.FromMesh(holeCutter);
        const booleanCSG = accCSG.subtract(holeCSG);
        holeCutter.dispose();

        return booleanCSG;
      }, CSG.FromMesh(plane));

      const occluder = planeCSG.toMesh('occluder', null, scene);

      const material = new StandardMaterial('occluder', scene);
      material.forceDepthWrite = true;
      material.disableLighting = true;

      occluder.material = material;
      occluder.visibility = 0.0001;
      occluder.renderingGroupId = 0;

      return occluder;
    },
  );

  plane.dispose();
  scene.setRenderingAutoClearDepthStencil(1, false, false, false);

  occluder = result;
}, 10)

</script>

<style scoped lang="sass">
</style>
