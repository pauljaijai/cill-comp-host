import { Mesh } from "@babylonjs/core";
import { TransitionType } from "./type";
import anime from "animejs";
import { filter, map, pipe } from "remeda";

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
      if (type.name !== 'round' || type.enter.action === 'scale')
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
      if (type.name !== 'round' || type.leave.action === 'scale')
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
  // scale
  [
    ({ type, meshes }) => {
      if (type.name !== 'round' || type.enter.action === 'slide-lb')
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
      const option = type.leave;
      if (type.name !== 'round' || option.action !== 'scale')
        return;

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
]

const list = [
  ...rectProviders,
  ...roundProviders,
]
export const animeEnterProviders: AnimeProvider[] = pipe(
  list,
  map(([enter]) => enter),
);
export const animeLeaveProviders: AnimeProvider[] = pipe(
  list,
  map(([, leave]) => leave),
);