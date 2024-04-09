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
        <wrapper-physics-body
          v-for="item, i in list"
          :key="i"
          v-bind="item"
        >
          {{ item.text }}
        </wrapper-physics-body>
      </div>

      <wrapper-physics-body>
        🐟
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

/** 回彈力設為 1.5，表示回彈速度會是進入速度的 1.5 倍
 * 
 * 畫面會超嗨喔！ᕕ( ﾟ ∀。)ᕗ 
 */
const restitution = 1.5;

const list = [
  { text: '鱈魚', isStatic: true },
  { text: '真', restitution },
  { text: '的', restitution },
  { text: '不', restitution },
  { text: '是', frictionAir: 1 },
  { text: '一', restitution },
  { text: '種', restitution },
  { text: '很肥', isStatic: true },
  { text: '的', restitution },
  { text: '🐟', restitution },
]
</script>
