<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="w-full mb-4">
    <!-- 標題 -->
    <div
      :id="props.titleAnchor"
      class="title text-2xl font-black text-main my-3 cursor-pointer"
    >
      {{ props.title }}
    </div>

    <!-- 描述 -->

    <slot name="description">
      <div class="text-base my-2">
        {{ props.description }}
      </div>
    </slot>

    <!-- 內容展示 -->
    <div class="flex flex-col">
      <slot name="default" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title?: string;
  titleAnchor?: string;
  description?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  titleAnchor: undefined,
  description: undefined,
});
</script>

<style scoped lang="sass">
.title
  &::after
    content: '#'
    margin-left: 0.4rem
    transition-duration: 0.4s
    opacity: 0
  &:hover
    &::after
      opacity: 1
</style>
