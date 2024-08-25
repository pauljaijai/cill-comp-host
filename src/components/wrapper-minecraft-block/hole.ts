import { Color3, Color4, Mesh, MeshBuilder, ParticleSystem, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { BusData } from "./type";
import { pick, pipe } from "remeda";

type ElData = Extract<BusData, { type: 'add' }>

export interface Hole {
  id: string
  width: number;
  height: number;
  mesh: Mesh;
  diggingParticles: ParticleSystem;
  setVisible: (value: boolean) => void;
}

interface CreateHoleParam {
  data: ElData;
  windowSize: { width: number; height: number };
}


function createMesh(param: CreateHoleParam, scene: Scene) {
  const { data, windowSize } = param;

  const depth = Math.max(data.width, data.height);

  const texture = pipe(
    new Texture(
      '/minecraft/textures/block/dirt.png',
      scene,
      true,
      false,
      Texture.NEAREST_NEAREST
    ),
    (texture) => {
      /** 方塊基準尺寸 */
      const baseSize = 80;

      texture.uScale = data.width / baseSize;
      texture.vScale = data.height / baseSize;

      return texture;
    }
  )

  const material = pipe(
    new StandardMaterial('hole', scene),
    (material) => {
      material.emissiveColor = new Color3(0.1, 0.1, 0.1);
      material.diffuseTexture = texture;

      return material;
    },
  );

  const mesh = pipe(
    MeshBuilder.CreateBox(data.id, {
      width: 1, height: 1, depth,
      sideOrientation: Mesh.BACKSIDE,
    }, scene),
    (hole) => {
      // 使用縮放對應寬高，這樣就可以自由調整尺寸，而不用變更 mesh
      hole.scaling.x = data.width;
      hole.scaling.y = data.height;

      hole.renderingGroupId = 1;
      hole.material = material;

      hole.position.x = data.x + data.width / 2 - windowSize.width / 2;
      hole.position.y = -data.y - data.height / 2 + windowSize.height / 2;
      hole.position.z = depth / 2;

      hole.isVisible = !data.visible;
      hole.metadata = {
        ...data,
        position: hole.position,
      }

      return hole;
    },
  );

  return mesh;
}

function createDiggingParticles(param: CreateHoleParam, scene: Scene) {
  const { data, windowSize } = param;
  const { x, y, width, height } = data;

  // 創建粒子系統
  const particleSystem = new ParticleSystem('particles', 50, scene);

  // 粒子紋理，這可以是方形的小方塊貼圖
  particleSystem.particleTexture = new Texture('/minecraft/textures/block/dirt.png', scene);

  // 設置發射器位置
  particleSystem.emitter = new Vector3(
    x + width / 2 - windowSize.width / 2,
    -y - height / 2 + windowSize.height / 2,
    0
  );

  particleSystem.minEmitBox = new Vector3(-width / 2, -height / 2, 0);
  particleSystem.maxEmitBox = new Vector3(width / 2, height / 2, 0);

  // 粒子顏色
  particleSystem.color1 = new Color4(1, 1, 1, 1);
  particleSystem.color2 = new Color4(0.8, 0.8, 0.8, 1);

  // 粒子大小
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.3;

  // 粒子壽命
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  // 粒子的發射速度
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;

  // 粒子的方向
  particleSystem.direction1 = new Vector3(-1, -1, -1);
  particleSystem.direction2 = new Vector3(1, 1, 1);

  // 粒子的重力影響
  // particleSystem.gravity = new Vector3(0, -9.81, 0);

  // 粒子的發射速率
  particleSystem.emitRate = 100;

  // 啟動粒子系統
  particleSystem.start();

  return particleSystem;
}

export function createHole(param: CreateHoleParam, scene: Scene): Hole {
  const { data } = param;

  const mesh = createMesh(param, scene);
  const diggingParticles = createDiggingParticles(param, scene);

  function setVisible(value: boolean) {
    mesh.isVisible = value;
  }

  return {
    ...pick(data, ['id', 'width', 'height']),
    mesh,
    diggingParticles,
    setVisible,
  };
}

