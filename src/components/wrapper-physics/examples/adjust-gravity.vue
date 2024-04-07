<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <wrapper-physics
      v-bind="param"
      immediate
      class="flex flex-col items-center justify-center border border-dashed w-[40rem] h-[30rem]"
    >
      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 3"
          :key="i"
          :restitution="1.1"
        >
          🐟
        </wrapper-physics-body>
      </div>
      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 2"
          :key="i"
          :restitution="1.1"
        >
          🐟
        </wrapper-physics-body>
      </div>
      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 1"
          :key="i"
          :restitution="1.1"
        >
          🐟
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>

  <div class="flex p-4">
    <analog-stick
      size="20rem"
      @trigger="handleTrigger"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';

import AnalogStick from '../../analog-stick.vue';
import BaseBtn from '../../base-btn.vue';
import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';

const param = ref({
  gravity: {
    scale: 0.001,
    x: 0,
    y: 1,
  }
});

const handleTrigger = (e: { x: number, y: number }) => {
  param.value.gravity.x = e.x;
  param.value.gravity.y = e.y;
};
</script>
