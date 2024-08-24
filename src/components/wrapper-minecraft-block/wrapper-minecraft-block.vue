<template>
  <div
    ref="blockRef"
    class=" relative"
  >
    <slot />

    <div class=" absolute inset-0 pointer-events-none" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { BusData, eventKey } from './type';
import { nanoid } from 'nanoid';
import { pick } from 'remeda';

import { useElementBounding, useEventBus, useMousePressed } from '@vueuse/core';
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
const isDug = ref(false);
const isPressed = useMousePressed({ target: blockRef });

useLongPressTimings(blockRef, [
  {
    delay: 500, handler() {
      console.log('挖了 500ms');
    }
  },
  {
    delay: 1000, handler() {
      console.log('挖了 1000ms');
    }
  },
  {
    delay: 1500, handler() {
      console.log('挖了 1500ms');
    }
  },
  {
    delay: 2000, handler() {
      console.log('挖了 2000ms');
      isDug.value = true;
    }
  },
]);




onMounted(() => {
  bus.emit({
    type: 'add',
    id,
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
  ...pick(blockBounding, ['x', 'y']),
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
