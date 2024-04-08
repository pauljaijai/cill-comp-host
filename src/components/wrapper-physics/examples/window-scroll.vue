<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <wrapper-physics
      v-bind="env"
      immediate
      class="flex flex-col items-center justify-center border border-dashed w-[20rem] h-[100vh]"
    >
      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 3"
          :key="i"
          v-bind="bodyProp"
          class="fish select-none"
        >
          🐟
        </wrapper-physics-body>
      </div>

      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 3"
          :key="i"
          v-bind="bodyProp"
          class="fish select-none"
        >
          🐟
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, } from 'vue';

import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();

const env = ref({
  gravity: {
    scale: 0.001,
    x: 0,
    y: 1,
  },
});

const bodyProp = ref({
  frictionAir: 0,
  friction: 0,
  restitution: 0.5,
});

watch(y, (value, prevValue) => {
  const delta = value - prevValue;
  env.value.gravity.scale = 0.001 + delta * 0.00015;
});
</script>

<style scoped lang="sass">
.fish
  &:nth-child(1)
    font-size: 1rem
  &:nth-child(2)
    font-size: 2rem
  &:nth-child(3)
    font-size: 3rem
</style>
