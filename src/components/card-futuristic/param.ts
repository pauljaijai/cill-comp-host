import type { Props as PropsBgHalftone } from './parts/bg-halftone.vue'
import type { Props as PropsBgSolid } from './parts/bg-solid.vue'
import type { Props as PropsBgTypical } from './parts/bg-typical.vue'

import type { Props as PropsBorderSide } from './parts/border-side.vue'
import type { Props as PropsBorderTypical } from './parts/border-typical.vue'

import type { Props as PropsContentScale } from './parts/content-scale.vue'
import type { Props as PropsCornerQuote } from './parts/corner-quote.vue'

import type { Props as PropsCornerTypical } from './parts/corner-typical.vue'

interface BaseParam {
  class?: string;
}

// border
export enum BorderType {
  TYPICAL = 'typical',
  SIDE = 'side',
}
interface BorderParamTypical extends PropsBorderTypical {
  type: `${BorderType.TYPICAL}`;
}
interface BorderParamSide extends PropsBorderSide {
  type: `${BorderType.SIDE}`;
}
export type BorderParam = (
  BorderParamTypical | BorderParamSide
) & BaseParam

// bg
export enum BgType {
  TYPICAL = 'typical',
  HALFTONE = 'halftone',
  SOLID = 'solid',
}
interface BgParamTypical extends PropsBgTypical {
  type: `${BgType.TYPICAL}`;
}
interface BgParamBgHalftone extends PropsBgHalftone {
  type: `${BgType.HALFTONE}`;
}
interface BgParamBgSolid extends PropsBgSolid {
  type: `${BgType.SOLID}`;
}
export type BgParam = (
  BgParamTypical | BgParamBgHalftone | BgParamBgSolid
) & BaseParam

// corner
export enum CornerType {
  TYPICAL = 'typical',
  QUOTE = 'quote',
}
interface CornerParamTypical extends PropsCornerTypical {
  type: `${CornerType.TYPICAL}`;
}
interface CornerParamQuote extends PropsCornerQuote {
  type: `${CornerType.QUOTE}`;
}
export type CornerParam = (
  CornerParamTypical | CornerParamQuote
) & BaseParam

// content
export enum ContentType {
  TYPICAL = 'typical',
  SCALE = 'scale',
}
interface ContentParamTypical {
  type: `${ContentType.TYPICAL}`;
}
interface ContentParamScale extends PropsContentScale {
  type: `${ContentType.SCALE}`;
}
export type ContentParam = (
  ContentParamTypical | ContentParamScale
) & BaseParam

// ornament
// interface OrnamentParamTypical extends BaseParam {
//   type: 'typical';
// }
// export type OrnamentParam = OrnamentParamTypical
