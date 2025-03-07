<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300 p-6">
    <!-- 預算 radio -->
    <div class="flex flex-col items-start gap-4 border border-gray-300 rounded-xl p-6">
      <div class="font-bold">
        請選擇您的預算範圍：
      </div>

      <div class="w-full flex flex-wrap justify-between gap-4 whitespace-nowrap">
        <label
          v-for="item, i in budgetList"
          :key="i"
          class="flex-1 cursor-pointer border rounded p-4 duration-300 hover:bg-gray-100"
          :class="{ active: budget === i }"
        >
          <input
            v-model="budget"
            type="radio"
            :value="i"
          >
          {{ item.text }}
        </label>
      </div>
    </div>

    <wrapper-physics
      ref="wrapperRef"
      class="h-[30vh] w-full flex flex-col items-center justify-center"
      :class="{ 'select-none': budget === 0 }"
    >
      <div
        v-for="item, i in list"
        :key="i"
        class="flex"
      >
        <wrapper-physics-body
          v-for="char in item.text"
          :key="char"
          :restitution="1.4"
          :friction-air="0.03"
        >
          {{ char }}
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import WrapperPhysicsBody from '../wrapper-physics-body.vue'
import WrapperPhysics from '../wrapper-physics.vue'

const wrapperRef = ref<InstanceType<typeof WrapperPhysics>>()

const list = [
  { text: 'Phone：0987-654-321'.split('') },
  { text: 'E-mail：hi@codlin.me'.split('') },
]

const budget = ref(-1)
const budgetList = [
  { text: '$10,000 以下' },
  { text: '$10,000 - $50,000' },
  { text: '$50,000 - $100,000' },
  { text: '$100,000 以上' },
]

watchEffect(() => {
  if (budget.value === 0) {
    wrapperRef.value?.start()
  }
  else {
    wrapperRef.value?.reset()
  }
})
</script>
