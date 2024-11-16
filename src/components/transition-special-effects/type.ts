export enum TransitionName {
  WAVE = 'wave',
  GLITCH = 'glitch',
  COLOR_FRINGING = 'color-fringing',
}

export interface TransitionAnime {
  name: `${TransitionName}`;
}

export interface AnimeParams {
  duration?: number;
}

export interface FilterExpose {
  enter: (params?: AnimeParams) => Promise<void>;
  leave: (params?: AnimeParams) => Promise<void>;
}
