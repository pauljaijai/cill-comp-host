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
        />

        <!-- 嘴巴 -->
        <rect
          ref="mouthRef"
          v-bind="mouthStyleMap.leave"
          fill="black"
          rx="10"
        />
      </mask>

      <!-- 身體 -->
      <rect
        ref="bodyRef"
        v-bind="bodyStyleMap.leave"
        fill="#FF9DC0"
        :mask="`url(#${maskId})`"
        rx="20"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { CSSProperties, SVGAttributes, computed, nextTick, onMounted, ref, watch } from 'vue';
import { nanoid } from 'nanoid';
import { useMouseInElement } from '@vueuse/core';

interface SvgElMap {
  bodyEl: SVGRectElement;
  mouthEl: SVGRectElement;
}
interface StyleMap {
  enter: Pick<SVGAttributes, 'width' | 'height' | 'x' | 'y'>;
  leave: Pick<SVGAttributes, 'width' | 'height' | 'x' | 'y'>;
}

// #region Props
interface Props {
  /** 是否塞滿嘴 */
  isMouthful?: boolean;
  /** 卡比皮膚的厚度。單位 px
   * 
   * @default 10
   */
  thickness?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  isMouthful: false,
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
  elementWidth, elementHeight, isOutside
} = useMouseInElement(wrapperRef);

/** 卡比尺寸 */
const size = computed(() => ({
  width: elementWidth.value + props.thickness * 2,
  height: elementHeight.value + props.thickness * 2,
}));

const svgStyle = computed<CSSProperties>(() => ({
  ...size.value,
  left: -props.thickness,
  top: -props.thickness,
}));

const mouthRef = ref<SVGRectElement>();
const mouthStyleMap = computed<StyleMap>(() => {
  const width = size.value.width / 2;
  const height = size.value.height / 4;

  return {
    enter: {
      width,
      height,
      x: size.value.width / 2 - width / 2,
      y: size.value.height / 2 - height / 4,
    },
    leave: {
      width: elementWidth.value,
      height: elementHeight.value,
      x: props.thickness,
      y: props.thickness,
    },
  }
});

const bodyRef = ref<SVGRectElement>();
const bodyStyleMap = computed<StyleMap>(() => {
  return {
    enter: {
      ...size.value,
      x: 0,
      y: 0,
    },
    leave: {
      width: elementWidth.value,
      height: elementHeight.value,
      x: props.thickness,
      y: props.thickness,
    },
  }
});

function enterStuffed({ bodyEl, mouthEl }: SvgElMap) {
  anime.remove([bodyEl, mouthEl]);

  anime({
    targets: bodyEl,
    ...bodyStyleMap.value.enter,
    duration: 800,
  })

  anime({
    targets: mouthEl,
    ...mouthStyleMap.value.enter,
    duration: 800,
    delay: 300,
  })
}
function leaveStuffed({ bodyEl, mouthEl }: SvgElMap) {
  anime.remove([bodyEl, mouthEl]);

  anime({
    targets: mouthEl,
    ...mouthStyleMap.value.leave,
    duration: 800,
    easing: 'easeInOutExpo',
  })

  anime({
    targets: bodyEl,
    ...bodyStyleMap.value.leave,
    duration: 800,
    delay: 600,
  })
}
function startAnimation(value: boolean) {
  if (!bodyRef.value || !mouthRef.value) return;

  if (value) {
    enterStuffed({
      bodyEl: bodyRef.value,
      mouthEl: mouthRef.value,
    });
    return;
  }

  leaveStuffed({
    bodyEl: bodyRef.value,
    mouthEl: mouthRef.value,
  });
}

watch(() => props.isMouthful, () => {
  startAnimation(props.isMouthful);
})

onMounted(async () => {
  await nextTick();
  startAnimation(props.isMouthful);
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
