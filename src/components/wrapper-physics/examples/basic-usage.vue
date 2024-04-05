<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex gap-4">
      <base-btn
        label="開始"
        @click="wrapperRef?.start()"
      />

      <base-btn
        label="重置"
        @click="wrapperRef?.reset()"
      />
    </div>

    <wrapper-physics
      ref="wrapperRef"
      class="flex flex-col items-start gap-1 border border-dashed w-[40rem] h-[30rem]"
    >
      <wrapper-physics-body>
        ( ´ ▽ ` )ﾉ
      </wrapper-physics-body>

      <wrapper-physics-body>
        安安安
      </wrapper-physics-body>

      <wrapper-physics-body>
        安安
      </wrapper-physics-body>

      <wrapper-physics-body is-static>
        安
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
