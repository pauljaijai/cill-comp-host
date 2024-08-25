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
  console.log(`🚀 ~ data:`, data);

  const particleSystem = new ParticleSystem('particles', 2000, scene);

  //Texture of each particle
  particleSystem.particleTexture = new Texture('/textures/flare.png', scene);

  particleSystem.emitter = new Vector3(
    x + width / 2,
    -y - height / 2,
    10
  );

  particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
  particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
  particleSystem.colorDead = new Color4(0, 0, 0.2, 0.0);

  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;

  // Life time of each particle (random between...
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  // Emission rate
  particleSystem.emitRate = 1000;


  /******* Emission Space ********/
  particleSystem.createPointEmitter(
    new Vector3(-7, 8, 3), new Vector3(7, 8, -3)
  );

  // Speed
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.005;

  // Start the particle system
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

