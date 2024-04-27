<template>
  <div
    ref="wrapperRef"
    class=" relative"
  >
    <slot />

    <svg
      v-bind="size"
      xmlns="http://www.w3.org/2000/svg"
      class=" absolute"
      :style="svgStyle"
    >
      <mask :id="maskId">
        <rect
          x="0"
          y="0"
          v-bind="size"
          fill="white"
          rx="20"
        />

        <!-- 嘴巴 -->
        <rect
          v-bind="mouthStyle"
          fill="black"
          rx="10"
        />
      </mask>

      <!-- 使用遮罩的矩形 -->
      <rect
        x="0"
        y="0"
        v-bind="size"
        fill="#FF9DC0"
        :mask="`url(#${maskId})`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, SVGAttributes, computed, ref } from 'vue';
import { nanoid } from 'nanoid';
import { useMouseInElement } from '@vueuse/core';

// #region Props
interface Props {
  /** 卡比皮膚的厚度。單位 px
   * 
   * @default 10
   */
  thickness?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  thickness: 10,
});

// #region Emits
const emit = defineEmits<{
  // 'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

const maskId = nanoid();
const wrapperRef = ref<HTMLDivElement>();
const {
  elementWidth, elementHeight
} = useMouseInElement(wrapperRef);

const size = computed(() => ({
  width: elementWidth.value + props.thickness * 2,
  height: elementHeight.value + props.thickness * 2,
}));

const svgStyle = computed<CSSProperties>(() => ({
  ...size.value,
  left: -props.thickness,
  top: -props.thickness,
}));

const mouthStyle = computed<SVGAttributes>(() => {
  const width = size.value.width / 2;
  const height = size.value.height / 2;

  return {
    width,
    height,
    x: size.value.width / 2 - width / 2,
    y: size.value.height / 2 - height / 2,
  }
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
