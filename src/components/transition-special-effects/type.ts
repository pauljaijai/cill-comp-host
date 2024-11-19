export enum TransitionName {
  WAVE = 'wave',
  GLITCH = 'glitch',
  CYBERPSYCHOSIS = 'cyberpsychosis',
  MELT = 'melt',
  // DECIMATION = 'decimation',
  ERODE = 'erode',
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

export type LeaveParams = EnterParams
