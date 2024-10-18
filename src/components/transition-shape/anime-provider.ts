import type { Mesh } from '@babylonjs/core'
import type { TransitionType } from './type'
import { Angle } from '@babylonjs/core'
import anime from 'animejs'
import { chunk, filter, flat, isTruthy, map, pipe } from 'remeda'

export function isTypeEnter<
  Name extends TransitionType['name'],
  Action extends (TransitionType & { name: Name })['enter']['action'],
>(
  data: TransitionType,
  name: Name,
  action: Action,
): data is (TransitionType & {
  name: Name;
  enter: { action: Action };
}) {
  return data.name === name && data.enter.action === action
}

export function isTypeLeave<
  Name extends TransitionType['name'],
  Action extends (TransitionType & { name: Name })['leave']['action'],
>(
  data: TransitionType,
  name: Name,
  action: Action,
): data is (TransitionType & {
  name: Name;
  leave: { action: Action };
}) {
  return data.name === name && data.leave.action === action
}

// const testData = {} as TransitionType;
// if (isTypeEnter(testData, 'fence', 'scale-x')) {
//   testData.enter
// }

function isMeshName(name: TransitionType['name']) {
  return (mesh: Mesh) => {
    return mesh.name === name
  }
}

interface Param {
  rect: DOMRect;
  type: TransitionType;
  meshes: Mesh[];
}
type AnimeProvider = (param: Param) => Promise<void>[] | undefined
type Providers = (
  [AnimeProvider, AnimeProvider] | [AnimeProvider]
)[]

