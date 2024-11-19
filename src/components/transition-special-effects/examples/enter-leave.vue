<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <div class="flex flex-col gap-4 border rounded py-4">
      <div class="flex items-center gap-1 px-4">
        <div class="w-20">
          進入特效
        </div>

        <div class="flex-1 border rounded">
          <select
            v-model="enterName"
            class="w-full p-2"
          >
            <option
              v-for="option in options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-1 px-4">
        <div class="w-20">
          離開特效
        </div>

        <div class="flex-1 border rounded">
          <select
            v-model="leaveName"
            class="w-full p-2"
          >
            <option
              v-for="option in options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <base-checkbox
        v-model="visible"
        label="顯示"
        class="px-4"
      />
    </div>

    <div class="h-[50vh] flex items-center justify-center">
      <transition-special-effects
        :enter="enterName"
        :leave="leaveName"
      >
        <div
          v-if="visible"
          class="flex flex-col items-center gap-4"
        >
          <img
            src="/profile.webp"
            class="mb-4 h-60 w-60 overflow-hidden border-4 border-white rounded-full shadow-xl"
          >

          <div class="text-xl font-bold">
            鱈魚 Codfish
          </div>

          <div>
            困擾買不到 IP69K 等級的防水電腦 ( ´•̥̥̥ ω •̥̥̥` )
          </div>
        </div>
      </transition-special-effects>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '../../base-checkbox.vue'
import TransitionSpecialEffects from '../transition-special-effects.vue'
import { TransitionName } from '../type'

const visible = ref(true)
const enterName = ref<`${TransitionName}`>('wave')
const leaveName = ref<`${TransitionName}`>('wave')

const options = Object.values(TransitionName)
</script>
