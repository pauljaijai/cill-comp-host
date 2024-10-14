<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300">
    <util-party-popper
      ref="popperRef"
      v-slot="{ fps }"
      class="h-[60vh] flex"
      :max-concurrency="40"
    >
      <div class="h-full w-full flex flex-col items-center justify-center gap-6">
        <div class="flex gap-6">
          <div
            class="cursor-pointer select-none rounded p-4 text-4xl -rotate-90"
            @click="(event) => emit(event, 'lt')"
          >
            🎉
          </div>

          <div
            class="cursor-pointer select-none rounded p-4 text-4xl -rotate-45"
            @click="(event) => emit(event, 't')"
          >
            🎉
          </div>

          <div
            class="cursor-pointer select-none rounded p-4 text-4xl"
            @click="(event) => emit(event, 'rt')"
          >
            🎉
          </div>
        </div>

        <div class="flex gap-10">
          <div
            class="cursor-pointer select-none rounded p-4 text-4xl -rotate-[135deg]"
            @click="(event) => emit(event, 'l')"
          >
            🎉
          </div>

          <div
            class="rotate-45 cursor-pointer select-none rounded p-4 text-4xl"
            @click="(event) => emit(event, 'r')"
          >
            🎉
          </div>
        </div>

        <div
          class="cursor-pointer select-none rounded p-4 text-4xl"
          @click="emit"
        >
          🎇
        </div>
      </div>

      <div class="absolute left-0 top-0 p-4">
        {{ fps }}
      </div>
    </util-party-popper>
  </div>
</template>

<script setup lang="ts">
import { Scalar } from '@babylonjs/core'
import { useElementBounding } from '@vueuse/core'
import { conditional, constant, isDeepEqual } from 'remeda'
import { ref } from 'vue'
import UtilPartyPopper from '../util-party-popper.vue'

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>()
const popperBounding = useElementBounding(popperRef)

type Direction = 'rt' | 'lt' | 't' | 'l' | 'r'

function emit(
  payload: MouseEvent,
  direction?: Direction,
) {
  const target = payload.target
  if (!(target instanceof Element))
    return

  const bounding = target.getBoundingClientRect()

  const position = {
    x: bounding.left + bounding.width / 2 - popperBounding.left.value,
    y: bounding.top + bounding.height / 2 - popperBounding.top.value,
  }

  const velocityRange = { min: 2, max: 8 }

  if (!direction) {
    popperRef.value?.emit(position)
    return
  }

  const param = conditional(direction, [
    isDeepEqual('rt'),
    constant(() => ({
      ...position,
      velocity: {
        x: -Scalar.RandomRange(velocityRange.min, velocityRange.max),
        y: Scalar.RandomRange(velocityRange.min, velocityRange.max),
      },
    })),
  ], [
    isDeepEqual('lt'),
    constant(() => ({
      ...position,
      velocity: {
        x: Scalar.RandomRange(velocityRange.min, velocityRange.max),
        y: Scalar.RandomRange(velocityRange.min, velocityRange.max),
      },
    })),
  ], [
    isDeepEqual('t'),
    constant(() => ({
      ...position,
      velocity: {
        x: Scalar.RandomRange(-2, 2),
        y: Scalar.RandomRange(velocityRange.min, velocityRange.max),
      },
    })),
  ], [
    isDeepEqual('l'),
    constant(() => ({
      ...position,
      velocity: {
        x: Scalar.RandomRange(velocityRange.min, velocityRange.max),
        y: Scalar.RandomRange(-2, 2),
      },
    })),
  ], [
    isDeepEqual('r'),
    constant(() => ({
      ...position,
      velocity: {
        x: -Scalar.RandomRange(velocityRange.min, velocityRange.max),
        y: Scalar.RandomRange(-2, 2),
      },
    })),
  ])

  popperRef.value?.emit(param)
}
</script>
