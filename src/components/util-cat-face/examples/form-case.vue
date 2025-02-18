<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <util-cat-face
      class="h-[14vh]"
      :facial-expression
    />

    <form class="flex flex-col gap-4">
      <base-input
        v-model="form.name"
        label="姓名"
        required
        @invalid="handleInvalid"
      />

      <base-input
        v-model="form.phone"
        label="電話"
        pattern="09\d{8}"
        required
        @invalid="handleInvalid"
      />

      <button type="submit">
        提交
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { debounce } from 'lodash-es'
import { fromEntries, fromKeys, map, pipe, sample } from 'remeda'
import { computed, ref, watchEffect } from 'vue'
import { createMachine } from 'xstate'
import BaseInput from '../../base-input.vue'
import { FacialExpression } from '../type'
import UtilCatFace from '../util-cat-face.vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
})

const states = {
  ...pipe(
    Object.values(FacialExpression),
    fromKeys(() => ({
      after: [
        {
          delay: 2000,
          target: FacialExpression.NEUTRAL,
        },
      ],
    })),
  ),
  [FacialExpression.NEUTRAL]: {
    on: pipe(
      Object.entries(FacialExpression),
      map(([, value]) => [value, value] as const),
      fromEntries(),
    ),
  },
}
console.log(`🚀 ~ states:`, states)

const { snapshot, send } = useMachine(createMachine({
  initial: FacialExpression.NEUTRAL,
  states,
  predictableActionArguments: true,
}))
const setExpression = debounce((type: FacialExpression) => {
  console.log(`🚀 ~ [setExpression] type:`, type)
  send({ type })
}, 10, { trailing: false, leading: true })

const facialExpression = computed(
  () => snapshot.value.value as FacialExpression,
)
watchEffect(() => {
  console.log(`🚀 ~ facialExpression`, facialExpression.value)
})

const invalidFaceList = [
  FacialExpression.SAD,
  FacialExpression.SURPRISED,
] as const

function handleInvalid() {
  const [type] = sample(invalidFaceList, 1)
  setExpression(type)
}
</script>
