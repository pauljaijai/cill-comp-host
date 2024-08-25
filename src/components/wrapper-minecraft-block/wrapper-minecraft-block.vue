<template>
  <div
    ref="blockRef"
    class=" relative"
    :class="{ 'opacity-0': isDug }"
    @click.right.prevent="handleRightClick"
  >
    <slot />

    <div class=" absolute inset-0 pointer-events-none" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { BusData, eventKey } from './type';
import { nanoid } from 'nanoid';
import { pick, sample } from 'remeda';

import { useElementBounding, useEventBus, useIntervalFn, useMousePressed } from '@vueuse/core';
import { useLongPressTimings } from '../../composables/use-long-press-timings';

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

const bus = useEventBus(eventKey);

/** 方塊 ID */
const id = nanoid();

const blockRef = ref<HTMLElement>();
const blockBounding = reactive(useElementBounding(blockRef));

/** 方塊是否被挖掉 */
const isDug = ref(true);
const { pressed: isPressed } = useMousePressed({ target: blockRef });

const sound = {
  dirt: {
    dig: [
      '/minecraft/sounds/block/rooted_dirt/step1.ogg',
      '/minecraft/sounds/block/rooted_dirt/step2.ogg',
      '/minecraft/sounds/block/rooted_dirt/step3.ogg',
      '/minecraft/sounds/block/rooted_dirt/step4.ogg',
      '/minecraft/sounds/block/rooted_dirt/step5.ogg',
      '/minecraft/sounds/block/rooted_dirt/step6.ogg',
    ],
    place: [
      '/minecraft/sounds/dig/gravel1.ogg',
      '/minecraft/sounds/dig/gravel2.ogg',
      '/minecraft/sounds/dig/gravel3.ogg',
      '/minecraft/sounds/dig/gravel4.ogg',
    ],
    break: [
      '/minecraft/sounds/dig/gravel1.ogg',
      '/minecraft/sounds/dig/gravel2.ogg',
      '/minecraft/sounds/dig/gravel3.ogg',
      '/minecraft/sounds/dig/gravel4.ogg',
    ],
  }
};
const { pause, resume } = useIntervalFn(() => {
  if (isDug.value) return;

  const [path] = sample(sound.dirt.dig, 1);
  new Audio(path).play();
}, 200, {
  immediate: false,
  immediateCallback: true,
});

watch(isPressed, (value) => {
  value ? resume() : pause();
});

useLongPressTimings(blockRef, [
  {
    delay: 500, handler() {
    }
  },
  {
    delay: 1000, handler() {
    }
  },
  {
    delay: 1500, handler() {
    }
  },
  {
    delay: 2000, handler() {
      isDug.value = true;

      const [path] = sample(sound.dirt.break, 1);
      new Audio(path).play();
    }
  },
], {
  distanceThreshold: 500,
});

function handleRightClick() {
  isDug.value = false;

  const [path] = sample(sound.dirt.place, 1);
  new Audio(path).play();
}

onMounted(() => {
  bus.emit({
    type: 'add',
    id,
    visible: !isDug.value,
    ...pick(blockBounding, ['x', 'y', 'width', 'height']),
  });
});

/** 方塊更新資料 */
const updateData = computed<
  Extract<BusData, { type: 'update' }>
>(() => ({
  type: 'update',
  id,
  visible: !isDug.value,
  ...pick(blockBounding, ['x', 'y', 'width', 'height']),
}));

watch(updateData, (value) => {
  bus.emit(value);
}, { deep: true });


// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots
</script>

<style scoped lang="sass">
</style>
