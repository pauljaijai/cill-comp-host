import type Matter from 'matter-js'
import type { InjectionKey } from 'vue'

/** DOM 物體基本參數 */
interface BasicBodyParam {
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

/** 在物理世界中註冊的元素物體資訊 */
export interface ElBody extends BasicBodyParam {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;

  /** 初始值，用於計算偏移量 */
  initial: {
    offsetX: number;
    offsetY: number;
    rotate: number;
  };

  /** 物體形狀，預設為 rectangle
   *
   * - rectangle：尺寸同 DOM 之長寬
   * - circle：取 DOM 長寬最大值為直徑
   */
  polygon?: 'rectangle' | 'circle';
}

export interface UpdateParam extends BasicBodyParam {
  /** 速度，影響移動 */
  velocity?: Matter.Vector;
  /** 設定角速度，影響旋轉 */
  angularVelocity?: number;
}

export interface ProvideContent {
  bindBody: (body: ElBody) => void;
  unbindBody: (id: string) => void;
  updateBody: (id: string, param: UpdateParam) => void;
  getInfo: (id: string) => {
    offsetX: number;
    offsetY: number;
    rotate: number;
  } | undefined;
}

export const PROVIDE_KEY = Symbol('wrapper-physics') as InjectionKey<ProvideContent>
