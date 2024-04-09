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
        class="flex flex-col-reverse"
      >
        <wrapper-physics-body
          v-for="word, j in text.split('')"
          v-slot="scope"
          :key="j"
          polygon="circle"
          :friction-air="j * 0.05"
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
import { mapNumber } from '../../../common/utils';

type ScopeProp = Parameters<
  NonNullable<InstanceType<typeof WrapperPhysicsBody>['$slots']['default']>
>[0]

const wrapperRef = ref<InstanceType<typeof WrapperPhysics>>();

const env = ref({
  gravity: {
    scale: 0.0005,
    x: -0.8,
    y: 1,
  },
});

const list = [
  '一首寫不盡的詩歌'.split('').reverse().join(''),
  '隨之時間淡去'.split('').reverse().join(''),
]

function getStyle(scope: ScopeProp): CSSProperties {
  const opacity = mapNumber(
    scope.offsetY,
    0, scope.height * 5,
    1, 0,
  );

  return { opacity };
}
</script>
