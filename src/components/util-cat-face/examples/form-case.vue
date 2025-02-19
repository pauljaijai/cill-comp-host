<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <util-cat-face
      class="h-[10vh] cursor-pointer"
      :facial-expression
      @click="setFacialExpression(FacialExpression.EXCITED)"
    />

    <form class="flex flex-col gap-4">
      <base-input
        v-model="form.name"
        label="姓名"
        required
        @invalid="handleInvalid"
        @blur="handleBlur"
      />

      <base-input
        v-model="form.phone"
        label="電話"
        pattern="09\d{8}"
        required
        @invalid="handleInvalid"
        @blur="handleBlur"
      />

      <button type="submit">
        提交
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { refAutoReset } from '@vueuse/core'
import { sample } from 'remeda'
import { ref, watchEffect } from 'vue'
import { createActor, createMachine } from 'xstate'
import BaseInput from '../../base-input.vue'
import { FacialExpression } from '../type'
import UtilCatFace from '../util-cat-face.vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
})

const stateMachine = createMachine({
  id: 'cat-face',
  initial: FacialExpression.NEUTRAL,
  states: {
    [FacialExpression.NEUTRAL]: {
      on: {
        [FacialExpression.ANGRY]: FacialExpression.ANGRY,
      },
    },
    [FacialExpression.ANGRY]: {
      after: { 2000: { target: FacialExpression.NEUTRAL } },
    },
  },
})

const actor = createActor(stateMachine)
actor.subscribe((state) => {
  console.log(`🚀 ~ state`, state.value)
})
actor.start()

const facialExpression = refAutoReset(FacialExpression.NEUTRAL, 600)
function setFacialExpression(type: FacialExpression) {
  if (facialExpression.value !== FacialExpression.NEUTRAL) {
    return
  }
  facialExpression.value = type
}
watchEffect(() => {
  console.log(`🚀 ~ facialExpression`, facialExpression.value)
})

const invalidFaceList = [
  FacialExpression.SAD,
  FacialExpression.SURPRISED,
] as const
function handleInvalid() {
  const [type] = sample(invalidFaceList, 1)
  setFacialExpression(type)
}

const blurFaceList = [
  FacialExpression.SAD,
  FacialExpression.SURPRISED,
] as const
function handleBlur() {
  const [type] = sample(blurFaceList, 1)
  setFacialExpression(type)
}
</script>
