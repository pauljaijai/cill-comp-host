<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="w-full mb-4">
    <!-- 內容展示 -->
    <q-card
      flat
      bordered
    >
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

      <q-card-section
        class="flex bg-gray-50 py-4 duration-300"
        :class="{ 'py-0': !codeVisible }"
      >
        <q-slide-transition>
          <div v-show="codeVisible">
            <pre>
              <code
              class="language-js"
              v-html="codeHtml"
              />
            </pre>
          </div>
        </q-slide-transition>
      </q-card-section>

      <q-separator />

      <!-- 展示內容 -->
      <q-card-section class="flex">
        <component :is="component" />
      </q-card-section>
    </q-card>
  </section>
</template>

<script setup lang="ts">
import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.min.css'
import { computed, markRaw, onMounted, ref } from 'vue';

const exampleComponentMap = import.meta.glob('/public/examples/**/*.vue');

interface Props {
  title?: string;
  file: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
});


const component = ref();
const isLoadingComponent = ref(true);

const codeVisible = ref(true);
const code = ref<string>();

const codeHtml = computed(() => {
  if (!code.value) {
    return '';
  }

  return Prism.highlight(
    code.value,
    Prism.languages['js'],
    'js'
  )
});

const isLoadingSource = ref(true);
function toggleCodeVisible() {
  codeVisible.value = !codeVisible.value;
}

onMounted(() => {
  exampleComponentMap['/public/examples/' + props.file + '.vue']()
    .then((comp: any) => {
      component.value = markRaw(comp.default);
      isLoadingComponent.value = false;
    })


  fetch(`/examples/${props.file}.vue`)
    .then((response) => response.text())
    .then((content) => {
      code.value = content;
      isLoadingSource.value = false;
    })
})
</script>

<style scoped lang="sass">
</style>
