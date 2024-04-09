<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <wrapper-physics
      v-bind="env"
      immediate
      class="flex justify-center items-start w-full h-[100vh]"
    >
      <div class="flex">
        <wrapper-physics-body
          v-for="item in list"
          :key="item"
          v-bind="bodyProp"
          class=" select-none"
          :class="item"
        >
          🐟
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, } from 'vue';

import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';
import {
  refAutoReset,
  useWindowScroll
} from '@vueuse/core';
import { clamp } from 'remeda';

const { y } = useWindowScroll();

const gravityScale = refAutoReset(0.001, 200);
watch(y, (value, prevValue) => {
  const delta = clamp(
    value - prevValue,
    { max: 100, min: -100 }
  );

  gravityScale.value = 0.001 + delta * 0.00015;
});

const env = computed(() => ({
  gravity: {
    scale: gravityScale.value,
    x: 0,
    y: 1,
  },
}));

const bodyProp = {
  frictionAir: 0,
  friction: 0,
  restitution: 0.5,
}

const list = [
  'text-base', 'text-xl',
  'text-2xl', 'text-4xl',
  'text-5xl', 'text-7xl',
];
</script>

<style scoped lang="sass">
</style>
