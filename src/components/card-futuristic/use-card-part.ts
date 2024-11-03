import type { AnimeMap, Part } from './type'
import { reactiveComputed } from '@vueuse/core'
import { computed, inject, onMounted } from 'vue'
import { PROVIDE_KEY } from './type'

export function useCardPart(
  name: `${Part}`,
  animeMap: AnimeMap,
) {
  const card = inject(PROVIDE_KEY)
  const cardSize = reactiveComputed(() => ({
    width: card?.contentSize.value.width ?? 0,
    height: card?.contentSize.value.height ?? 0,
  }))

  onMounted(async () => {
    if (!card) {
      console.warn('此元件必須包在 CardFuturistic 元件中')
    }

    card?.bindPart({
      name,
      animeMap,
    })
  })

  return {
    visible: computed(() => !!card?.visible.value),
    cardSize,
  }
}
