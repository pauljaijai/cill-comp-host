<template>
  <div class="fixed left-0 top-0 w-0 h-0 ">
    <the-sidekick v-bind="sidekickProp" />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watchEffect } from 'vue';
import { throttleFilter, useMouse, useRafFn } from '@vueuse/core';
import { getVectorLength } from '../../common/utils';
import { ExtractComponentParam } from '../../types';

import TheSidekick from './the-sidekick.vue';

type SidekickProp = InstanceType<typeof TheSidekick>['$props'];

/**
 * 此元件負責控制人物移動，情緒和互動交給 the-sidekick 處理
 */

// #region Props
interface Props {
  size?: string;
  /** \# 前綴之 HEX 格式
   * @default '#515151'
   */
  color?: string;
  /** 最大速度。越慢小跟班越悠哉。單位 px/ms
   * @default 1
   */
  maxVelocity?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  size: '3rem',
  color: '#515151',
  maxVelocity: 2,
});

// #region Emits
const emit = defineEmits<{
  // 
}>();
// #endregion Emits

const mouseInfo = useMouse({
  eventFilter: throttleFilter(15),
  type: 'client',
})

const position = ref({
  x: 800,
  y: 500,
});

const style = computed<CSSProperties>(() => {
  return {
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
  }
});

/** 位移 */
const displacement = ref(0);
/** 速率。px/ms */
const velocity = ref(0);

// useRafFn(({ delta: deltaTime }) => {
//   const delta = {
//     x: mouseInfo.x.value - position.value.x,
//     y: mouseInfo.y.value - position.value.y,
//   }

//   const deltaPosition = {
//     x: delta.x / 20,
//     y: delta.y / 20,
//   }
//   if (Math.abs(deltaPosition.x) < 0.1 && Math.abs(deltaPosition.y) < 0.1) {
//     displacement.value = 0;
//     velocity.value = 0;
//     return;
//   }

//   displacement.value = getVectorLength(deltaPosition);
//   velocity.value = displacement.value / deltaTime;

//   if (velocity.value > props.maxVelocity) {
//     deltaPosition.x /= velocity.value / props.maxVelocity;
//     deltaPosition.y /= velocity.value / props.maxVelocity;
//   }

//   position.value.x += deltaPosition.x;
//   position.value.y += deltaPosition.y;
// })

const sidekickProp = computed<SidekickProp>(() => ({
  ...props,
  style: style.value,
  velocity: velocity.value,
  position: {
    x: position.value.x,
    y: position.value.y,
  },
  targetPosition: {
    x: mouseInfo.x.value,
    y: mouseInfo.y.value,
  },
}));

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
