<template>
  <section class="flex flex-col">
    <div
      class="text-center cursor-pointer duration-500"
      :class="headerClass"
      @click="handleClick()"
    >
      {{ props.header }}
    </div>

    <!-- expander -->
    <div
      :style="expanderStyle"
      class="expander duration-500 ease-in-out-circ overflow-hidden"
    >
      <transition name="content">
        <!-- 內容 -->
        <div
          v-if="contentVisible"
          ref="contentRef"
          :class="props.contentClass"
        >
          <slot />
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { nanoid } from 'nanoid';

import { useElementSize, useVModel } from '@vueuse/core';

interface Props {
  modelValue?: string;
  value?: string;
  header?: string;
  headerClass?: string;
  contentClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: () => nanoid(),
  header: '點擊展開',
  headerClass: '',
  contentClass: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const modelValue = useVModel(props, 'modelValue');
function handleClick() {
  if (modelValue.value === props.value) {
    modelValue.value = undefined;
  } else {
    modelValue.value = props.value;
  }
}

const contentVisible = computed(() => modelValue.value === props.value);
const contentRef = ref();
const { height } = useElementSize(contentRef);

const expanderStyle = computed(() => ({
  height: contentVisible.value ? `${height.value}px` : '0px',
}));

const headerClass = computed(() => {
  const result = [
    props.headerClass,
  ]

  if (contentVisible.value) {
    result.push('opacity-100');
  } else {
    result.push('opacity-50');
  }

  return result;
});
</script>

<style scoped lang="sass">
.expander
  will-change: height

.content-enter-active, .content-leave-active
  transition-duration: 0.6s
.content-enter-from, .content-leave-to
  // transform 會導致內容之 canvas 顯示異常問題
  // transform: translateX(-10px) !important
  opacity: 0 !important

.ease-in-out-circ
  transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1)
</style>
