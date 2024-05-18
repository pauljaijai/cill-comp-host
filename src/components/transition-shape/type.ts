import anime from "animejs";

export type TransitionType = {
  shape: 'rect';
  enter: {
    action: 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down',
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: anime.EasingOptions;
  };
  leave: {
    action: 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down',
    duration: number;
    /** 每個 shape 延遲間距  */
    delay: number;
    easing: anime.EasingOptions;
  };
  /** 顏色數量等同 shape 數量 */
  colors: string[];
}