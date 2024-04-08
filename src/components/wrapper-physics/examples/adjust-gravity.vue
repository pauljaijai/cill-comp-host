<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <wrapper-physics
      v-bind="env"
      immediate
      class="flex flex-col items-center justify-center border border-dashed w-[40rem] h-[30rem]"
    >
      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 6"
          :key="i"
          v-bind="bodyProp"
          class=" select-none"
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

    <div class="flex-col">
      <base-input
        v-model.number="bodyProp.friction"
        type="range"
        :label="`摩擦力: ${bodyProp.friction}`"
        class=" w-full "
        :min="0"
        :step="0.01"
        :max="1"
      />
      <base-input
        v-model.number="bodyProp.frictionAir"
        type="range"
        :label="`空氣阻力: ${bodyProp.frictionAir}`"
        class=" w-full "
        :min="0"
        :step="0.01"
        :max="1"
      />
      <base-input
        v-model.number="bodyProp.restitution"
        type="range"
        :label="`彈力: ${bodyProp.restitution}`"
        class=" w-full "
        :min="0"
        :step="0.01"
        :max="1.1"
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

const bodyProp = ref({
  frictionAir: 0.01,
  friction: 0.01,
  restitution: 1,
});

const handleTrigger = (e: { x: number, y: number }) => {
  env.value.gravity.x = e.x;
  env.value.gravity.y = e.y;
};
</script>
