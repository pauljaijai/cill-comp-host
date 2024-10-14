import type { SVGAttributes } from 'vue'

export type StyleMap = Record<
  'enter' | 'leave',
  Omit<SVGAttributes, 'direction' | 'begin'>
>

export interface Size {
  width: number;
  height: number;
}

export interface AnimeComponentParam {
  duration: number;
  delay: number;
  easing?: string;
}
export interface AnimeComponent {
  enter: (param: AnimeComponentParam) => void;
  leave: (param: AnimeComponentParam) => void;
}
