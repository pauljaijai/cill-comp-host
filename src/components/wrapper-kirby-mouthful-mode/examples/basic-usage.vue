<template>
  <div class="w-full flex flex-col items-center justify-center gap-10 p-6">
    <wrapper-kirby-mouthful-mode :is-mouthful="isMouthful">
      <div class="flex flex-col gap-4 border rounded">
        <base-checkbox
          v-model="isMouthful"
          class="p-4"
          label="召喚卡比"
        />
      </div>
    </wrapper-kirby-mouthful-mode>

    <wrapper-kirby-mouthful-mode
      :is-mouthful="isMouthful"
      :body-rounded="9999"
      :mouth-rounded="9999"
    >
      <img
        src="/profile.webp"
        class="w-60 border-[0.5rem] border-white rounded-full object-cover shadow-xl"
      >
    </wrapper-kirby-mouthful-mode>

    <wrapper-kirby-mouthful-mode :is-mouthful="isMouthful">
      <div class="relative overflow-hidden border rounded bg-slate-100 p-6">
        <div class="icon">
          <div class="fish">
            🐟
          </div>
        </div>

        <div class="text-center text-xl font-bold">
          鱈魚
        </div>

        <div class="mt-2">
          一隻熱愛程式的魚，但是沒有手指可以打鍵盤，更買不到能在水裡用的電腦。<br>( ´•̥̥̥ ω •̥̥̥` )
        </div>
      </div>
    </wrapper-kirby-mouthful-mode>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseCheckbox from '../../base-checkbox.vue'
import WrapperKirbyMouthfulMode from '../wrapper-kirby-mouthful-mode.vue'

const isMouthful = ref(false)
</script>

<style scoped lang="sass">
.icon
  position: absolute
  right: 0rem
  bottom: 0rem
  font-size: 14rem
  line-height: 10rem
  filter: brightness(0)
  transform: translate(14%, 60%) rotate(10deg)
  opacity: 0.04
  .fish
    animation: float 3s infinite ease-in-out

@keyframes float
  0%, 100%
    transform: translate(0%)
  50%
    transform: translate(-5%, 2%) rotate(5deg)
</style>
