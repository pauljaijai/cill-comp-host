<template>
  <canvas ref="canvasRef" />
</template>


<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { Application } from 'pixi.js';
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

const app = shallowRef<Application>();
async function createApplication(el: HTMLCanvasElement) {
  const app = new Application();

  await app.init({
    canvas: el,
    backgroundAlpha: 0,
    width: canvasBounding.width.value,
    height: canvasBounding.height.value,
    resizeTo: canvasRef.value,
  })

  return app;
}

onMounted(async () => {
  if (!canvasRef.value) return;
  app.value = await createApplication(canvasRef.value);
});


// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
