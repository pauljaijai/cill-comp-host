import { ComputedRef, InjectionKey } from "vue";

export const PROVIDE_KEY = Symbol('wrapper-physics') as InjectionKey<ProvideContent>;

export interface Body {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;

  /** 空氣阻力。物體在空氣中受到的阻力 */
  frictionAir?: number;
  /** 摩擦力。物體本身的摩擦力，必須為 0 ~ 1，0 表示持續滑動，1 表示受力後會立即停止 */
  friction?: number;
  /** 回彈力。碰撞的回彈係數，0 表示不反彈，1 表示完全反彈 */
  restitution?: number;
  /** 物體質量 */
  mass?: number;
  /** 靜止。會變成像地面那樣完全靜止的存在 */
  isStatic?: boolean;
}

export interface ProvideContent {
  bindBody: (body: Body) => void;
  unbindBody: (id: string) => void;
  getInfo: (id: string) => {
    offsetX: number;
    offsetY: number;
    rotate: number;
  } | undefined;
}