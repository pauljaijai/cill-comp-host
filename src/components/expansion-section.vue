<template>
  <section class="flex flex-col">
    <div
      class="text-center cursor-pointer duration-500"
      :class="headerClass"
      @click="handleClick()"
    >
      {{ props.header }}
    </div>

    <!-- 內容 -->
    <div
      :class="props.contentClass"
      :style="contentStyle"
      class=" duration-500 ease-in-out"
    >
      <transition name="content">
        <div
          v-if="contentVisible"
          ref="slotRef"
        >
          <slot />
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useElementSize, useVModel, watchDebounced } from '@vueuse/core';

interface Props {
  modelValue?: string;
  value: string;
  header?: string;
  headerClass?: string;
  contentClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
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

const shouldShowContent = computed(() => modelValue.value === props.value);
watch(shouldShowContent, (value) => {
  contentVisible.value = value;
})

const contentVisible = ref(false);
/** 紀錄內容的目標高度 */
const targetHeight = ref(0);
const contentStyle = computed(() => ({
  height: shouldShowContent.value ? `${targetHeight.value}px` : '0px',
}));

const slotRef = ref();
const { height } = useElementSize(slotRef);
watchDebounced(height, (value) => {
  targetHeight.value = value;
}, { debounce: 10 })

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
.content-enter-active, .content-leave-active
  transition-duration: 0.6s
.content-enter-from, .content-leave-to
  transform: translateX(-10px) !important
  opacity: 0 !important
</style>
