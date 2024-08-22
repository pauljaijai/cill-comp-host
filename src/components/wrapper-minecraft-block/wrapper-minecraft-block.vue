<template>
  <div
    ref="blockRef"
    class=" relative"
  >
    <slot />

    <div class=" absolute inset-0 cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { eventKey } from './type';
import { nanoid } from 'nanoid';
import { pick } from 'remeda';

import { onLongPress, OnLongPressOptions, useElementBounding, useEventBus, useMousePressed } from '@vueuse/core';
import { useTimer } from '../../composables/use-timer';


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

const id = nanoid();

const blockRef = ref<HTMLElement>();
const blockBounding = reactive(useElementBounding(blockRef));
watch(blockBounding, (value) => {
  if (value.width === 0) return;

  bus.emit({
    type: 'update',
    id,
    visible: lidVisible.value,
    ...pick(value, ['x', 'y']),
  });
});

const { pressed } = useMousePressed({ target: blockRef })
useTimer({
  playing: pressed,
  onTick(time) {
    console.log(`🚀 ~ time:`, time);
  },
  tickInterval: 100,
});


/** 蓋子，用來產生挖掘效果，消失表示被挖掉了 */
const lidVisible = ref(false);

onMounted(() => {
  bus.emit({
    type: 'add',
    id,
    ...pick(blockBounding, ['x', 'y', 'width', 'height']),
  });
});

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots
</script>

<style scoped lang="sass">
</style>
