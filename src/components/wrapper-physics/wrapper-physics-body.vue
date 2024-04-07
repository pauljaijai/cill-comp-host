<template>
  <div
    ref="containerRef"
    :style="style"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, computed, watch } from 'vue';
import { PROVIDE_KEY, ProvideContent } from '.';
import { nanoid } from 'nanoid';
import { useElementBounding, useIntervalFn } from '@vueuse/core';

// #region Props
interface Props {
  /** 空氣阻力。物體在空氣中受到的阻力 */
  frictionAir?: number;
  /** 摩擦力。物體本身的摩擦力，必須為 0 ~ 1，0 表示持續滑動，1 表示受力後會立即停止 */
  friction?: number;
  /** 回彈力。碰撞的回彈係數，0 表示不反彈，1 表示完全反彈 */
  restitution?: number;
  /** 物體質量 */
  mass?: number;
  /** 靜止。會變成像地面那樣完全靜止的存在 */
  isStatic?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  frictionAir: 0.01,
  friction: 0.1,
  restitution: 0.3,
  mass: undefined,
  isStatic: false,
});

watch(() => props, () => {
  wrapper?.updateBody(id, props);
}, { deep: true })

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
  const newInfo = wrapper?.getInfo(id);
  if (!newInfo) {
    info.value = {
      offsetX: info.value.offsetX - info.value.offsetX * 0.05,
      offsetY: info.value.offsetY - info.value.offsetY * 0.05,
      rotate: info.value.rotate - info.value.rotate * 0.05,
    };
    return;
  }

  info.value = {
    offsetX: info.value.offsetX + (newInfo.offsetX - info.value.offsetX) * 0.8,
    offsetY: info.value.offsetY + (newInfo.offsetY - info.value.offsetY) * 0.8,
    rotate: info.value.rotate + (newInfo.rotate - info.value.rotate) * 0.8,
  };
}, 10);

const style = computed(() => {
  if (!wrapper) {
    return undefined;
  }

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
