import { SVGAttributes } from "vue";

type StyleAttr = 'width' | 'height' | 'x' | 'y' | 'cx' | 'cy' | 'rx' | 'ry' | 'fill';
export type StyleMap = Record<
  'enter' | 'leave',
  Pick<SVGAttributes, StyleAttr>
>;

export interface Size {
  width: number;
  height: number;
}