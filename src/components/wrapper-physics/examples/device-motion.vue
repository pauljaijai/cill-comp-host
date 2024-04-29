<template>
  <div class=" relative flex flex-col gap-4 w-full border border-gray-300">
    <wrapper-physics
      v-bind="env"
      immediate
      class="flex items-center justify-center md:w-[40rem] w-full h-[30rem]"
    >
      <template v-for="item in list">
        <wrapper-physics-body
          v-for="index in item.quantity"
          :key="index"
          v-bind="bodyProp"
          class=" flex justify-center items-center select-none bg-slate-300 rounded-full aspect-square"
          :class="item.class"
        >
          🐟
        </wrapper-physics-body>
      </template>

    </wrapper-physics>

    <div
      v-if="!isSupport"
      class="not-support-box "
    >
      <div class="p-5 bg-red-500 text-white rounded">
        無法取得此設備的感測器。（＞人＜；）
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, } from 'vue';
import { getVectorLength, mapNumber } from '../../../common/utils';
import { isNullish, pipe } from 'remeda';

import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';

import { throttleFilter, useDeviceMotion } from '@vueuse/core';

const {
  accelerationIncludingGravity: acceleration
} = useDeviceMotion({
  eventFilter: throttleFilter(35),
});

const isSupport = computed(() => {
  if (acceleration.value === null) {
    return false;
  }

  return acceleration.value.x !== null;
});

watch(acceleration, (value) => {
  if (!isSupport.value || !value) return;

  updateEnv(value);
}, { deep: true });

const env = ref({
  gravity: {
    scale: 0.001,
    x: 0,
    y: 1,
  },
});

function updateEnv(acc: DeviceMotionEventAcceleration) {
  const { x, y } = acc;
  if (isNullish(x) || isNullish(y)) return;

  const scale = pipe(
    getVectorLength({ x, y }),
    /** 重力最大值為 9.8 */
    (value) => mapNumber(
      value,
      0, 9.8,
      0, 0.0005
    ),
  );

  /** x 方向與環境 x 軸相反 */
  env.value.gravity = {
    scale, x: -x, y
  }
}

const bodyProp = {
  frictionAir: 0.01,
  friction: 0.01,
  restitution: 0.1,
};

const list = [
  {
    class: 'w-14 h-14 text-3xl',
    quantity: 2,
  },
  {
    class: 'w-10 h-10',
    quantity: 3,
  },
  {
    class: 'w-6 h-6 text-xs',
    quantity: 10,
  },
]
</script>

<style lang="sass">
.not-support-box
  position: absolute
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
</style>