import type { Camera } from '@babylonjs/core'
import { ArcRotateCamera, Color4, Engine, ParticleSystem, Scene, Texture, Vector3 } from '@babylonjs/core'
import * as Comlink from 'comlink'

let scene: Scene | undefined
let engine: Engine | undefined
let camera: Camera | undefined

function createEngine(
  params: {
    canvas: OffscreenCanvas;
  },
) {
  const { canvas } = params

  return new Engine(canvas, false)
}
function createScene(
  params: {
    canvas: OffscreenCanvas;
    engine: Engine;
  },
) {
  const { engine } = params

  const scene = new Scene(engine)
  scene.clearColor = new Color4(0, 0, 0, 0.01)

  return scene
}
function createCamera(
  params: {
    canvas: OffscreenCanvas;
    engine: Engine;
    scene: Scene;
  },
) {
  const { canvas, scene } = params

  const camera = new ArcRotateCamera(
    'ArcRotateCamera',
    Math.PI / 2,
    Math.PI / 2,
    1080,
    new Vector3(0, 0, 0),
    scene,
  )

  return camera
}

async function initParticleSystem(
  params: {
    canvas: OffscreenCanvas;
    engine: Engine;
    scene: Scene;
  },
) {
  const { scene } = params

  const particleSystem = new ParticleSystem(
    'snow',
    20000,
    scene,
  )

  const width = 1920
  const height = 1080

  particleSystem.particleTexture = new Texture('/textures/dot.png')

  particleSystem.emitter = new Vector3(0, 200, 0)
  particleSystem.emitRate = 100

  particleSystem.minLifeTime = 30

  particleSystem.minSize = 10

  particleSystem.direction1 = new Vector3(-width / 5, -height / 4, 0)
  particleSystem.direction2 = new Vector3(width / 5, -height / 4, 0)

  particleSystem.color1 = new Color4(0.8, 0.8, 0.8, 1)
  particleSystem.colorDead = new Color4(1, 1, 1, 0)

  particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD

  particleSystem.start()
}

async function init(canvas: OffscreenCanvas) {
  engine = createEngine({
    canvas,
  })
  const newScene = createScene({
    canvas,
    engine,
  })
  scene = newScene

  camera = createCamera({
    canvas,
    engine,
    scene,
  })

  engine.runRenderLoop(() => {
    newScene.render()
  })

  await initParticleSystem({
    canvas,
    engine,
    scene: newScene,
  })
}

const api = {
  /** 一定要使用 Comlink.transfer 傳遞資料
   *
   * @example
   * ```ts
   * remoteWorker.init(Comlink.transfer(offscreen, [offscreen])
   * ```
   *
   */
  init,
  getFps() {
    return engine?.getFps().toFixed() ?? '0'
  },
}

Comlink.expose(api)

export type WorkerApi = typeof api
