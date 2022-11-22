<template>
  <div class="w-full flex justify-center">
    <div class="w-3/5 flex flex-col items-start gap-6 p-10">
      <feature-section
        title="基本用法"
        description="說明文字"
      >
        <template #content>
          <btn-naughty
            label="調皮的按鈕"
            class=" font-bold"
            disable
            z-index="9999"
          />
        </template>
      </feature-section>

      <feature-section
        title="自訂按鈕"
        description="說明文字"
      >
        <template #content>
          <btn-naughty
            disable
            z-index="9999"
          >
            <div class="text-x bg-orange-500 text-white p-4 rounded">
              自定義按鈕
            </div>
          </btn-naughty>
        </template>
      </feature-section>

      <feature-section
        title="拓印"
        description="可以使用 rubbing 插槽，自訂按鈕拓印內容"
      >
        <template #content>
          <btn-naughty
            disable
            z-index="9999"
          >
            <template #rubbing>
              <div class="text-x bg-lime-100 text-lime-500 font-black p-4 rounded-full">
                啪！沒了！
              </div>
            </template>


            <template #default>
              <div class="text-x bg-lime-600 text-white p-4 rounded-full">
                自定義按鈕
              </div>
            </template>
          </btn-naughty>
        </template>
      </feature-section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BtnNaughty from '../components/btn-naughty.vue';
import FeatureSection from '../components/feature-section.vue';

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();


const text = ref('');
</script>

<style scoped lang="sass">
</style>
