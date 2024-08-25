<template>
  <div
    ref="blockRef"
    class=" relative"
    :class="{ 'opacity-0': isDug }"
    @dblclick.prevent="placeBlock"
  >
    <slot />

    <div class=" absolute inset-0 pointer-events-none" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { BlockType, BusData, eventKey } from './type';
import { nanoid } from 'nanoid';
import { pick, sample } from 'remeda';

import {
  useElementBounding,
  useEventBus,
  useIntervalFn,
  useMousePressed
} from '@vueuse/core';
import { useLongPressTimings } from '../../composables/use-long-press-timings';
import { minecraftResource } from './constant';

// #region Props
interface Props {
  /** 方塊種類。初始化後不可變更 */
  blockType?: BlockType;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  blockType: 'dirt',
});

// #region Emits
const emit = defineEmits<{
  'digging': [];
  'dug': [];
  'place': [];
}>();
// #endregion Emits

const bus = useEventBus(eventKey);

/** 方塊 ID */
const id = nanoid();

const blockRef = ref<HTMLElement>();
const blockBounding = reactive(useElementBounding(blockRef));

/** 方塊是否被挖掉 */
const isDug = ref(false);
const { pressed: isPressed } = useMousePressed({ target: blockRef });

/** 目前方塊對應的資源 */
const resource = minecraftResource[props.blockType];

async function playRandomSound(paths: string[]) {
  const [path] = sample(paths, 1);
  new Audio(path).play()
}

const {
  pause: pauseSound,
  resume: playSound
} = useIntervalFn(() => {
  if (isDug.value) return;

  playRandomSound(resource.sound.dig);
}, 200, {
  immediate: false,
  immediateCallback: true,
});

watch(isPressed, (value) => {
  if (value) return

  pauseSound();

  bus.emit({
    type: 'dig',
    id,
    isActive: false,
  });
});

useLongPressTimings(blockRef, [
  // 按著 0.1s 才算開始挖
  {
    delay: 100, handler(event) {
      if (isDug.value) return;

      event.preventDefault();

      playSound();
      emit('digging');
      bus.emit({
        type: 'dig',
        id,
        isActive: true,
      });
    }
  },
  // 1.5s 後挖掉方塊
  {
    delay: 1500, handler(event) {
      if (isDug.value) return;

      event.preventDefault();

      emit('dug');
      bus.emit({
        type: 'dig',
        id,
        isActive: false,
      });

      isDug.value = true;

      playRandomSound(resource.sound.break);
    }
  },
], {
  distanceThreshold: 500,
});

function placeBlock() {
  if (!isDug.value) return;

  emit('place');

  isDug.value = false;

  playRandomSound(resource.sound.place);
}

onMounted(() => {
  bus.emit({
    type: 'add',
    id,
    blockType: props.blockType,
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
