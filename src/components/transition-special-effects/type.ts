export enum TransitionName {
  WAVE = 'wave',
  GLITCH = 'glitch',
  COLOR_FRINGING = 'color-fringing',
  MELT = 'melt',
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

export type EnterParams = `${TransitionName}` | (AnimeParams & {
  name: `${TransitionName}`;
})

export type LeaveParams = `${TransitionName}` | (AnimeParams & {
  name: `${TransitionName}`;
})
