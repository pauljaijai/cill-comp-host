import type { ComputedRef, InjectionKey } from 'vue'

export type State = ''

export interface ProvideContent {
  visible: ComputedRef<boolean>;
  bodySize: ComputedRef<{
    width: number;
    height: number;
  }>;
}

export const PROVIDE_KEY = Symbol('card-futuristic') as InjectionKey<ProvideContent>
