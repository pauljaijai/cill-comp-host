import { reactive } from 'vue'

export function useChar(
  value: string,
  charset: string,
  options?: Partial<{
    count: number;
    interval: number;
  }>,
) {
  const {
    count = 10,
    interval = 20,
  } = options ?? {}

  function getRandomChar() {
    const index = Math.floor(Math.random() * charset.length)
    return charset.at(index)
  }

  const char = reactive({
    original: value,
    value,
    count,
    async start(delay = 0) {
      char.value = getRandomChar() ?? value

      return new Promise<void>((resolve) => {
        if (charset.length === 0) {
          return resolve()
        }

        setTimeout(() => {
          const timer = setInterval(() => {
            char.value = getRandomChar() ?? value
            char.count -= 1

            if (char.count <= 0) {
              char.value = value
              clearInterval(timer)
              resolve()
            }
          }, interval)
        }, delay)
      })
    },
  })

  return char
}
