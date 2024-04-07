<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <wrapper-physics
      ref="wrapperRef"
      immediate
      class="flex flex-col items-center justify-center border border-dashed w-[40rem] h-[30rem]"
    >
      <div class="flex">
        <wrapper-physics-body :friction-air="1">
          鱈魚
        </wrapper-physics-body>

        <wrapper-physics-body
          v-for="item, i in '是一種'"
          :key="i"
          :restitution="1.5"
        >
          {{ item }}
        </wrapper-physics-body>

        <wrapper-physics-body is-static>
          很肥
        </wrapper-physics-body>

        <wrapper-physics-body
          v-for="item, i in '的'"
          :key="i"
          :restitution="1.5"
        >
          {{ item }}
        </wrapper-physics-body>

        <wrapper-physics-body :restitution="1.5">
          🐟
        </wrapper-physics-body>
      </div>

      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 3"
          :key="i"
          :restitution="1.5"
        >
          🐟
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseBtn from '../../base-btn.vue';
import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';

const wrapperRef = ref<InstanceType<typeof WrapperPhysics>>();
</script>
