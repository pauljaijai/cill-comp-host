<template>
  <div class="w-full flex flex-col gap-4">
    <div class="h-full w-full flex items-center justify-center gap-10 p-6">
      <base-input
        v-model="text"
        label="輸入 emoji"
      />

      <div
        class="cursor-pointer select-none rounded bg-white px-4 py-2 text-4xl"
        @click="emit()"
      >
        🎉
      </div>
    </div>

    <util-party-popper
      ref="popperRef"
      :key
      :confetti="confettiList"
      class="pointer-events-none left-0 top-0 z-50 h-full w-full !fixed"
      :quantity-of-per-emit="50"
      :max-concurrency="50"
      :max-angular-velocity="Math.PI / 100"
      :color="{ r: 1, g: 1, b: 1 }"
    />
  </div>
</template>

<script setup lang="ts">
import type { ExtractArrayType } from '../../../types/main.type'
import { Scalar } from '@babylonjs/core'
import { useElementBounding, watchDebounced } from '@vueuse/core'
import { map, pipe } from 'remeda'
import { computed, ref } from 'vue'
import BaseInput from '../../base-input.vue'
import UtilPartyPopper from '../util-party-popper.vue'

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>()
const popperBounding = useElementBounding(popperRef)

const text = ref('🎈✨🎉🍖🐟🎁💎')
/** 用於強制更新元件 */
const key = ref(crypto.randomUUID())
watchDebounced(text, () => {
  key.value = crypto.randomUUID()
}, { debounce: 1000 })

type Confetti = ExtractArrayType<
  InstanceType<typeof UtilPartyPopper>['confetti']
>
const confettiList = computed(() => pipe(
  text.value.split(/.*?/u),
  map((char) => ({
    shape: 'text',
    width: 30,
    height: 30,
    char,
  } satisfies Confetti)),
))

function emit() {
  popperRef.value?.emit(() => ({
    x: 0,
    y: Scalar.RandomRange(0, popperBounding.height.value),
    velocity: {
      x: -Scalar.RandomRange(5, 10),
      y: Scalar.RandomRange(-5, 5),
    },
  }))

  popperRef.value?.emit(() => ({
    x: popperBounding.width.value,
    y: Scalar.RandomRange(0, popperBounding.height.value),
    velocity: {
      x: Scalar.RandomRange(5, 10),
      y: Scalar.RandomRange(-5, 5),
    },
  }))
}
</script>
