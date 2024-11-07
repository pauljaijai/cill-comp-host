import type { Props as PropsBgHalftone } from './parts/bg-halftone.vue'
import type { Props as PropsBgSolid } from './parts/bg-solid.vue'
import type { Props as PropsBgTypical } from './parts/bg-typical.vue'

import type { Props as PropsBorderSide } from './parts/border-side.vue'
import type { Props as PropsBorderSpecific } from './parts/border-specific.vue'
import type { Props as PropsBorderTypical } from './parts/border-typical.vue'

import type { Props as PropsContentClip } from './parts/content-clip.vue'
import type { Props as PropsContentScale } from './parts/content-scale.vue'

import type { Props as PropsCornerQuote } from './parts/corner-quote.vue'
import type { Props as PropsCornerSquare } from './parts/corner-square.vue'
import type { Props as PropsCornerTypical } from './parts/corner-typical.vue'

interface BaseParam {
  class?: string;
}

// border
export enum BorderType {
  TYPICAL = 'typical',
  SIDE = 'side',
  SPECIFIC = 'specific',
}
interface BorderParamTypical extends PropsBorderTypical {
  type: `${BorderType.TYPICAL}`;
}
interface BorderParamSide extends PropsBorderSide {
  type: `${BorderType.SIDE}`;
}
interface BorderParamSpecific extends PropsBorderSpecific {
  type: `${BorderType.SPECIFIC}`;
}
export type BorderParam = (
  BorderParamTypical | BorderParamSide | BorderParamSpecific
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
  SQUARE = 'square',
}
interface CornerParamTypical extends PropsCornerTypical {
  type: `${CornerType.TYPICAL}`;
}
interface CornerParamQuote extends PropsCornerQuote {
  type: `${CornerType.QUOTE}`;
}
interface CornerParamSquare extends PropsCornerSquare {
  type: `${CornerType.SQUARE}`;
}
export type CornerParam = (
  CornerParamTypical | CornerParamQuote | CornerParamSquare
) & BaseParam

// content
export enum ContentType {
  TYPICAL = 'typical',
  SCALE = 'scale',
  CLIP = 'clip',
}
interface ContentParamTypical {
  type: `${ContentType.TYPICAL}`;
}
interface ContentParamScale extends PropsContentScale {
  type: `${ContentType.SCALE}`;
}
interface ContentParamClip extends PropsContentClip {
  type: `${ContentType.CLIP}`;
}

export type ContentParam = (
  ContentParamTypical | ContentParamScale | ContentParamClip
) & BaseParam

// ornament
// interface OrnamentParamTypical extends BaseParam {
//   type: 'typical';
// }
// export type OrnamentParam = OrnamentParamTypical
