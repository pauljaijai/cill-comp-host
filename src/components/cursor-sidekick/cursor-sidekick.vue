<template>
  <div class="sidekick fixed left-0 top-0 pointer-events-none">
    <the-sidekick v-bind="sidekickProp" />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watchEffect } from 'vue';
import { throttleFilter, useMouse, useRafFn } from '@vueuse/core';
import { getVectorLength } from '../../common/utils';

import TheSidekick from './the-sidekick.vue';

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
  x: 0,
  y: 0,
});

const style = computed<CSSProperties>(() => {
  return {
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
  }
});

const sidekickProp = computed(() => ({
  ...props,
  style: style.value,
}));

/** 位移 */
const displacement = ref(0);
/** 速率。px/ms */
const velocity = ref(0);
watchEffect(() => {
  console.log('velocity:', velocity.value);
});

useRafFn(({ delta: deltaTime }) => {
  const delta = {
    x: mouseInfo.x.value - position.value.x,
    y: mouseInfo.y.value - position.value.y,
  }

  const deltaPosition = {
    x: delta.x / 5,
    y: delta.y / 5,
  }
  if (Math.abs(deltaPosition.x) < 0.1 && Math.abs(deltaPosition.y) < 0.1) {
    displacement.value = 0;
    velocity.value = 0;
    return;
  }


  displacement.value = getVectorLength(deltaPosition);
  velocity.value = displacement.value / deltaTime;

  if (velocity.value > props.maxVelocity) {
    deltaPosition.x /= velocity.value / props.maxVelocity;
    deltaPosition.y /= velocity.value / props.maxVelocity;
  }

  position.value.x += deltaPosition.x;
  position.value.y += deltaPosition.y;
})



// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.sidekick
  transform: translate(-50%, -50%)
</style>
