
export type TransitionType = {
    shape: 'rect';
    enter: 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down';
    leave: 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down';
    colors: [string, string, string];
    delay: number;
}