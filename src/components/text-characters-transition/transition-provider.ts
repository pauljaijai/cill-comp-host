import { AnimeFuncParam } from "./type";

export enum TransitionName {
  /** 淡入淡出 */
  FADE = 'fade',
}

export const transitionProvider: Record<
  TransitionName, {
    enter: AnimeFuncParam;
    leave: AnimeFuncParam;
  }
> = {
  [TransitionName.FADE]: {
    enter: (i) => ({
      opacity: 1,
      delay: i * 50,
    }),
    leave: (i) => ({
      opacity: 0,
      delay: i * 50,
    }),
  }
}