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
  const { scene } = params

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
  const { canvas, scene } = params

  const particleSystem = new ParticleSystem(
    'snow',
    2000,
    scene,
  )

  const { width, height } = canvas
  particleSystem.particleTexture = new Texture('/textures/snow.png')

  particleSystem.emitter = new Vector3(0, height / 2, 0)
  particleSystem.emitRate = 100

  const maxSpeed = height / 8
  const maxXSpeed = maxSpeed / 4
  const x = width / 2
  particleSystem.createBoxEmitter(
    new Vector3(maxXSpeed, -maxSpeed, maxXSpeed),
    new Vector3(-maxXSpeed, -maxSpeed / 2, -maxXSpeed),
    new Vector3(x, 0, 0),
    new Vector3(-x, 0, 0),
  )

  particleSystem.minLifeTime = maxSpeed / 2
  particleSystem.maxSize = 6
  particleSystem.minSize = 2

  particleSystem.color1 = new Color4(1, 1, 1, 1)
  particleSystem.color2 = new Color4(0.9, 0.9, 0.9, 1)
  particleSystem.colorDead = new Color4(1, 1, 1, 0)
  particleSystem.blendMode = ParticleSystem.BLENDMODE_MULTIPLYADD

  particleSystem.updateFunction = function (particles) {
    for (let index = 0; index < particles.length; index++) {
      const particle = particles[index]
      if (!particle)
        continue

      /** 依照文件作法
       *
       * https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/customizingParticles/
       */

      // @ts-expect-error 依照文件寫法
      particle.age += this._scaledUpdateSpeed

      // 刪除粒子
      if (particle.age >= particle.lifeTime) {
        particles.splice(index, 1)
        // @ts-expect-error 依照文件寫法
        this._stockParticles.push(particle)
        index--
        continue
      }
      else {
        // @ts-expect-error 依照文件寫法
        particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep)
        // @ts-expect-error 依照文件寫法
        particle.color.addInPlace(this._scaledColorStep)

        if (particle.color.a < 0)
          particle.color.a = 0

        // @ts-expect-error 依照文件寫法
        particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection)
        // @ts-expect-error 依照文件寫法
        particle.position.addInPlace(this._scaledDirection)

        // @ts-expect-error 依照文件寫法
        particle.direction.addInPlace(this._scaledGravity)
      }
    }
  }

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
