<template>
  <div class="relative w-full flex justify-center border border-gray-300 p-6">
    <div class="max-w-[20rem] flex flex-col gap-4">
      <base-input
        v-model="form.username"
        label="帳號 *"
        class="w-full"
      />

      <base-input
        v-model="form.password"
        type="password"
        label="密碼 *"
        class="w-full"
      />

      <div class="mt-3 flex justify-center">
        <btn-naughty
          label="送出表單"
          :disabled
          z-index="30"
          @click="handleSubmit"
        >
          <template #rubbing>
            <div class="rubbing">
              請完成表單
            </div>
          </template>
        </btn-naughty>
      </div>
    </div>

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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseInput from '../../base-input.vue'
import BtnNaughty from '../btn-naughty.vue'

const form = ref({
  username: '',
  password: '',
})
const disabled = computed(() => {
  return form.value.username === '' || form.value.password === ''
})

const isSubmitted = ref(false)
function handleSubmit() {
  if (disabled.value) {
    return
  }
  isSubmitted.value = true
}

function reset() {
  isSubmitted.value = false

  form.value = {
    username: '',
    password: '',
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
