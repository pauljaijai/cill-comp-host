import type { Props as BgTypicalProps } from './parts/bg-typical.vue'
import type { Props as BorderTypicalProps } from './parts/border-typical.vue'
import type { Props as CornerTypicalProps } from './parts/corner-typical.vue'

interface BaseParam {
  class?: string;
}

// border

export enum BorderType {
  TYPICAL = 'typical',
}
interface BorderParamTypical extends BorderTypicalProps {
  type: `${BorderType.TYPICAL}`;
}
export type BorderParam = BorderParamTypical & BaseParam

// bg
export enum BgType {
  TYPICAL = 'typical',
}
interface BgParamTypical extends BgTypicalProps {
  type: `${BgType.TYPICAL}`;
}
export type BgParam = BgParamTypical & BaseParam

// corner
export enum CornerType {
  TYPICAL = 'typical',
}
interface CornerParamTypical extends CornerTypicalProps {
  type: `${CornerType.TYPICAL}`;
}
export type CornerParam = CornerParamTypical & BaseParam

// content
export enum ContentType {
  TYPICAL = 'typical',
}
interface ContentParamTypical {
  type: `${ContentType.TYPICAL}`;
}
export type ContentParam = ContentParamTypical & BaseParam

// ornament
// interface OrnamentParamTypical extends BaseParam {
//   type: 'typical';
// }
// export type OrnamentParam = OrnamentParamTypical
