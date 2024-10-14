<template>
  <section class="flex flex-col">
    <div
      class="cursor-pointer text-center duration-500"
      :class="headerClass"
      @click="handleClick()"
    >
      {{ props.header }}
    </div>

    <!-- expander -->
    <div
      :style="expanderStyle"
      class="expander ease-in-out-circ flex flex-col duration-500"
    >
      <transition name="content">
        <!-- 內容 -->
        <div
          v-if="contentVisible"
          ref="contentRef"
          :class="props.contentClass"
          :style="contentStyle"
        >
          <slot />
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useElementSize, useVModel } from '@vueuse/core'
import { nanoid } from 'nanoid'

import { computed, ref } from 'vue'

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
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const modelValue = useVModel(props, 'modelValue')
function handleClick() {
  if (modelValue.value === props.value) {
    modelValue.value = undefined
  }
  else {
    modelValue.value = props.value
  }
}

const contentVisible = computed(() => modelValue.value === props.value)

const contentRef = ref()
const { height } = useElementSize(contentRef)

const expanderStyle = computed<CSSProperties>(() => ({
  height: contentVisible.value ? `${height.value}px` : '0px',
}))
const contentStyle = computed<CSSProperties>(() => ({
  transitionDelay: contentVisible.value ? `0.3s` : '0s',
}))

const headerClass = computed(() => {
  const result = [
    props.headerClass,
  ]

  if (contentVisible.value) {
    result.push('opacity-100')
  }
  else {
    result.push('opacity-50')
  }

  return result
})
</script>

<style scoped lang="sass">
.expander
  will-change: height

.content-enter-active, .content-leave-active
  transition-duration: 0.4s
.content-enter-from, .content-leave-to
  // transform 會導致內容之 canvas 顯示異常問題
  // transform: translateX(-10px) !important
  opacity: 0 !important
  overflow: hidden

.ease-in-out-circ
  transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1)
</style>
