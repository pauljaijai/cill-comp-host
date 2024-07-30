import anime from "animejs";
import { AnimeFuncParam } from "./type";
import { sample } from "remeda";

export enum TransitionName {
  FADE = 'fade',
  BLUR = 'blur',
  CLIP_RIGHT = 'clip-right',
  RANDOM_SPIN = 'random-spin',
  LANDING = 'landing',
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
      clipPath: [
        'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      ],
      delay: i * 10,
      easing: 'easeInOutCirc',
    }),
    leave: (i) => ({
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
      rotate: () => 0,
      duration: 1200,
      delay: i * 50,
    }),
    leave: (i) => ({
      rotate: () => anime.random(270, 60) * sample([-1, 1] as const, 1)[0],
      duration: 1200,
      delay: i * 50,
    }),
  },
  [TransitionName.LANDING]: {
    enter: (i) => ({
      transformOrigin: ['50% 100%', '50% 100%'],
      scaleX: [
        { value: 0, },
        { value: 1.4, easing: 'easeOutCirc' },
        { value: 1, easing: 'easeInOutCubic', duration: 500 },
      ],
      scaleY: [
        { value: 1.5, },
        { value: 0.5, easing: 'easeOutCirc' },
        { value: 1, easing: 'easeInOutCubic', duration: 500 },
      ],
      opacity: 1,
      duration: 1000,
      delay: i * 50,
    }),
    leave: (i) => ({
      transformOrigin: ['50% 100%', '50% 100%'],
      scaleX: [
        { value: 1 },
        { value: 1.2, easing: 'easeInOutCirc' },
        { value: 0 },
      ],
      scaleY: [
        { value: 1 },
        { value: 0.5, easing: 'easeInOutCirc' },
        { value: 1.5 },
      ],
      opacity: [
        { value: 1, },
        { value: 1, },
        { value: 0, },
      ],
      duration: 1600,
      delay: i * 50,
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