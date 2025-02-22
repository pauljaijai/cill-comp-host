<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <util-cat-face
      class="h-[20vmin] cursor-pointer"
      :facial-expression="currentFacialExpression"
      @click="handleClick()"
    />

    <form
      class="relative flex flex-col gap-4 p-8"
      @submit="handleSubmit"
    >
      <base-input
        v-model="form.name"
        label="姓名"
        required
        @invalid="handleInvalid"
        @focus="handleFocus()"
      />

      <base-input
        v-model="form.phone"
        label="電話"
        pattern="09\d{8}"
        required
        placeholder="必須為 09 開頭的 10 位數字"
        @invalid="handleInvalid"
        @focus="handleFocus()"
      />

      <base-btn
        type="submit"
        label="送出"
      />

      <transition name="opacity">
        <div
          v-if="isSubmitted"
          class="absolute inset-0 z-[40] flex flex-col items-center justify-center gap-6 rounded-xl bg-slate-600 bg-opacity-90 text-white"
          @click="reset"
        >
          <span class="text-xl tracking-wide">
            表單已送出！(*´∀`)~♥
          </span>

          <span class="cursor-pointer text-xs">
            點一下再來一次
          </span>
        </div>
      </transition>
    </form>
  </div>
</template>

<script setup lang="ts">
import { refAutoReset } from '@vueuse/core'
import { sample } from 'remeda'
import { computed, ref } from 'vue'
import BaseBtn from '../../base-btn.vue'
import BaseInput from '../../base-input.vue'
import { FacialExpression } from '../type'
import UtilCatFace from '../util-cat-face.vue'

const form = ref({
  name: '',
  phone: '',
})
const isSubmitted = ref(false)

const facialExpression = refAutoReset(FacialExpression.NEUTRAL, 600)
function setFacialExpression(type: FacialExpression) {
  if (facialExpression.value !== FacialExpression.NEUTRAL) {
    return
  }
  facialExpression.value = type
}

const currentFacialExpression = computed(() => {
  if (isSubmitted.value) {
    return FacialExpression.HAPPY
  }

  return facialExpression.value
})

function handleClick() {
  const [type] = sample([
    FacialExpression.DERPY,
  ], 1)
  setFacialExpression(type)
}

function handleInvalid() {
  const [type] = sample([
    FacialExpression.SAD,
    FacialExpression.SURPRISED,
    FacialExpression.SPEECHLESS,
  ], 1)
  setFacialExpression(type)
}

function handleFocus() {
  const [type] = sample([
    FacialExpression.PLEASANT,
    FacialExpression.EXCITED,
  ], 1)
  setFacialExpression(type)
}

function handleSubmit(evt: Event) {
  evt.preventDefault()
  isSubmitted.value = true
}

function reset() {
  isSubmitted.value = false

  form.value = {
    name: '',
    phone: '',
  }
}
</script>

<style lang="sass" scoped>
.rubbing
  padding: 0.75rem
  color: #ff7530
  opacity: 0.8
  border: 1px dashed #ff7530
  border-radius: 0.2rem
  white-space: nowrap
  text-align: center

.opacity-enter-active, .opacity-leave-active
  transition-duration: 0.4s
.opacity-enter-from, .opacity-leave-to
  opacity: 0 !important
</style>
