import { Mesh } from "@babylonjs/core";
import { TransitionType } from "./type";
import anime from "animejs";
import { filter, flatten, map, pipe } from "remeda";

interface Param {
  rect: DOMRect;
  type: TransitionType;
  meshes: Mesh[];
}
type AnimeProvider = (param: Param) => Promise<void>[] | undefined;

/** rect [enter, leave] */
const rectProviders: [AnimeProvider, AnimeProvider][] = [
  // slide-right
  [
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.enter.action !== 'slide-right')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [rect.width, 0],
            y: [0, 0],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.leave.action !== 'slide-right')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [0, -rect.width],
            y: [0, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
  // slide-left
  [
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.enter.action !== 'slide-left')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [-rect.width, 0],
            y: [0, 0],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.leave.action !== 'slide-left')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [0, rect.width],
            y: [0, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
  // slide-up
  [
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.enter.action !== 'slide-up')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [-rect.height, 0],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.leave.action !== 'slide-up')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [0, rect.height],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
  // slide-down
  [
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.enter.action !== 'slide-down')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [rect.height, 0],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      if (type.name !== 'rect' || type.leave.action !== 'slide-down')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: [0, 0],
            y: [0, -rect.height],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
  // scale
  [
    ({ type, meshes }) => {
      if (type.name !== 'rect' || type.enter.action !== 'scale')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            y: [0, 1],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ type, meshes }) => {
      const option = type.leave;
      if (type.name !== 'rect' || option.action !== 'scale')
        return;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [1, 0],
            y: [1, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
  // scale-x
  [
    ({ type, meshes }) => {
      if (type.name !== 'rect' || type.enter.action !== 'scale-x')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            y: [1, 1],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ type, meshes }) => {
      if (type.name !== 'rect' || type.leave.action !== 'scale-x')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [1, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
  // scale-y
  [
    ({ type, meshes }) => {
      if (type.name !== 'rect' || type.enter.action !== 'scale-y')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [1, 1],
            y: [0, 1],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ type, meshes }) => {
      if (type.name !== 'rect' || type.leave.action !== 'scale-y')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === 'rect'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [1, 1],
            y: [1, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
]
/** round [enter, leave] */
const roundProviders: [AnimeProvider, AnimeProvider][] = [
  // scale
  [
    ({ type, meshes }) => {
      if (type.name !== 'round' || type.enter.action !== 'scale')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === 'round'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            y: [0, 1],
            ...option,
            delay: option.delay * index,
          }).finished;
        })
      )
    },
    ({ type, meshes }) => {
      if (type.name !== 'round' || type.leave.action !== 'scale')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === 'round'),
        map.indexed((mesh, index) => {
          mesh.position.setAll(0);

          return anime({
            targets: mesh.scaling,
            x: [1, 0],
            y: [1, 0],
            ...option,
            delay: option.delay * (type.colors.length - index),
          }).finished;
        })
      )
    },
  ],
  // scale-lb
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.enter.action !== 'scale-lb')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          mesh.position.x = rect.width / 2;
          mesh.position.y = -rect.height / 2;
          const delay = option.delay * index;

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
            }).finished
          ];
        }),
        flatten(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.leave.action !== 'scale-lb')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: [1, 0],
              y: [1, 0],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x: [0, rect.width / 2],
              y: [0, -rect.height / 2],
              ...option,
              delay,
            }).finished
          ];
        }),
        flatten(),
      )
    },
  ],
  // scale-lt
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.enter.action !== 'scale-lt')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          mesh.position.x = rect.width / 2;
          mesh.position.y = rect.height / 2;
          const delay = option.delay * index;

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
            }).finished
          ];
        }),
        flatten(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.leave.action !== 'scale-lt')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          const [x, y] = [
            rect.width / 2,
            rect.height / 2
          ]
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: [1, 0],
              y: [1, 0],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x, y,
              ...option,
              delay,
            }).finished
          ];
        }),
        flatten(),
      )
    },
  ],
  // scale-rb
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.enter.action !== 'scale-rb')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          mesh.position.x = -rect.width / 2;
          mesh.position.y = -rect.height / 2;
          const delay = option.delay * index;

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
            }).finished
          ];
        }),
        flatten(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.leave.action !== 'scale-rb')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          const [x, y] = [
            -rect.width / 2,
            -rect.height / 2
          ]
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: [1, 0],
              y: [1, 0],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x, y,
              ...option,
              delay,
            }).finished
          ];
        }),
        flatten(),
      )
    },
  ],
  // scale-rt
  [
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.enter.action !== 'scale-rt')
        return;
      const option = type.enter;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          mesh.position.x = -rect.width / 2;
          mesh.position.y = rect.height / 2;
          const delay = option.delay * index;

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
            }).finished
          ];
        }),
        flatten(),
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'round'
      if (type.name !== name || type.leave.action !== 'scale-rt')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, index) => {
          const [x, y] = [
            -rect.width / 2,
            rect.height / 2
          ]
          const delay = option.delay * (type.colors.length - index)

          return [
            anime({
              targets: mesh.scaling,
              x: [1, 0],
              y: [1, 0],
              ...option,
              delay,
            }).finished,
            anime({
              targets: mesh.position,
              x, y,
              ...option,
              delay,
            }).finished
          ];
        }),
        flatten(),
      )
    },
  ],
]
/** fence [enter, leave] */
const fenceProviders: [AnimeProvider, AnimeProvider][] = [
  // spread-left
  [
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.enter.action !== 'spread-left')
        return;
      const option = type.enter;

      const { width } = rect;
      const eachWidth = width / type.colors.length;
      const oriX = width / 2 + eachWidth / 2;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          mesh.position.y = 0;
          mesh.scaling.setAll(1);

          const x = [
            oriX,
            i * eachWidth - width / 2 + eachWidth / 2,
          ];

          return anime({
            targets: mesh.position,
            x,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.leave.action !== 'spread-left')
        return;
      const option = type.leave;

      const { width } = rect;
      const eachWidth = width / type.colors.length;
      const oriX = width / 2 + eachWidth / 2;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          mesh.position.y = 0;
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: oriX,
            ...option,
            delay: option.delay * i,
          }).finished;
        })
      )
    },
  ],
  // spread-right
  [
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.enter.action !== 'spread-right')
        return;
      const option = type.enter;

      const { width } = rect;
      const eachWidth = width / type.colors.length;
      const oriX = width / 2 + eachWidth / 2;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          mesh.position.y = 0;
          mesh.scaling.setAll(1);

          const x = [
            -oriX,
            i * eachWidth - width / 2 + eachWidth / 2,
          ];

          return anime({
            targets: mesh.position,
            x,
            ...option,
            delay: option.delay * i,
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.leave.action !== 'spread-right')
        return;
      const option = type.leave;

      const { width } = rect;
      const eachWidth = width / type.colors.length;
      const oriX = width / 2 + eachWidth / 2;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          mesh.position.y = 0;
          mesh.scaling.setAll(1);

          return anime({
            targets: mesh.position,
            x: -oriX,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished;
        })
      )
    },
  ],
  // scale-y
  [
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.enter.action !== 'scale-y')
        return;
      const option = type.enter;

      const { width } = rect;
      const eachWidth = width / type.colors.length;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          mesh.position.x = i * eachWidth - width / 2 + eachWidth / 2;
          mesh.scaling.x = 1;

          return anime({
            targets: mesh.scaling,
            y: [0, 1],
            ...option,
            delay: option.delay * i,
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.leave.action !== 'scale-y')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          return anime({
            targets: mesh.scaling,
            y: 0,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished;
        })
      )
    },
  ],
  // scale-x
  [
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.enter.action !== 'scale-x')
        return;
      const option = type.enter;

      const { width } = rect;
      const eachWidth = width / type.colors.length;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          mesh.position.x = i * eachWidth - width / 2 + eachWidth / 2;
          mesh.scaling.y = 1;

          return anime({
            targets: mesh.scaling,
            x: [0, 1],
            ...option,
            delay: option.delay * i,
          }).finished;
        })
      )
    },
    ({ rect, type, meshes }) => {
      const name = 'fence';
      if (type.name !== name || type.leave.action !== 'scale-x')
        return;
      const option = type.leave;

      return pipe(meshes,
        filter((item) => item.name === name),
        map.indexed((mesh, i) => {
          return anime({
            targets: mesh.scaling,
            x: 0,
            ...option,
            delay: option.delay * (type.colors.length - i),
          }).finished;
        })
      )
    },
  ],
]

const list = [
  ...rectProviders,
  ...roundProviders,
  ...fenceProviders,
]
export const animeEnterProviders: AnimeProvider[] = pipe(
  list, map(([enter]) => enter),
);
export const animeLeaveProviders: AnimeProvider[] = pipe(
  list, map(([, leave]) => leave),
);