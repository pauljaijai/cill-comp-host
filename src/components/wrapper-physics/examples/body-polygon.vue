<template>
  <div class="w-full flex flex-col gap-4 border border-gray-300">
    <wrapper-physics
      v-bind="env"
      immediate
      class="h-[30rem] w-full flex items-center justify-center md:w-[40rem]"
    >
      <template v-for="item in list">
        <wrapper-physics-body
          v-for="index in item.quantity"
          :key="index"
          v-bind="bodyProp"
          class="aspect-square flex select-none items-center justify-center rounded-full bg-slate-300"
          :class="item.class"
        >
          🐟
        </wrapper-physics-body>
      </template>
    </wrapper-physics>
  </div>

  <div class="flex gap-6 p-4">
    <div class="">
      重力方向:
      <analog-stick
        size="14rem"
        @trigger="handleTrigger"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AnalogStick from '../../analog-stick.vue'
import WrapperPhysics from '../wrapper-physics.vue'
import WrapperPhysicsBody from '../wrapper-physics-body.vue'

const env = ref({
  gravity: {
    scale: 0.001,
    x: 0,
    y: 1,
  },
})

const bodyProp: InstanceType<typeof WrapperPhysicsBody>['$props'] = {
  polygon: 'circle',
  frictionAir: 0,
  friction: 0,
  restitution: 0.7,
}

function handleTrigger(e: { x: number; y: number }) {
  env.value.gravity.x = e.x
  env.value.gravity.y = e.y
}

const list = [
  {
    class: 'w-14 h-14 text-3xl',
    quantity: 2,
  },
  {
    class: 'w-10 h-10',
    quantity: 3,
  },
  {
    class: 'w-6 h-6 text-xs',
    quantity: 10,
  },
]
</script>
