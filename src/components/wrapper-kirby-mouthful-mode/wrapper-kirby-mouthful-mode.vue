<template>
  <div
    ref="wrapperRef"
    class=" relative"
  >
    <slot />

    <svg
      v-bind="size"
      xmlns="http://www.w3.org/2000/svg"
      class=" absolute pointer-events-none"
      :style="svgStyle"
    >
      <mask :id="maskId">
        <rect
          ref="maskRef"
          v-bind="maskStyleMap.leave"
          fill="white"
        />

        <!-- 嘴巴 -->
        <rect
          ref="mouthRef"
          v-bind="mouthStyleMap.leave"
          fill="black"
          :rx="props.mouthRounded"
        />
      </mask>

      <!-- 身體 -->
      <rect
        ref="bodyRef"
        v-bind="bodyStyleMap.leave"
        :fill="props.mainColor"
        :mask="`url(#${maskId})`"
        :rx="props.bodyRounded"
      />

      <eyes
        ref="eyesRef"
        :size="size"
        :thickness="props.thickness"
        :mask-id="maskId"
      />

      <blushes
        ref="blushesRef"
        :size="size"
        :thickness="props.thickness"
        :mask-id="maskId"
        :color="props.blushColor"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs';
import {
  CSSProperties, computed,
  nextTick, onMounted, ref, watch
} from 'vue';
import { nanoid } from 'nanoid';
import { Size, StyleMap } from './type';

import Eyes from './kirby-eyes.vue';
import Blushes from './kirby-blushes.vue';

import { throttleFilter, useMouseInElement } from '@vueuse/core';

interface SvgElMap {
  maskEl: SVGRectElement;
  bodyEl: SVGRectElement;
  mouthEl: SVGRectElement;
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
  /** 主色 */
  mainColor?: string;
  /** 腮紅顏色 */
  blushColor?: string;
  /** 身體圓角 */
  bodyRounded?: number;
  /** 嘴巴圓角 */
  mouthRounded?: number;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  isMouthful: false,
  thickness: 10,
  mainColor: '#FF9DC0',
  blushColor: '#FF639B',
  bodyRounded: 20,
  mouthRounded: 10,
});

const maskId = nanoid();
const wrapperRef = ref<HTMLDivElement>();
const {
  elementWidth, elementHeight,
} = useMouseInElement(wrapperRef, {
  eventFilter: throttleFilter(500),
});

/** 卡比尺寸 */
const size = computed<Size>(() => ({
  width: elementWidth.value + props.thickness * 2,
  height: elementHeight.value + props.thickness * 2,
}));

const svgStyle = computed<CSSProperties>(() => ({
  ...size.value,
  left: -props.thickness,
  top: -props.thickness,
}));

const maskRef = ref<SVGRectElement>();
const maskStyleMap = computed<StyleMap>(() => {
  return {
    enter: {
      ...size.value,
      x: 0,
      y: 0
    },
    leave: {
      width: elementWidth.value,
      height: elementHeight.value,
      x: props.thickness,
      y: props.thickness,
    },
  }
})

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

const eyesRef = ref<InstanceType<typeof Eyes>>();
const blushesRef = ref<InstanceType<typeof Blushes>>();

function enterStuffed({ maskEl, bodyEl, mouthEl }: SvgElMap) {
  anime.remove([maskEl, bodyEl, mouthEl]);

  anime({
    targets: maskEl,
    ...maskStyleMap.value.enter,
    duration: 800,
  })
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

  eyesRef.value?.enter({
    duration: 800,
    delay: 300,
  });
  blushesRef.value?.enter({
    duration: 800,
    delay: 300,
  });
}
function leaveStuffed({ maskEl, bodyEl, mouthEl }: SvgElMap) {
  anime.remove([maskEl, bodyEl, mouthEl]);

  eyesRef.value?.leave({
    duration: 800,
    delay: 0,
    easing: 'easeInOutExpo',
  });
  blushesRef.value?.leave({
    duration: 800,
    delay: 0,
    easing: 'easeInOutExpo',
  });
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

  anime({
    targets: maskEl,
    ...maskStyleMap.value.leave,
    duration: 800,
    delay: 600,
  })
}
function startAnimation(value: boolean) {
  if (!maskRef.value || !bodyRef.value || !mouthRef.value) return;

  if (value) {
    enterStuffed({
      maskEl: maskRef.value,
      bodyEl: bodyRef.value,
      mouthEl: mouthRef.value,
    });
    return;
  }

  leaveStuffed({
    maskEl: maskRef.value,
    bodyEl: bodyRef.value,
    mouthEl: mouthRef.value,
  });
}

watch(() => props.isMouthful, () => {
  startAnimation(props.isMouthful);
})

onMounted(async () => {
  // 等待下一個 tick，確保 slot 內容已渲染
  await nextTick();
  startAnimation(props.isMouthful);
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>
