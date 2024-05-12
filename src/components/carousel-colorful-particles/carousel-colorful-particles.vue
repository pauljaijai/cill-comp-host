<template>
  <div class=" overflow-hidden">
    <img
      src="/painting-codfish-rain.webp"
      class=" object-cover w-full h-full"
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

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

function loadImage(src: string) {
  const image = new Image();
  image.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    const pixelData = ctx.getImageData(0, 0, 1, 1).data;

    const red = pixelData[0];
    const green = pixelData[1];
    const blue = pixelData[2];
    const alpha = pixelData[3]; // Alpha 通道，表示透明度

    // 輸出顏色值
    console.log(`Color at (0, 0) - Red: ${red}, Green: ${green}, Blue: ${blue}, Alpha: ${alpha}`);
  }
  image.src = src;
}

onMounted(() => {
  loadImage('/painting-codfish-rain.webp');
});


// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
