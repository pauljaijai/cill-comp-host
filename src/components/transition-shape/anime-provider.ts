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
/** 進入動畫 */
export const animeInProviders: AnimeProvider[] = [
  // rect slide-right
  ({ rect, type, meshes }) => {
    const option = type.enter;
    if (type.shape !== 'rect' || option.action !== 'slide-right')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect slide-left
  ({ rect, type, meshes }) => {
    const option = type.enter;
    if (type.shape !== 'rect' || option.action !== 'slide-left')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect slide-up
  ({ rect, type, meshes }) => {
    const option = type.enter;
    if (type.shape !== 'rect' || option.action !== 'slide-up')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect slide-down
  ({ rect, type, meshes }) => {
    const option = type.enter;
    if (type.shape !== 'rect' || option.action !== 'slide-down')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect scale
  ({ rect, type, meshes }) => {
    const option = type.enter;
    if (type.shape !== 'rect' || option.action !== 'scale')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
];
/** 離開動畫 */
export const animeOutProviders: AnimeProvider[] = [
  // rect slide-right
  ({ rect, type, meshes }) => {
    const option = type.leave;
    if (type.shape !== 'rect' || option.action !== 'slide-right')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect slide-left
  ({ rect, type, meshes }) => {
    const option = type.leave;
    if (type.shape !== 'rect' || option.action !== 'slide-left')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect slide-up
  ({ rect, type, meshes }) => {
    const option = type.leave;
    if (type.shape !== 'rect' || option.action !== 'slide-up')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect slide-down
  ({ rect, type, meshes }) => {
    const option = type.leave;
    if (type.shape !== 'rect' || option.action !== 'slide-down')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
  // rect scale
  ({ rect, type, meshes }) => {
    const option = type.leave;
    if (type.shape !== 'rect' || option.action !== 'scale')
      return;

    return pipe(meshes,
      filter((item) => item.name.includes('rect')),
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
];