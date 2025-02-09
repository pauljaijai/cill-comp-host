<template>
  <div class="relative w-full flex items-center justify-center gap-10 border p-10">
    <div class="flex flex-col gap-4">
      <base-input
        v-model="form.howToKnow"
        label="從何得知酷酷的元件 *"
        @blur="handleBlur('howToKnow')"
      />

      <div>
        <div class="text-sm font-bold">
          您覺得酷酷的元件趣味程度可得幾分？ *
        </div>

        <div class="flex justify-around gap-2 py-2">
          <label
            v-for="i in 6"
            :key="i"
            @mouseup="emitFromClick"
          >
            <input
              v-model.number="form.score"
              type="radio"
              :value="i - 1"
            >
            {{ i - 1 }}
          </label>
        </div>
      </div>

      <base-input
        v-model="form.text"
        label="留給鱈魚的話或鼓勵 *"
        @blur="handleBlur('text')"
      />

      <base-btn
        class="mt-6"
        label="送出"
        @click="submit"
      />

      <transition name="opacity">
        <div
          v-if="isSubmitted"
          class="absolute inset-0 z-[40] flex flex-col items-center justify-center gap-6 rounded-xl bg-[#c7f6ff] bg-opacity-90"
          @click="reset"
        >
          <span class="text-xl tracking-wide">
            表單已送出，感謝您的回饋！(*´∀`)~♥
          </span>

          <span class="cursor-pointer text-xs">
            （點一下再來一次）
          </span>
        </div>
      </transition>

      <util-party-popper
        ref="popperRef"
        class="pointer-events-none left-0 top-0 z-50 h-full w-full !absolute"
        :quantity-of-per-emit
        :max-concurrency="100"
        :confetti="confettiList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtractArrayType } from '../../../types'
import { Scalar } from '@babylonjs/core'
import { promiseTimeout, useElementBounding } from '@vueuse/core'
import { conditional, constant, isDeepEqual, pipe } from 'remeda'
import { computed, nextTick, reactive, ref } from 'vue'
import BaseBtn from '../../base-btn.vue'
import BaseInput from '../../base-input.vue'
import UtilPartyPopper from '../util-party-popper.vue'

type Confetti = ExtractArrayType<
  InstanceType<typeof UtilPartyPopper>['confetti']
>

const form = ref({
  howToKnow: '',
  score: undefined,
  text: '',
})
const isSubmitted = ref(false)

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>()
const popperBounding = reactive(useElementBounding(popperRef))

const confettiList: Confetti[] = [
  {
    shape: 'plane',
    width: 10,
    height: 10,
  },
  {
    shape: 'cylinder',
    diameter: 10,
    height: 1,
  },
  {
    shape: 'disc',
    radius: 10,
    tessellation: 3,
    arc: 1,
  },
  {
    shape: 'disc',
    radius: 8,
    tessellation: 8,
    arc: 1,
  },
  {
    shape: 'torus',
    diameter: 12,
    thickness: 2,
  },
]
const quantityOfPerEmit = ref(50)

async function emitFromEdge(position: 'top' | 'bottom' | 'left' | 'right') {
  quantityOfPerEmit.value = 50

  const offset = 50

  const params = conditional(
    position,
    [
      isDeepEqual('top'),
      constant(() => ({
        x: Scalar.RandomRange(0, popperBounding.width),
        y: -offset,
        velocity: {
          x: Scalar.RandomRange(1, -1),
          y: Scalar.RandomRange(0, -10),
        },
      })),
    ],
    [
      isDeepEqual('bottom'),
      constant(() => ({
        x: Scalar.RandomRange(0, popperBounding.width),
        y: popperBounding.height + offset,
        velocity: {
          x: Scalar.RandomRange(1, -1),
          y: Scalar.RandomRange(10, 15),
        },
      })),
    ],
    [
      isDeepEqual('left'),
      constant(() => ({
        x: -offset,
        y: Scalar.RandomRange(0, popperBounding.height),
        velocity: {
          x: Scalar.RandomRange(-5, -10),
          y: Scalar.RandomRange(-1, 1),
        },
      })),
    ],
    [
      isDeepEqual('right'),
      constant(() => ({
        x: popperBounding.width + offset,
        y: Scalar.RandomRange(0, popperBounding.height),
        velocity: {
          x: Scalar.RandomRange(5, 10),
          y: Scalar.RandomRange(-1, 1),
        },
      })),
    ],
  )

  await nextTick()
  popperRef.value?.emit(params)
}
async function emitLikeFirework() {
  quantityOfPerEmit.value = 50
  const offset = 50

  const params = pipe(undefined, () => ({
    x: Scalar.RandomRange(0, popperBounding.width),
    y: popperBounding.height + offset,
    velocity: {
      x: 0,
      y: Scalar.RandomRange(10, 20),
    },
  }))

  await nextTick()
  popperRef.value?.emit(params)
}
async function emitFromClick(event: MouseEvent) {
  // FIX: 等待 form.score 更新，未來在想更好的方法
  await promiseTimeout(100)

  const score = form.value.score ?? 0
  quantityOfPerEmit.value = score * 20

  const target = event.target
  if (!(target instanceof Element))
    return

  const bounding = target.getBoundingClientRect()

  const position = {
    x: bounding.left + bounding.width / 2 - popperBounding.left,
    y: bounding.top + bounding.height / 2 - popperBounding.top,
  }

  const velocity = score * 2
  const params = pipe(undefined, () => () => ({
    ...position,
    velocity: {
      x: Scalar.RandomRange(-velocity, velocity),
      y: Scalar.RandomRange(-velocity, velocity),
    },
  }))

  await nextTick()

  popperRef.value?.emit(params)
}

const canSubmit = computed(() =>
  form.value.howToKnow && form.value.score !== undefined && form.value.text,
)

const fieldEdgeMap: Record<
  keyof typeof form.value,
  'top' | 'bottom' | 'left' | 'right'
> = {
  howToKnow: 'top',
  score: 'left',
  text: 'bottom',
}
function handleBlur(field: keyof typeof form.value) {
  if (form.value[field]) {
    emitFromEdge(fieldEdgeMap[field])
  }
}

function submit() {
  if (!canSubmit.value) {
    // eslint-disable-next-line no-alert
    alert('請完成表單 (´,,•ω•,,)')
    return
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      emitLikeFirework()
    }, i * 100)
  }

  setTimeout(() => {
    isSubmitted.value = true
  }, 1000)
}
function reset() {
  isSubmitted.value = false

  form.value = {
    howToKnow: '',
    score: undefined,
    text: '',
  }
}
</script>

<style lang="sass" scoped>
.opacity-enter-active, .opacity-leave-active
  transition-duration: 0.4s
.opacity-enter-from, .opacity-leave-to
  opacity: 0 !important
</style>
