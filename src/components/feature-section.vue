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
      <!-- 程式碼 -->
      <template v-if="props.code">
        <q-card-section class="flex py-2">
          <div class="flex">
            <q-btn
              icon="code"
              flat
              round
              @click="toggleCodeVisible()"
            >
              <q-tooltip>
                查看原始碼
              </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>

        <q-card-section class="flex py-2 bg-gray-50">
          <q-slide-transition>
            <code
              v-if="codeVisible"
              class="language-js"
              v-html="codeHtml"
            />
          </q-slide-transition>
        </q-card-section>

        <q-separator />
      </template>


      <!-- 展示內容 -->
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
import { computedAsync } from '@vueuse/core';
import * as shiki from 'shiki';
import { ref, useSlots } from 'vue';

const slots = useSlots();

interface Props {
  title?: string;
  titleAnchor?: string;
  description?: string;
  cardClass?: string;
  code?: string;
  codeLang?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  titleAnchor: undefined,
  description: undefined,
  cardClass: undefined,
  code: undefined,
  codeLang: 'vue',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const codeVisible = ref(false);
function toggleCodeVisible() {
  codeVisible.value = !codeVisible.value;
}

const codeHtml = computedAsync(async () => {
  const highlighter = await shiki.getHighlighter({ theme: 'nord' });

  return highlighter.codeToHtml(props.code, { lang: props.codeLang });
}, '');
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
