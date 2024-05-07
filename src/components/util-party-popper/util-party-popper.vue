<template>
  <div class="view">
    <canvas
      ref="canvasRef"
      class=" absolute left-0 top-0 w-full h-full"
    />

    <slot />
  </div>
</template>


<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { onMounted, ref, shallowRef } from 'vue';

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

const canvasRef = ref<HTMLCanvasElement>();
const canvasBounding = useElementBounding(canvasRef);

onMounted(async () => {
  if (!canvasRef.value) return;
 

});


// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
