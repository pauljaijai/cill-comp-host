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
      v-bind="env"
      ref="wrapperRef"
      class="flex flex-row-reverse gap-4 items-center justify-center border border-dashed md:w-[40rem] w-full h-[30rem]"
    >
      <div
        v-for="text, i in list"
        :key="i"
        class="flex flex-col"
      >
        <wrapper-physics-body
          v-for="word, j in text.split('')"
          v-slot="scope"
          :key="j"
          polygon="circle"
          :friction-air="(j + i) * 0.005"
        >
          <span :style="getStyle(scope)">
            {{ word }}
          </span>
        </wrapper-physics-body>
      </div>
    </wrapper-physics>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, ref } from 'vue';

import BaseBtn from '../../base-btn.vue';
import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';
import { getVectorLength, mapNumber } from '../../../common/utils';

type ScopeProp = Parameters<
  NonNullable<InstanceType<typeof WrapperPhysicsBody>['$slots']['default']>
>[0]

const wrapperRef = ref<InstanceType<typeof WrapperPhysics>>();

const env = ref({
  gravity: {
    scale: 0.0005,
    x: -1,
    y: -0.3,
  },
});

const list = [
  '改不盡的需求與鍵盤的呢喃交織',
  '隨時間凋零，不是任務',
  '而是我不再新鮮的',
  '肝',
]

function getStyle(scope: ScopeProp): CSSProperties {
  /** 計算偏移距離 */
  const distance = getVectorLength({
    x: scope.offsetX,
    y: scope.offsetY,
  })

  /** 偏越多越淡 */
  const opacity = mapNumber(
    distance,
    0, scope.height * 5,
    1, 0,
  );

  return { opacity };
}
</script>
