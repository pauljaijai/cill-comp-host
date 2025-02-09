<template>
  <div class="relative aspect-[3/2]">
    <face-eye
      v-bind="props"
      class="absolute left-0 top-0"
    />
    <face-eyebrow
      class="absolute left-0 top-0"
      v-bind="props"
    />
    <face-mouth
      class="absolute left-0 top-0"
      v-bind="props"
    />
  </div>
</template>

<script setup lang="ts">
import type { FacialExpression } from './type'
import FaceEye from './face-eye.vue'
import FaceEyebrow from './face-eyebrow.vue'
import FaceMouth from './face-mouth.vue'

// #region Props
interface Props {
  facialExpression?: FacialExpression;
  strokeColor?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  facialExpression: 'neutral',
  strokeColor: 'black',
})

// #region Emits
const emit = defineEmits<{
  change: [];
}>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: (props: { isRunning: boolean }) => unknown;
}>()
// #endregion Slots

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
