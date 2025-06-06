import type { EasingOptions } from 'animejs'

// #region TransitionRect
export enum RectAction {
  SLIDE_RIGHT = 'slide-right',
  SLIDE_LEFT = 'slide-left',
  SLIDE_UP = 'slide-up',
  SLIDE_DOWN = 'slide-down',
  SCALE = 'scale',
  SCALE_X = 'scale-x',
  SCALE_Y = 'scale-y',
}
interface TransitionRect {
  name: 'rect';
  enter: {
    action: `${RectAction}`;
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${RectAction}`;
    duration: number;
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。顏色數量等同 shape 數量，至少需要一個 */
  colors: [string, ...string[]];
}
// #endregion TransitionRect

// #region TransitionConvergingRect
export enum ConvergingRectAction {
  SLIDE = 'slide',
}
interface TransitionConvergingRect {
  name: 'converging-rect';
  enter: {
    action: `${ConvergingRectAction}`;
    angle?: number;
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${ConvergingRectAction}`;
    duration: number;
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。顏色數量等同 shape 數量，至少需要一個 */
  colors: [string, ...string[]];
}
// #endregion TransitionConvergingRect

// #region TransitionRound
export enum RoundEnterAction {
  SPREAD_LEFT = 'spread-left',
  SPREAD_RIGHT = 'spread-right',
  SPREAD_UP = 'spread-up',
  SPREAD_DOWN = 'spread-down',
  SPREAD_SCALE = 'spread-scale',
}
export enum RoundBaseAction {
  SCALE_LT = 'scale-lt',
  SCALE_LB = 'scale-lb',
  SCALE_RT = 'scale-rt',
  SCALE_RB = 'scale-rb',
  SCALE = 'scale',
}
interface TransitionRound {
  name: 'round';
  enter: {
    action: `${RoundBaseAction}` | `${RoundEnterAction}`;
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${RoundBaseAction}`;
    duration: number;
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。顏色數量等同 shape 數量，至少需要一個 */
  colors: [string, ...string[]];
}
// #endregion TransitionRound

// #region TransitionFence
export enum FenceAction {
  SPREAD_RIGHT = 'spread-right',
  SPREAD_LEFT = 'spread-left',
  SCALE_X = 'scale-x',
  SCALE_Y = 'scale-y',
}
interface TransitionFence {
  name: 'fence';
  enter: {
    action: `${FenceAction}`;
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${FenceAction}`;
    duration: number;
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。顏色數量等同 shape 數量，至少需要一個 */
  colors: [string, ...string[]];
}
// #endregion TransitionFence

export enum SequentialLineAction {
  DEFAULT = 'default',
}
interface TransitionSequentialLine {
  name: 'sequential-line';
  enter: {
    action: `${SequentialLineAction}`;
    /** @default 0 */
    angle?: number;
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${SequentialLineAction}`;
    duration: number;
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。至少需要 2 個 */
  colors: [string, string, ...string[]];
}

// #region TransitionType
/** 初始化後 name 變更會被忽略，其餘參數皆可動態調整 */
export type TransitionType =
  TransitionRect
  | TransitionConvergingRect
  | TransitionRound
  | TransitionFence
// #endregion TransitionType
