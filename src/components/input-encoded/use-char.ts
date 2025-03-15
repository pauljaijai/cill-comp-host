import { ref } from 'vue'

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

  const charsetList = charset.split(/.*?/u)

  function getRandomChar() {
    const index = Math.floor(Math.random() * charsetList.length)
    return charsetList.at(index)
  }

  let times = count
  const char = ref(value)

  async function start(delay = 0) {
    char.value = getRandomChar() ?? value

    return new Promise<void>((resolve) => {
      if (charsetList.length === 0) {
        return resolve()
      }

      setTimeout(() => {
        const timer = setInterval(() => {
          char.value = getRandomChar() ?? value
          times -= 1

          if (times <= 0) {
            char.value = value
            clearInterval(timer)
            resolve()
          }
        }, interval)
      }, delay)
    })
  }

  return {
    original: value,
    char,
    start,
  }
}
