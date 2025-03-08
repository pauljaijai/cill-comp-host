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
      class="h-[30vh] w-full flex flex-col items-center justify-center gap-2"
      :class="{ 'select-none': budget === 0 }"
    >
      <div
        v-for="row, i in rows"
        :key="i"
        class="min-h-[1rem] flex"
      >
        <wrapper-physics-body
          v-for="item in row"
          :key="item.text"
          :restitution="0.98"
          :friction="0.005"
          :friction-air="0.005"
          v-bind="item"
        >
          {{ item.text }}
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import WrapperPhysicsBody from '../wrapper-physics-body.vue'
import WrapperPhysics from '../wrapper-physics.vue'

type BodyProps = InstanceType<typeof WrapperPhysicsBody>['$props']

interface Row extends BodyProps {
  text: string;
}

const wrapperRef = ref<InstanceType<typeof WrapperPhysics>>()

const rows: Row[][] = [
  [
    { text: '營業時間：全天', isStatic: true },
    { text: '無' },
    { text: '休', isStatic: true },
  ],
  'E-mail：hi@codlin.me'.split('').map((char) => ({ text: char })),
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
