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
    <div
      v-if="!slots.description"
      class="text-base my-2"
    >
      {{ props.description }}
    </div>
    <slot
      v-else
      name="description"
    />

    <!-- 內容展示 -->
    <q-card
      flat
      bordered
      :class="props.cardClass"
    >
      <q-card-section
        v-if="slots.content"
        class="flex"
      >
        <slot name="content" />
      </q-card-section>
    </q-card>
  </section>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';

const slots = useSlots();

interface Props {
  title?: string;
  titleAnchor?: string;
  description?: string;
  cardClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  titleAnchor: undefined,
  description: undefined,
  cardClass: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
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
