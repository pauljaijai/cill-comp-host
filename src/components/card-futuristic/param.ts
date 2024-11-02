import type { Props as PropsBgTypical } from './parts/bg-typical.vue'

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
}
interface BorderParamTypical extends PropsBorderTypical {
  type: `${BorderType.TYPICAL}`;
}
export type BorderParam = BorderParamTypical & BaseParam

// bg
export enum BgType {
  TYPICAL = 'typical',
}
interface BgParamTypical extends PropsBgTypical {
  type: `${BgType.TYPICAL}`;
}
export type BgParam = (
  BgParamTypical
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
