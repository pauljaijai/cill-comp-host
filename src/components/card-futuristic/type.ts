import type { ComputedRef, InjectionKey } from 'vue'

export type State = 'visible' | 'hidden'
export type Part = 'border' | 'bg' | 'corner' | 'content'

export type AnimeMap = Record<
  State,
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
  /** 綁定裝飾，由 card 統一調度 */
  bindPart: (param: {
    name: Part;
    animeMap: AnimeMap;
  }) => void;
}

export const PROVIDE_KEY = Symbol('card-futuristic') as InjectionKey<ProvideContent>
