export class PidController {
  #kp: number
  #ki: number
  #kd: number
  #prevValue: number
  #integral: number
  #lastTime: number

  constructor(params?: { kp?: number; ki?: number; kd?: number }) {
    this.#kp = params?.kp ?? 2
    this.#ki = params?.ki ?? 0.01
    this.#kd = params?.kd ?? 1.8

    this.#prevValue = 0
    this.#integral = 0
    this.#lastTime = performance.now()
  }

  compute(targetValue: number, currentValue: number): number {
    const now = performance.now()
    const dt = (now - this.#lastTime) / 1000
    this.#lastTime = now

    if (dt <= 0)
      return 0

    const error = targetValue - currentValue
    this.#integral += error * dt
    const derivative = (error - this.#prevValue) / dt

    /** 角加速度 */
    const alpha = (
      (this.#kp * error) + (this.#ki * this.#integral) + (this.#kd * derivative)
    ) * dt

    this.#prevValue = error

    return Math.abs(alpha) < 0.0000001 ? 0 : alpha
  }
}
