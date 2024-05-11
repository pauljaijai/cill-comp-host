<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <util-party-popper
      ref="popperRef"
      v-slot="{ fps }"
      class=" flex h-[60vh]"
    >
      <div class=" w-full h-full flex flex-col justify-center items-center gap-6">
        <div class="flex gap-6">
          <div
            ref="ltBtnRef"
            class=" text-4xl rounded p-4 select-none cursor-pointer -rotate-90"
            @click="emit(ltBtnBounding, 'lt')"
          >
            🎉
          </div>

          <div
            ref="tBtnRef"
            class=" text-4xl rounded p-4 select-none cursor-pointer -rotate-45"
            @click="emit(tBtnRefBounding, 't')"
          >
            🎉
          </div>

          <div
            ref="rtBtn01Ref"
            class=" text-4xl rounded p-4 select-none cursor-pointer"
            @click="emit(rtBtn01Bounding, 'rt')"
          >
            🎉
          </div>
        </div>

        <div class="flex gap-10">
          <div
            ref="lBtnRef"
            class=" text-4xl rounded p-4 select-none cursor-pointer -rotate-[135deg]"
            @click="emit(lBtnRefBounding, 'l')"
          >
            🎉
          </div>

          <div
            ref="rBtnRef"
            class=" text-4xl rounded p-4 select-none cursor-pointer rotate-45"
            @click="emit(rBtnRefBounding, 'r')"
          >
            🎉
          </div>
        </div>

        <div
          ref="sparkBtnRef"
          class=" text-4xl rounded p-4 select-none cursor-pointer"
          @click="emit(sparkBtnBounding)"
        >
          🎇
        </div>
      </div>

      <div class=" absolute left-0 top-0 p-4">
        {{ fps }}
      </div>
    </util-party-popper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UtilPartyPopper from '../util-party-popper.vue';
import { useElementBounding } from '@vueuse/core';
import { conditional, constant, isDeepEqual } from 'remeda';
import { Scalar } from '@babylonjs/core';

const popperRef = ref<InstanceType<typeof UtilPartyPopper>>();
const popperBounding = useElementBounding(popperRef);

const rtBtn01Ref = ref<HTMLDivElement>();
const rtBtn01Bounding = useElementBounding(rtBtn01Ref);

const ltBtnRef = ref<HTMLDivElement>();
const ltBtnBounding = useElementBounding(ltBtnRef);

const tBtnRef = ref<HTMLDivElement>();
const tBtnRefBounding = useElementBounding(tBtnRef);

const rBtnRef = ref<HTMLDivElement>();
const rBtnRefBounding = useElementBounding(rBtnRef);

const lBtnRef = ref<HTMLDivElement>();
const lBtnRefBounding = useElementBounding(lBtnRef);

const sparkBtnRef = ref<HTMLDivElement>();
const sparkBtnBounding = useElementBounding(sparkBtnRef);

type Direction = 'rt' | 'lt' | 't' | 'l' | 'r';

function emit(
  bounding: ReturnType<typeof useElementBounding>,
  direction?: Direction,
) {
  const position = {
    x: bounding.left.value + bounding.width.value / 2 - popperBounding.left.value,
    y: bounding.top.value + bounding.height.value / 2 - popperBounding.top.value,
  }

  const velocityRange = { min: 2, max: 8 }

  const param = conditional(direction,
    [
      isDeepEqual('rt'),
      constant(() => ({
        ...position,
        velocity: {
          x: -Scalar.RandomRange(velocityRange.min, velocityRange.max),
          y: Scalar.RandomRange(velocityRange.min, velocityRange.max),
        },
      }))
    ],
    [
      isDeepEqual('lt'),
      constant(() => ({
        ...position,
        velocity: {
          x: Scalar.RandomRange(velocityRange.min, velocityRange.max),
          y: Scalar.RandomRange(velocityRange.min, velocityRange.max),
        },
      }))
    ],
    [
      isDeepEqual('t'),
      constant(() => ({
        ...position,
        velocity: {
          x: Scalar.RandomRange(-2, 2),
          y: Scalar.RandomRange(velocityRange.min, velocityRange.max),
        },
      }))
    ],
    [
      isDeepEqual('l'),
      constant(() => ({
        ...position,
        velocity: {
          x: Scalar.RandomRange(velocityRange.min, velocityRange.max),
          y: Scalar.RandomRange(-2, 2),
        },
      }))
    ],
    [
      isDeepEqual('r'),
      constant(() => ({
        ...position,
        velocity: {
          x: -Scalar.RandomRange(velocityRange.min, velocityRange.max),
          y: Scalar.RandomRange(-2, 2),
        },
      }))
    ],
    conditional.defaultCase(() => position),
  );

  popperRef.value?.emit(param);
}
</script>
