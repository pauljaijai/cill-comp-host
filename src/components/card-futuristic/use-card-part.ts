import type { AnimeMap, Part } from './type'
import { reactiveComputed } from '@vueuse/core'
import { inject, onMounted } from 'vue'
import { PROVIDE_KEY } from './type'

/** FIX: 不知道為甚麼 bindPart 會落後於 card onMounted，
 *
 * 導致初始化 animeMap 無法執行
 */
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
    cardSize,
  }
}
