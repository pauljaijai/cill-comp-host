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
        return anime({
          targets: mesh.position,
          x: [rect.width, 0],
          duration: option.duration,
          easing: option.easing,
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
        return anime({
          targets: mesh.position,
          x: [-rect.width, 0],
          duration: option.duration,
          easing: option.easing,
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
        return anime({
          targets: mesh.position,
          x: -rect.width,
          duration: option.duration,
          easing: option.easing,
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
        return anime({
          targets: mesh.position,
          x: rect.width,
          duration: option.duration,
          easing: option.easing,
          delay: option.delay * (type.colors.length - index),
        }).finished;
      })
    )
  },
];