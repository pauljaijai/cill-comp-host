import type { ComputedRef, InjectionKey } from 'vue'

export enum State {
  /** 穩定狀態 */
  NORMAL = 'normal',
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  SELECTED = 'selected',
  HOVER = 'hover',
  // ACTIVE = 'active',
}

export enum Part {
  BORDER = 'border',
  BG = 'bg',
  CORNER = 'corner',
  CONTENT = 'content',
  // ORNAMENT = 'ornament',
}

export type AnimeMap = Record<
  `${State}`,
  (param?: {
    duration?: number;
    delay?: number;
  }) => Promise<void>
>

export interface ProvideContent {
  visible: ComputedRef<boolean>;
  contentSize: ComputedRef<{
    width: number;
    height: number;
  }>;
  /** 綁定零件，由 card 統一調度 */
  bindPart: (param: {
    name: `${Part}`;
    animeMap: AnimeMap;
  }) => void;
}

export const PROVIDE_KEY = Symbol('card-futuristic') as InjectionKey<ProvideContent>
