<template>
  <div class="w-full flex flex-wrap justify-center gap-4 border border-gray-300 p-6">
    <div
      v-for="item in list"
      :key="item.key"
      class="w-full"
    >
      <transition-shape
        :type="item"
        @after-transition="handleInit()"
      >
        <div
          :key="fishIndex"
          class="w-full cursor-pointer py-6 text-center text-[5rem]"
          @click="handleClick()"
        >
          {{ fishList[fishIndex] }}
        </div>
      </transition-shape>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransitionType } from '../type'
import { useToggle } from '@vueuse/core'
import { debounce, throttle } from 'lodash-es'
import { hasAtLeast, map, pipe, shuffle } from 'remeda'
import { ref } from 'vue'
import TransitionShape from '../transition-shape.vue'
import { RoundBaseAction, RoundEnterAction } from '../type'

const fishIndex = ref(0)
const fishList = [
  '🐟',
  '🐋',
  '🐠',
  '🐡',
]

function changeFish() {
  fishIndex.value++
  fishIndex.value %= fishList.length
}

const [isReady, toggleReady] = useToggle(false)

const handleInit = debounce(() => {
  toggleReady(true)
}, 1000)

const handleClick = throttle(() => {
  if (!isReady.value) {
    handleClick.cancel()
    return
  }

  changeFish()
}, 4000, {
  leading: true,
  trailing: false,
})

const leaveActions = Object.values(RoundBaseAction)
const enterActions = [
  RoundEnterAction.SPREAD_LEFT,
  RoundEnterAction.SPREAD_SCALE,
  RoundBaseAction.SCALE,
  RoundBaseAction.SCALE_LB,
]

type Item = TransitionType & {
  key: string;
}
const list: Item[] = pipe(
  enterActions,
  map((action, i) => {
    const leaveAction = leaveActions[i % leaveActions.length]
    if (!leaveAction) {
      throw new Error('Leave action is required')
    }

    const colors = shuffle(['#27A4F2', '#44C1F2', '#85DEF2', '#DCEEF2', '#91E9F2'])
    if (!hasAtLeast(colors, 1)) {
      throw new Error('At least one color is required')
    }

    const result: Item = {
      key: action,
      name: 'round',
      enter: {
        action,
        duration: 900,
        delay: 200,
        easing: 'easeOutExpo',
      },
      leave: {
        action: leaveAction,
        duration: 900,
        delay: 200,
        easing: 'easeInExpo',
      },
      colors,
    }

    return result
  }),
)
</script>
