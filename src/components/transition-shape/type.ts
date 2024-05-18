import anime from "animejs";

export enum RectAction {
  SLIDE_RIGHT = 'slide-right',
  SLIDE_LEFT = 'slide-left',
  SLIDE_UP = 'slide-up',
  SLIDE_DOWN = 'slide-down',
  SCALE = 'scale',
  SCALE_X = 'scale-x',
  SCALE_Y = 'scale-y',
}
export type TransitionType = {
  name: 'rect';
  enter: {
    action: `${RectAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: anime.EasingOptions;
  };
  leave: {
    action: `${RectAction}`,
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: anime.EasingOptions;
  };
  /** 顏色數量等同 shape 數量 */
  colors: string[];
}