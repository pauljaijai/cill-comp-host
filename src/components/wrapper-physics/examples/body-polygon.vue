<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <wrapper-physics
      v-bind="env"
      immediate
      class="flex flex-col items-center justify-center border border-dashed w-[40rem] h-[30rem]"
    >
      <div class="">
        <wrapper-physics-body
          v-for="item in 10"
          :key="item"
          v-bind="bodyProp"
          class=" w-10 h-10 flex justify-center items-center select-none bg-slate-300 rounded-full"
        >
          🐟
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>

  <div class="flex p-4 gap-6">
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
import { ref, } from 'vue';

import AnalogStick from '../../analog-stick.vue';
import BaseInput from '../../base-input.vue';
import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';

const env = ref({
  gravity: {
    scale: 0.001,
    x: 0,
    y: 1,
  },
});

const bodyProp: InstanceType<typeof WrapperPhysicsBody>['$props'] = {
  polygon: 'circle',
  frictionAir: 0,
  friction: 0.01,
  restitution: 0.6,
};

const handleTrigger = (e: { x: number, y: number }) => {
  env.value.gravity.x = e.x;
  env.value.gravity.y = e.y;
};
</script>
