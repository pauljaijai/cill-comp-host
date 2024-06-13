<template>
  <div class=" fixed left-0 top-0">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// #region Props
interface Props {
  size?: string;
  /** # 前綴之 HEX 格式 */
  color?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  size: '3rem',
  color: '#515151',
});

// #region Emits
const emit = defineEmits<{
  // 
}>();
// #endregion Emits

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
