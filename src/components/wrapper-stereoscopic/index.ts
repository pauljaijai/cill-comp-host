import type { ComputedRef, InjectionKey } from 'vue'

export const PROVIDE_KEY = Symbol('wrapper-stereoscopic') as InjectionKey<ProvideContent>

export interface ProvideContent {
  bindLayer: (layer: Layer) => void;
  unbindLayer: (id: string) => void;
  zOffset: ComputedRef<number>;
}

export interface Layer {
  id: string;
}
