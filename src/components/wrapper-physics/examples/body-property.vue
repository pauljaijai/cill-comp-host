<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <wrapper-physics
      ref="wrapperRef"
      immediate
      class="flex flex-col items-start gap-1 border border-dashed w-[40rem] h-[30rem]"
    >
      <wrapper-physics-body :friction-air="1">
        超慢
      </wrapper-physics-body>

      <wrapper-physics-body
        v-for="item, i in 2"
        :key="i"
        :restitution="1.5"
      >
        ( ﾟ ∀。)
      </wrapper-physics-body>

      <wrapper-physics-body
        v-for="item, i in 3"
        :key="i"
        :restitution="1.5"
      >
        🐟
      </wrapper-physics-body>

      <wrapper-physics-body
        class=" m-auto"
        is-static
      >
        不動如山
      </wrapper-physics-body>
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
