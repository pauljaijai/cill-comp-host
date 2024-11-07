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

export type PartAnimeFcnMap = Record<
  `${State}`,
  (param?: {
    duration?: number;
    delay?: number;
  }) => Promise<void>
>

export type TextAnimeFcnMap = Record<
  'enter' | 'leave',
  (param?: {
    duration?: number;
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
    animeMap: PartAnimeFcnMap;
  }) => void;

  /** 綁定 text，由 card 統一調度 */
  bindText: (param: {
    id: string;
    index: number;
    delay: number | ((index: number) => number);
    animeMap: TextAnimeFcnMap;
  }) => void;
}

export const PROVIDE_KEY = Symbol('card-futuristic') as InjectionKey<ProvideContent>
