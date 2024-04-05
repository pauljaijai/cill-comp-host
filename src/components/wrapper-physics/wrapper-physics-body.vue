<template>
  <div
    ref="containerRef"
    :style="style"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type VNode, inject, ref, onMounted, computed, watch } from 'vue';
import { PROVIDE_KEY, ProvideContent } from '.';
import { nanoid } from 'nanoid';
import { useElementBounding, useIntervalFn } from '@vueuse/core';
import { Body } from './'

// #region Props
interface Props extends Pick<
  Body, 'frictionAir' | 'friction' | 'restitution' | 'mass' | 'isStatic'
> { }
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  frictionAir: 0.01,
  friction: 0.1,
  restitution: 0.3,
  mass: undefined,
  isStatic: false,
});

const id = nanoid();

const containerRef = ref<HTMLDivElement>();
const {
  width, height, x, y,
} = useElementBounding(containerRef);

const wrapper = inject<ProvideContent>(PROVIDE_KEY);
if (!wrapper) {
  console.warn('wrapper-physics-body 必須在 wrapper-physics 元件中使用');
}

const info = ref({
  offsetX: 0,
  offsetY: 0,
  rotate: 0,
});
useIntervalFn(() => {
  const value = wrapper?.getInfo(id);
  if (!value) return;

  info.value = value;
}, 10);

const style = computed(() => {
  const {
    offsetX, offsetY, rotate
  } = info.value;

  return {
    transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
  }
});

function bindBody() {
  wrapper?.bindBody({
    id,
    width: width.value,
    height: height.value,
    x: x.value,
    y: y.value,
    ...props,
  });
}

onMounted(() => {
  bindBody();
});
</script>

<style scoped lang="sass">
</style>
