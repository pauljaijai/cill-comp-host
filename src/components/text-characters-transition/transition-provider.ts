import anime from "animejs";
import { AnimeFuncParam } from "./type";
import { sample } from "remeda";

export enum TransitionName {
  FADE = 'fade',
  BLUR = 'blur',
  CLIP_RIGHT = 'clip-right',
  RANDOM_SPIN = 'random-spin',
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
  },
  [TransitionName.BLUR]: {
    enter: (i) => ({
      opacity: 1,
      filter: ['blur(10px)', 'blur(0px)'],
      delay: i * 100,
      easing: 'easeOutCirc',
    }),
    leave: (i) => ({
      opacity: 0,
      filter: ['blur(0px)', 'blur(10px)'],
      delay: i * 100,
      easing: 'easeInCirc',
    }),
  },
  [TransitionName.CLIP_RIGHT]: {
    enter: (i) => ({
      opacity: 1,
      clipPath: [
        'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      ],
      delay: i * 10,
      easing: 'easeInOutCirc',
    }),
    leave: (i) => ({
      opacity: 1,
      clipPath: [
        'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      ],
      delay: i * 10,
      easing: 'easeInOutCirc',
    }),
  },
  [TransitionName.RANDOM_SPIN]: {
    enter: (i) => ({
      opacity: 1,
      rotate: () => 0,
      delay: i * 10,
      easing: 'easeInOutCirc',
    }),
    leave: (i) => ({
      opacity: 1,
      rotate: () => anime.random(270, 60) * sample([-1, 1] as const, 1)[0],
      delay: i * 10,
      easing: 'easeInOutCirc',
    }),
  },
}

// anime({
//   targets: target,
//   opacity: [0, 1],
//   translateX: () => [
//     anime.random(-30, -10),
//     0,
//   ],
//   translateY: () => [
//     anime.random(-20, 20),
//     0,
//   ],
//   rotate: () => [
//     anime.random(-30, 30),
//     0,
//   ],
//   filter: ['blur(10px)', 'blur(0px)'],
//   delay: (el, i) => i * 100,
//   easing: 'easeOutCirc',
// });