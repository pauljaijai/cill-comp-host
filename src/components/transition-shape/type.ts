import { EasingOptions } from "animejs";

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
    action: `${RectAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${RectAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。顏色數量等同 shape 數量，至少需要一個 */
  colors: [string, ...string[]];
}

export enum RoundAction {
  SCALE_LT = 'scale-lt',
  SCALE_LB = 'scale-lb',
  SCALE_RT = 'scale-rt',
  SCALE_RB = 'scale-rb',
  SCALE = 'scale',

}
interface TransitionRound {
  name: 'round';
  enter: {
    action: `${RoundAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${RoundAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。顏色數量等同 shape 數量，至少需要一個 */
  colors: [string, ...string[]];
}

export enum FenceAction {
  SPREAD_RIGHT = 'spread-right',
  SPREAD_LEFT = 'spread-left',
}
interface TransitionFence {
  name: 'fence';
  enter: {
    action: `${RoundAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  leave: {
    action: `${RoundAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: EasingOptions;
  };
  /** HEX 格式。顏色數量等同 shape 數量，至少需要一個 */
  colors: [string, ...string[]];
}

/** 初始化後 name 變更會被忽略，其餘參數皆可動態調整 */
export type TransitionType = TransitionRect
  | TransitionRound
  | TransitionFence