/** rect [enter, leave] */
const rectProviders: Providers = [
  // slide-right
  [
    ({ rect, type, meshes }) => {
      const name = 'rect'
      if (!isTypeEnter(type, name, 'slide-right'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [rect.width, 0],
            y: [0, 0],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'rect'
      if (!isTypeLeave(type, name, 'slide-right'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [0, -rect.width],
            y: [0, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
  // slide-left
  [
    ({ rect, type, meshes }) => {
      if (!isTypeEnter(type, 'rect', 'slide-left')) {
        return
      }

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [-rect.width, 0],
            y: [0, 0],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'rect'
      if (!isTypeLeave(type, name, 'slide-left'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [0, rect.width],
            y: [0, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
  // slide-up
  [
    ({ rect, type, meshes }) => {
      if (!isTypeEnter(type, 'rect', 'slide-up')) {
        return
      }

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [-rect.height, 0],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'rect'
      if (!isTypeLeave(type, name, 'slide-up'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [0, rect.height],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
  // slide-down
  [
    ({ rect, type, meshes }) => {
      if (!isTypeEnter(type, 'rect', 'slide-down')) {
        return
      }

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [rect.height, 0],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'rect'
      if (!isTypeLeave(type, name, 'slide-down'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [0, -rect.height],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
  // scale
  [
    ({ type, meshes }) => {
      if (!isTypeEnter(type, 'rect', 'scale')) {
        return
      }

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            y: [0, 1],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ type, meshes }) => {
      const name = 'rect'
      if (!isTypeLeave(type, name, 'scale'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: [1, 0],
            y: [1, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
  // scale-x
  [
    ({ type, meshes }) => {
      if (!isTypeEnter(type, 'rect', 'scale-x'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            y: [1, 1],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ type, meshes }) => {
      const name = 'rect'
      if (!isTypeLeave(type, name, 'scale-x'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: [1, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
  // scale-y
  [
    ({ type, meshes }) => {
      if (!isTypeEnter(type, 'rect', 'scale-y'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: [1, 1],
            y: [0, 1],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ type, meshes }) => {
      const name = 'rect'
      if (!isTypeLeave(type, name, 'scale-y'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName('rect')),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: [1, 1],
            y: [1, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
]
/** convergingRect [enter, leave] */
const convergingRectProviders: Providers = [
  // slide
  [
    ({ rect, type, meshes }) => {
      const name: TransitionType['name'] = 'converging-rect'
      if (!isTypeEnter(type, name, 'slide'))
        return

      const option = type.enter

      const rotate = Angle.FromDegrees(type.enter.angle ?? 0).radians()
      const startX = rect.width + rect.width / 2
      const endX = rect.width / 2

      return pipe(
        meshes,
        filter(isMeshName(name)),
        chunk(2),
        map(([mesh01, mesh02], index) => {
          const delay = option.delay * index

          mesh01.scaling.setAll(1)
          mesh01.position.y = 0
          mesh01.rotation.z = rotate

          const result = [
            anime({
              targets: mesh01.position,
              x: [-startX, -endX],
              ...option,
              delay,
            }).finished,
          ]

          if (mesh02) {
            mesh02.scaling.setAll(1)
            mesh02.position.y = 0
            mesh02.rotation.z = rotate

            result.push(
              anime({
                targets: mesh02.position,
                x: [startX, endX],
                ...option,
                delay,
              }).finished,
            )
          }

          return result
        }),
        flat(),
      )
    },
    ({ rect, type, meshes }) => {
      const name: TransitionType['name'] = 'converging-rect'
      if (!isTypeLeave(type, name, 'slide'))
        return

      const option = type.leave
      const endX = rect.width + rect.width / 2

      return pipe(
        meshes,
        filter(isMeshName(name)),
        chunk(2),
        map(([mesh01, mesh02], index) => {
          const delay = option.delay * (type.colors.length - index)

          mesh01.scaling.setAll(1)
          mesh01.position.y = 0

          const result = [
            anime({
              targets: mesh01.position,
              x: -endX,
              ...option,
              delay,
            }).finished,
          ]

          if (mesh02) {
            mesh02.scaling.setAll(1)
            mesh02.position.y = 0
            result.push(
              anime({
                targets: mesh02.position,
                x: endX,
                ...option,
                delay,
              }).finished,
            )
          }

          return result
        }),
        flat(),
      )
    },
  ],
]

/** round [enter, leave] */
const roundProviders: Providers = [
  // scale
  [
    ({ type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'scale'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter((item) => item.name === name),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            y: [0, 1],
            ...option,
            delay: option.delay * index,
          }).finished
        }),
      )
    },
    ({ type, meshes }) => {
      const name = 'round'
      if (!isTypeLeave(type, name, 'scale'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter((item) => item.name === 'round'),
        map((mesh, index) => {
          mesh.position.setAll(0)

          return anime({
            targets: mesh.scaling,
            x: 0,
            y: 0,
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished
        }),
      )
    },
  ],
  // scale-lb
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'scale-lb'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          mesh.position.x = rect.width / 2
          mesh.position.y = -rect.height / 2
          const delay = option.delay * index

          return [
            anime({
              targets: mesh.scaling,
              x: [0, 1],
              y: [0, 1],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeLeave(type, name, 'scale-lb'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x: rect.width / 2,
              y: -rect.height / 2,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
  ],
  // scale-lt
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'scale-lt'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          mesh.position.x = rect.width / 2
          mesh.position.y = rect.height / 2
          const delay = option.delay * index

          return [
            anime({
              targets: mesh.scaling,
              x: [0, 1],
              y: [0, 1],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeLeave(type, name, 'scale-lt'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          const [x, y] = [
            rect.width / 2,
            rect.height / 2,
          ]
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x,
              y,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
  ],
  // scale-rb
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'scale-rb'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          mesh.position.x = -rect.width / 2
          mesh.position.y = -rect.height / 2
          const delay = option.delay * index

          return [
            anime({
              targets: mesh.scaling,
              x: [0, 1],
              y: [0, 1],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeLeave(type, name, 'scale-rb'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          const [x, y] = [
            -rect.width / 2,
            -rect.height / 2,
          ]
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x,
              y,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
  ],
  // scale-rt
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'scale-rt'))
        return

      const option = type.enter

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          mesh.position.x = -rect.width / 2
          mesh.position.y = rect.height / 2
          const delay = option.delay * index

          return [
            anime({
              targets: mesh.scaling,
              x: [0, 1],
              y: [0, 1],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeLeave(type, name, 'scale-rt'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, index) => {
          const [x, y] = [
            -rect.width / 2,
            rect.height / 2,
          ]
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: 0,
              y: 0,
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x,
              y,
              ...option,
              delay,
            }).finished,
          ]
        }),
        flat(),
      )
    },
  ],

  // spread-left
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'spread-left'))
        return

      const option = type.enter

      /** 外接圓直徑 */
      const diameter = Math.sqrt(
        rect.width ** 2 + rect.height ** 2,
      )

      const offset = diameter / type.colors.length

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.scaling.setAll(1)
          mesh.position.y = 0

          const delay = option.delay * i

          return anime({
            targets: mesh.position,
            x: [-diameter, -i * offset],
            ...option,
            delay,
          }).finished
        }),
      )
    },
  ],
  // spread-right
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'spread-right'))
        return

      const option = type.enter

      /** 外接圓直徑 */
      const diameter = Math.sqrt(
        rect.width ** 2 + rect.height ** 2,
      )

      const offset = diameter / type.colors.length

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.scaling.setAll(1)
          mesh.position.y = 0

          const delay = option.delay * i

          return anime({
            targets: mesh.position,
            x: [diameter, i * offset],
            ...option,
            delay,
          }).finished
        }),
      )
    },
  ],
  // spread-up
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'spread-up'))
        return

      const option = type.enter

      /** 外接圓直徑 */
      const diameter = Math.sqrt(
        rect.width ** 2 + rect.height ** 2,
      )

      const offset = diameter / (type.colors.length + 1)

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.scaling.setAll(1)
          mesh.position.x = 0

          const delay = option.delay * i

          return anime({
            targets: mesh.position,
            y: [diameter, i * offset],
            ...option,
            delay,
          }).finished
        }),
      )
    },
  ],
  // spread-down
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'spread-down'))
        return

      const option = type.enter

      /** 外接圓直徑 */
      const diameter = Math.sqrt(
        rect.width ** 2 + rect.height ** 2,
      )

      const offset = diameter / (type.colors.length + 1)

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.scaling.setAll(1)
          mesh.position.x = 0

          const delay = option.delay * i

          return anime({
            targets: mesh.position,
            y: [-diameter, -i * offset],
            ...option,
            delay,
          }).finished
        }),
      )
    },
  ],
  // spread-scale
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (!isTypeEnter(type, name, 'spread-scale'))
        return

      const option = type.enter

      const offset = 1 / type.colors.length

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.position.setAll(0)

          const delay = option.delay * i

          return anime({
            targets: mesh.scaling,
            x: [0, 1 - i * offset],
            y: [0, 1 - i * offset],
            ...option,
            delay,
          }).finished
        }),
      )
    },
  ],
]
/** fence [enter, leave] */
const fenceProviders: Providers = [
  // spread-left
  [
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeEnter(type, name, 'spread-left'))
        return

      const option = type.enter

      const { width } = rect
      const eachWidth = width / type.colors.length
      const oriX = width / 2 + eachWidth / 2

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.position.y = 0
          mesh.scaling.setAll(1)

          const x = [
            oriX,
            i * eachWidth - width / 2 + eachWidth / 2,
          ]

          return anime({
            targets: mesh.position,
            x,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeLeave(type, name, 'spread-left'))
        return

      const option = type.leave

      const { width } = rect
      const eachWidth = width / type.colors.length
      const oriX = width / 2 + eachWidth / 2

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.position.y = 0
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: oriX,
            ...option,
            delay: option.delay * i,
          }).finished
        }),
      )
    },
  ],
  // spread-right
  [
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeEnter(type, name, 'spread-right'))
        return

      const option = type.enter

      const { width } = rect
      const eachWidth = width / type.colors.length
      const oriX = width / 2 + eachWidth / 2

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.position.y = 0
          mesh.scaling.setAll(1)

          const x = [
            -oriX,
            i * eachWidth - width / 2 + eachWidth / 2,
          ]

          return anime({
            targets: mesh.position,
            x,
            ...option,
            delay: option.delay * i,
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeLeave(type, name, 'spread-right'))
        return

      const option = type.leave

      const { width } = rect
      const eachWidth = width / type.colors.length
      const oriX = width / 2 + eachWidth / 2

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.position.y = 0
          mesh.scaling.setAll(1)

          return anime({
            targets: mesh.position,
            x: -oriX,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished
        }),
      )
    },
  ],
  // scale-y
  [
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeEnter(type, name, 'scale-y'))
        return

      const option = type.enter

      const { width } = rect
      const eachWidth = width / type.colors.length

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.position.x = i * eachWidth - width / 2 + eachWidth / 2
          mesh.scaling.x = 1

          return anime({
            targets: mesh.scaling,
            y: [0, 1],
            ...option,
            delay: option.delay * i,
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeLeave(type, name, 'scale-y'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          return anime({
            targets: mesh.scaling,
            y: 0,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished
        }),
      )
    },
  ],
  // scale-x
  [
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeEnter(type, name, 'scale-x'))
        return

      const option = type.enter

      const { width } = rect
      const eachWidth = width / type.colors.length

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          mesh.position.x = i * eachWidth - width / 2 + eachWidth / 2
          mesh.scaling.y = 1

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            ...option,
            delay: option.delay * i,
          }).finished
        }),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence'
      if (!isTypeLeave(type, name, 'scale-x'))
        return

      const option = type.leave

      return pipe(
        meshes,
        filter(isMeshName(name)),
        map((mesh, i) => {
          return anime({
            targets: mesh.scaling,
            x: 0,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished
        }),
      )
    },
  ],
]

const list = [
  ...rectProviders,
  ...convergingRectProviders,
  ...roundProviders,
  ...fenceProviders,
]
export const animeEnterProviders: AnimeProvider[] = pipe(
  list,
  map(([enter]) => enter),
)
export const animeLeaveProviders: AnimeProvider[] = pipe(
  list,
  map(([, leave]) => leave),
  filter(isTruthy),
)
