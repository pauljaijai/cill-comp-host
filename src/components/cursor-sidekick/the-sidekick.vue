<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 465 465"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="232.5"
      cy="232.5"
      r="232.5"
      :fill="props.color"
    />
    <ellipse
      cx="170"
      cy="165.5"
      rx="24"
      ry="67.5"
      fill="white"
    />
    <ellipse
      cx="296"
      cy="165.5"
      rx="24"
      ry="67.5"
      fill="white"
    />
  </svg>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watchEffect } from 'vue';
import { throttleFilter, useMouse, useRafFn } from '@vueuse/core';
import { getVectorLength } from '../../common/utils';

// #region Props
interface Props {
  size: string;
  color: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.sidekick
  transform: translate(-50%, -50%)
</style>
