import type { Props as BgTypicalProps } from './parts/bg-typical.vue'
import type { Props as BorderTypicalProps } from './parts/border-typical.vue'
import type { Props as CornerTypicalProps } from './parts/corner-typical.vue'

interface BaseParam {
  class?: string;
}

// border
interface BorderParamTypical extends BorderTypicalProps {
  type: 'typical';
}
export type BorderParam = BorderParamTypical & BaseParam

// bg
interface BgParamTypical extends BgTypicalProps {
  type: 'typical';
}
export type BgParam = BgParamTypical & BaseParam

// corner
interface CornerParamTypical extends CornerTypicalProps {
  type: 'typical';
}
export type CornerParam = CornerParamTypical & BaseParam

// content
interface ContentParamTypical {
  type: 'typical';
}
export type ContentParam = ContentParamTypical & BaseParam

// ornament
// interface OrnamentParamTypical extends BaseParam {
//   type: 'typical';
// }
// export type OrnamentParam = OrnamentParamTypical
