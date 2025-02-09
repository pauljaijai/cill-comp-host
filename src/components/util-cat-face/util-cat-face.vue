<template>
  <div class="relative aspect-[3/2]">
    <face-eye class="absolute" />
    <face-eyebrow class="absolute" />
    <face-mouth class="absolute" />
  </div>
</template>

<script setup lang="ts">
import FaceEye from './face-eye.vue'
import FaceEyebrow from './face-eyebrow.vue'
import FaceMouth from './face-mouth.vue'

// #region Props
type FacialExpression = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised'

interface Props {
  facialExpression?: string;
  strokeColor?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
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
