import anime from "animejs";

export type TransitionType = {
  shape: 'rect';
  enter: {
    action: 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down',
    duration: number;
    delay: number;
    easing: anime.EasingOptions;
  };
  leave: {
    action: 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down',
    duration: number;
    delay: number;
    easing: anime.EasingOptions;
  };
  colors: [string, string, string];
}