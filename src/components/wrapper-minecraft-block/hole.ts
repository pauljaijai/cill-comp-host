import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from "@babylonjs/core";
import { BusData } from "./type";
import { pick, pipe } from "remeda";

type ElData = Extract<BusData, { type: 'add' }>

export interface Hole {
  id: string
  width: number;
  height: number;
  mesh: Mesh;
  setVisible: (value: boolean) => void;
}

interface CreateHoleParam {
  data: ElData;
  windowSize: { width: number; height: number };
}

export function createHole(param: CreateHoleParam, scene: Scene): Hole {
  const { data } = param;

  const mesh = createMesh(param, scene);

  function setVisible(value: boolean) {
    mesh.isVisible = value;
  }

  return {
    ...pick(data, ['id', 'width', 'height']),
    mesh,
    setVisible,
  };
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