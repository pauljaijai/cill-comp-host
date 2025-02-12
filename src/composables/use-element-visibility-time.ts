import type { MaybeElement } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { tryOnScopeDispose, useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useElementVisibilityTime(
  target: MaybeRef<MaybeElement>,
) {
  const isVisible = ref(false)
  const totalVisibleTime = ref(0)

  useIntervalFn(() => {
    if (!isVisible.value) {
      return
    }

    totalVisibleTime.value += 50
  }, 50)

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      const value = !!(entry?.isIntersecting)

      isVisible.value = value
    },
  )

  tryOnScopeDispose(() => {
    stop()
  })

  return {
    isVisible,
    totalVisibleTime: computed(() => totalVisibleTime.value),
    reset() {
      totalVisibleTime.value = 0
    },
  }
}
