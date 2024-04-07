<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <div class="flex gap-2">
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
      class="flex flex-col items-center justify-center border border-dashed w-[40rem] h-[30rem]"
    >
      <div class="flex">
        <wrapper-physics-body is-static>
          鱈魚
        </wrapper-physics-body>

        <wrapper-physics-body
          v-for="item, i in '真的不'"
          :key="i"
          :restitution="restitution"
        >
          {{ item }}
        </wrapper-physics-body>

        <wrapper-physics-body :friction-air="1">
          是
        </wrapper-physics-body>

        <wrapper-physics-body
          v-for="item, i in '一種'"
          :key="i"
          :restitution="restitution"
        >
          {{ item }}
        </wrapper-physics-body>

        <wrapper-physics-body is-static>
          很肥
        </wrapper-physics-body>

        <wrapper-physics-body
          v-for="item, i in '的'"
          :key="i"
          :restitution="restitution"
        >
          {{ item }}
        </wrapper-physics-body>

        <wrapper-physics-body :restitution="restitution">
          🐟
        </wrapper-physics-body>
      </div>

      <div class="flex">
        <wrapper-physics-body
          v-for="item, i in 3"
          :key="i"
          :restitution="restitution"
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

/** 彈力設為 1.5，表示回彈速度會是進入速度的 1.5 倍
 * 
 * 畫面會超嗨喔！ᕕ( ﾟ ∀。)ᕗ 
 */
const restitution = 1.5;
</script>
