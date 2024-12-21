import type { ElementBounding } from './bg-snow-store'
import { Camera, Color4, Engine, FreeCamera, ParticleSystem, Scene, Texture, Vector3 } from '@babylonjs/core'
import * as Comlink from 'comlink'
import { get, set } from 'lodash-es'

let canvas: OffscreenCanvas | undefined
let scene: Scene | undefined
let engine: Engine | undefined
let camera: Camera | undefined
let particleSystem: ParticleSystem | undefined

let staticMap: Record<string, ElementBounding> = {}
const STATIC_ID_NAME = 'staticId'

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
  const { scene, canvas } = params
  const { width, height } = canvas

  const camera = new FreeCamera(
    'camera',
    new Vector3(width / 2, -height / 2, -height),
    scene,
  )
  camera.mode = Camera.ORTHOGRAPHIC_CAMERA

  return camera
}

async function createParticleSystem(
  params: {
    canvas: OffscreenCanvas;
    engine: Engine;
    scene: Scene;
  },
) {
  const { canvas, scene } = params

  const particleSystem = new ParticleSystem(
    'snow',
    5000,
    scene,
  )

  const { width, height } = canvas
  particleSystem.particleTexture = new Texture('/textures/snow.png')

  particleSystem.emitter = new Vector3(0, 0, 0)
  particleSystem.emitRate = 100

  const maxSpeed = height / 8
  const maxXSpeed = maxSpeed / 4
  particleSystem.createBoxEmitter(
    new Vector3(maxXSpeed, -maxSpeed, maxXSpeed),
    new Vector3(-maxXSpeed, -maxSpeed / 2, -maxXSpeed),
    new Vector3(0, 0, 0),
    new Vector3(width, 0, 0),
  )

  particleSystem.minLifeTime = maxSpeed / 2
  particleSystem.maxSize = 4
  particleSystem.minSize = 1

  particleSystem.color1 = new Color4(1, 1, 1, 1)
  particleSystem.color2 = new Color4(0.9, 0.9, 0.9, 1)
  particleSystem.colorDead = new Color4(1, 1, 1, 0)
  particleSystem.blendMode = ParticleSystem.BLENDMODE_MULTIPLYADD

  particleSystem.updateFunction = function (particles) {
    // 計算 staticMap 與粒子是否有碰撞
    for (const id in staticMap) {
      const bounding = staticMap[id]
      if (!bounding)
        continue

      /** 依照文件作法更新粒子
       *
       * https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/customizingParticles/
       */
      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index]
        if (!particle)
          continue

        // 壽命終結
        if (particle.age >= particle.lifeTime) {
          particles.splice(index, 1)
          set(particle, STATIC_ID_NAME, undefined)

          // @ts-expect-error 依照文件寫法
          this._stockParticles.push(particle)
          index--
          continue
        }

        // @ts-expect-error 依照文件寫法
        particle.age += this._scaledUpdateSpeed

        // 是否黏附
        const targetId = get(particle, STATIC_ID_NAME)
        if (targetId === id) {
          particle.position.y = bounding.top * -1
          particle.direction = new Vector3(0, 0, 0)
          continue
        }

        // 目前網頁 y 軸與 babylon y 軸相反
        const y = particle.position.y * -1

        // 碰到上邊界 +- 2
        if (
          y > bounding.top - 2
          && y < bounding.top + 2
          && particle.position.x > bounding.left
          && particle.position.x < bounding.left + bounding.width
        ) {
          particle.position.y = bounding.top * -1
          particle.direction = new Vector3(0, 0, 0)

          // 黏附在 static 上
          set(particle, STATIC_ID_NAME, id)
          continue
        }

        // 更新粒子狀態
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

  return particleSystem
}

async function init(offscreenCanvas: OffscreenCanvas) {
  canvas = offscreenCanvas

  engine = createEngine({
    canvas: offscreenCanvas,
  })
  const newScene = createScene({
    canvas: offscreenCanvas,
    engine,
  })
  scene = newScene

  camera = createCamera({
    canvas: offscreenCanvas,
    engine,
    scene,
  })

  engine.runRenderLoop(() => {
    newScene.render()
  })

  particleSystem = await createParticleSystem({
    canvas: offscreenCanvas,
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
  resize(size: { width: number; height: number }) {
    if (canvas) {
      canvas.width = size.width
      canvas.height = size.height
    }

    engine?.resize()
  },
  setStaticMap(data: typeof staticMap) {
    staticMap = data
  },
  /** 清除積雪 */
  sweep() {
    if (!particleSystem)
      return

    for (let index = 0; index < particleSystem.particles.length; index++) {
      const particle = particleSystem.particles[index]
      if (!particle)
        continue

      const targetId = get(particle, STATIC_ID_NAME)
      if (targetId) {
        particleSystem.particles.splice(index, 1)
        set(particle, STATIC_ID_NAME, undefined)

        // @ts-expect-error 依照文件寫法
        particleSystem._stockParticles.push(particle)
        index--
      }
    }
  },
}

Comlink.expose(api)

export type WorkerApi = typeof api
