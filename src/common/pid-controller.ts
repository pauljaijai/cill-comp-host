export class PidController {
  #kp: number
  #ki: number
  #kd: number
  #lastValue: number
  #integralValue: number
  #lastTime: number

  #count = 0

  constructor(params?: { kp?: number; ki?: number; kd?: number }) {
    this.#kp = params?.kp ?? 0.5
    this.#ki = params?.ki ?? 0.1
    this.#kd = params?.kd ?? 0.3

    this.#integralValue = 0
    this.#lastValue = 0
    this.#lastTime = performance.now()
  }

  compute(targetValue: number, currentValue: number): number {
    const now = performance.now()
    const dt = (now - this.#lastTime) / 1000
    this.#lastTime = now

    if (dt <= 0)
      return 0

    const errorValue = targetValue - currentValue
    this.#integralValue += errorValue * dt
    const derivative = (errorValue - this.#lastValue) / dt

    /** 角加速度 */
    const alpha = (
      (this.#kp * errorValue) + (this.#ki * this.#integralValue) + (this.#kd * derivative)
    ) * dt

    if (this.#count % 100 === 0) {
      console.log('error', errorValue)
      console.log('integralValue', this.#integralValue)
      console.log('derivative', derivative)
      console.log('alpha', alpha)
    }

    this.#count++

    this.#lastValue = errorValue

    return Math.abs(alpha) < 0.0000001 ? 0 : alpha
  }
}
