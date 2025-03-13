<template>
  <div
    ref="containerRef"
    class="relative"
  >
    <div :style="bodyStyle">
      <slot />
    </div>

    <!-- <canvas
      ref="canvasRef"
      class="pointer-events-none absolute inset-0 bg-transparent"
    /> -->
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useElementBounding, useMouse, useRafFn, useWindowScroll } from '@vueuse/core'
import Matter, { Bodies, Composite, Engine, Runner } from 'matter-js'
import { pipe } from 'remeda'
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef } from 'vue'
import { PidController } from '../../common/pid-controller'

// #region Props
interface Props {
  enable?: boolean;
}
// #endregion Props

// #region Slots
interface Slots {
  default?: () => unknown;
}
// #endregion Slots

const props = withDefaults(defineProps<Props>(), {
  enable: false,
})

defineSlots<Slots>()

const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()
const containerBounding = reactive(
  useElementBounding(containerRef),
)

const engine = shallowRef(Engine.create({
  gravity: { scale: 0 },
}))
const runner = shallowRef(Runner.create())

const bodyStyle = ref<CSSProperties>({})
/** body 初始值，方便計算偏移量 */
let bodyInitPosition = { x: 0, y: 0 }

const mouse = reactive(useMouse())
const windowScroll = reactive(useWindowScroll())
const cursorBody = shallowRef<Matter.Body>()

/** 建立一個持續跟隨滑鼠的圓形 */
function createCursorBody() {
  const radius = Math.min(
    containerBounding.width,
    containerBounding.height,
  ) * 1.1

  const ball = Bodies.circle(-100, -100, radius, {
    isStatic: true,
  })

  Composite.add(engine.value.world, ball)

  return ball
}
function init() {
  const wrappedBody = pipe(
    undefined,
    () => {
      const elRect = containerRef.value?.getBoundingClientRect()
      if (!elRect) {
        return
      }

      /**
       * elRect 的 xy 是相對於網頁左上角為 0 點，
       * 所以要先減去 container 的 x, y 來取得相對於
       * container 的 x, y，再加上 width, height 的
       * 一半，偏移自身中心
       */
      const { x, y } = {
        x: elRect.x - containerBounding.x + elRect.width / 2,
        y: elRect.y - containerBounding.y + elRect.height / 2,
      }

      bodyInitPosition = { x, y }

      const body = Bodies.rectangle(
        x,
        y,
        containerBounding.width,
        containerBounding.height,
        {
          label: 'body',
          friction: 0,
          frictionAir: 0.05,
        },
      )

      const constraint = Matter.Constraint.create({
        bodyA: body,
        pointB: { x, y },
        stiffness: 0.02,
      })

      return [body, constraint]
    },
  )
  if (wrappedBody) {
    Composite.add(engine.value.world, wrappedBody)
  }

  cursorBody.value = createCursorBody()

  // const { width, height } = containerRef.value?.getBoundingClientRect() ?? {
  //   width: 0,
  //   height: 0,
  // }

  // const render = Render.create({
  //   canvas: canvasRef.value,
  //   engine: engine.value,
  //   bounds: {
  //     min: { x: 0, y: 0 },
  //     max: { x: width, y: height },
  //   },
  //   options: {
  //     width,
  //     height,
  //     background: 'transparent',
  //     wireframeBackground: 'transparent',
  //     // showPerformance: true,
  //   },
  // })

  // Render.run(render)
}

function start() {
  Runner.run(runner.value, engine.value)
}
function clear() {
  Composite.clear(engine.value.world, true)
  Engine.clear(engine.value)
  Runner.stop(runner.value)
}

function isSmallEnough(value: number) {
  return Math.abs(value) < 0.05
}

const pidController = new PidController()

/** 持續更新狀態 */
useRafFn(() => {
  const body = Composite
    .allBodies(engine.value.world)
    .find((body) => body.label === 'body')

  if (!cursorBody.value || !body) {
    return
  }

  // 更新 cursor 位置
  if (props.enable) {
    Matter.Body.setPosition(cursorBody.value, {
      x: mouse.x - containerBounding.x - windowScroll.x,
      y: mouse.y - containerBounding.y - windowScroll.y,
    })
  }
  else {
    if (!cursorBody.value.isSleeping) {
      Matter.Sleeping.set(cursorBody.value, true)
    }
  }

  /** 轉正物體 */
  if (Math.abs(body.angle) > 0.0001) {
    Matter.Body.setAngularVelocity(body, body.angularVelocity - body.angle * 0.01)
  }

  const rotate = body.angle * 180 / Math.PI

  const offsetX = body.position.x - bodyInitPosition.x
  const offsetY = body.position.y - bodyInitPosition.y

  if (
    isSmallEnough(offsetX)
    && isSmallEnough(offsetY)
    && isSmallEnough(rotate)
    && isSmallEnough(body.angularVelocity)
  ) {
    bodyStyle.value = {}
    Matter.Body.setAngle(body, 0)
    Matter.Body.setAngularVelocity(body, 0)
    return
  }

  bodyStyle.value = {
    transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
  }
})

onMounted(() => {
  init()
  start()
})

onBeforeUnmount(() => {
  clear()
})
</script>

<style scoped lang="sass">
</style>
